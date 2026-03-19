const fs = require('fs');
const path = require('path');

// Configuration
const TOKENS_FILE = path.join(__dirname, 'tokens.json');
const CSS_OUTPUT = path.join(__dirname, 'globals-tokens.css');
const TAILWIND_OUTPUT = path.join(__dirname, 'tailwind-theme.js');

// Helper to convert {path.to.token} into var(--path-to-token)
function convertAliasToVar(value) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const rawPath = value.slice(1, -1);
    // Replace dots with dashes and ensure it starts with --
    return `var(--${rawPath.replace(/\./g, '-')})`;
  }
  return value;
}

// Helper to resolve aliases like {colors.brand.orange.500} to raw values (for Primitives)
function resolveAlias(value, tokens) {
  if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
    return value;
  }
  const path = value.slice(1, -1).split('.');
  
  for (const setName of Object.keys(tokens)) {
    let current = tokens[setName];
    for (const key of path) {
      if (current && current[key]) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }
    if (current && current.$value !== undefined) {
      return resolveAlias(current.$value, tokens); 
    }
  }
  return value; 
}

// Helper to sanitize key names for CSS
function sanitizeKey(key) {
  return key.toLowerCase()
    .replace(/ /g, '-')
    .replace(/&/g, 'n')
    .replace(/[^a-z0-9-]/g, ''); // Remove any other invalid characters
}

// Helper to flatten token objects
function flattenTokens(obj, prefix = '', tokensData, mode = 'semantic') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; 
    
    const sanitizedKey = sanitizeKey(key);
    const newPrefix = prefix ? `${prefix}-${sanitizedKey}` : sanitizedKey;
    
    if (value.$value !== undefined) {
      if (mode === 'primitive') {
        // Primitives should always resolve to raw values (hex/number)
        result[newPrefix] = resolveAlias(value.$value, tokensData);
      } else {
        // Semantics and Brands should keep the var() alias if possible
        result[newPrefix] = convertAliasToVar(value.$value);
        // If it wasn't an alias, resolve it just in case it points to something missing
        if (result[newPrefix] === value.$value && value.$value.startsWith('{')) {
             result[newPrefix] = resolveAlias(value.$value, tokensData);
        }
      }
    } else if (typeof value === 'object') {
      result = { ...result, ...flattenTokens(value, newPrefix, tokensData, mode) };
    }
  }
  return result;
}

try {
  // 1. Read tokens.json
  const rawData = fs.readFileSync(TOKENS_FILE, 'utf-8');
  const tokensData = JSON.parse(rawData);

  // 2. Extract Primitives & Semantics
  const primitives = flattenTokens(tokensData['Primitives/Global'], '', tokensData, 'primitive');
  const semantics = flattenTokens(tokensData['Semantic/Global'], '', tokensData, 'semantic');

  // 3. Generate CSS Variables
  let cssLines = [
    '/* DESIGN TOKENS (Auto-generated from Tokens Studio) */',
    '@import "tailwindcss";',
    '',
    '@layer base {',
    '  :root {',
    '    /* Primitives */'
  ];

  for (const [key, value] of Object.entries(primitives)) {
    cssLines.push(`    --${key}: ${value};`);
  }

  cssLines.push('', '    /* Semantics */');
  for (const [key, value] of Object.entries(semantics)) {
    cssLines.push(`    --${key}: ${value};`);
  }

  cssLines.push('  }');
  
  // Add Brands (as CSS theme classes)
  const brandKeys = Object.keys(tokensData).filter(k => k.startsWith('Brand/'));
  for (const brand of brandKeys) {
    const brandName = brand.split('/')[1].toLowerCase().replace(/ /g, '-');
    const brandTokens = flattenTokens(tokensData[brand], '', tokensData, 'semantic');
    
    cssLines.push('', `  .theme-${brandName} {`);
    for (const [key, value] of Object.entries(brandTokens)) {
      cssLines.push(`    --${key}: ${value};`);
    }
    cssLines.push('  }');
  }

  cssLines.push('}');
  
  fs.writeFileSync(CSS_OUTPUT, cssLines.join('\n'));
  console.log(`✅ CSS Variables generated at: ${CSS_OUTPUT}`);

  // 4. Generate Tailwind Theme Extension Prefix
  // This helps map the CSS variables back into Tailwind utilties
  const tailwindTheme = {
    colors: {},
    // Add other categories like spacing, borderRadius here...
  };

  for (const key of Object.keys(semantics)) {
    // Collect all semantic tokens into Tailwind colors, removing the first category from name to make it shorter if needed,
    // or keep the full key structure mapping to var(--key)
    tailwindTheme.colors[key] = `var(--${key})`;
  }

  const twConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: ${JSON.stringify(tailwindTheme, null, 2).replace(/"var\\((.*?)\\)"/g, 'var($1)')}
  }
};
`;
  
  fs.writeFileSync(TAILWIND_OUTPUT, twConfigContent);
  console.log(`✅ Tailwind Config generated at: ${TAILWIND_OUTPUT}`);
  
} catch (error) {
  console.error("Error generating tokens:", error);
}
