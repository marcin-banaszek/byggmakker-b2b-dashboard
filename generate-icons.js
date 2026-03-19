const fs = require('fs');
const path = require('path');

const ICONS_ROOT = path.join(__dirname, 'icons');
const OUTPUT_FILE = path.join(__dirname, 'docs-site', 'src', 'components', 'ui', 'icons.tsx');

function toPascalCase(str) {
  return str
    .replace('.svg', '')
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon';
}

function processSvg(svgContent) {
  // Remove fixed dimensions and colors
  return svgContent
    .replace(/width="\d+"/, 'width={size}')
    .replace(/height="\d+"/, 'height={size}')
    .replace(/fill="#[A-Fa-f0-9]{6}"/g, 'fill="currentColor"')
    .replace(/stroke="#[A-Fa-f0-9]{6}"/g, 'stroke="currentColor"')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/clip-path/g, 'clipPath')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/style="mask-type:alpha"/g, 'style={{ maskType: "alpha" }}');
}

function generateIcons() {
  const categories = fs.readdirSync(ICONS_ROOT).filter(f => fs.statSync(path.join(ICONS_ROOT, f)).isDirectory());
  
  let components = [];
  let iconMap = {};

  categories.forEach(category => {
    const categoryPath = path.join(ICONS_ROOT, category);
    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.svg'));
    
    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const svgContent = fs.readFileSync(filePath, 'utf8');
      const componentName = toPascalCase(file);
      const optimizedSvg = processSvg(svgContent);
      
      // Basic component template
      const component = `
export const ${componentName} = ({ size = 24, className = "", ...props }: IconProps) => (
  ${optimizedSvg.replace('<svg', `<svg className={className} {...props}`)}
);`;
      components.push(component);
      iconMap[file.replace('.svg', '')] = {
        component: componentName,
        raw: svgContent
      };
    });
  });

  const fileContent = `
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

${components.join('\n')}

export const IconLibrary = {
${Object.entries(iconMap).map(([name, data]) => `  "${name}": { component: ${data.component}, raw: \`${data.raw.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` },`).join('\n')}
};

export type IconName = keyof typeof IconLibrary;

interface IconComponentProps extends IconProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconComponentProps) => {
  const iconData = IconLibrary[name];
  if (!iconData) return null;
  const Component = iconData.component;
  return <Component {...props} />;
};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent.trim());
  console.log(`✅ Icons generated successfully at ${OUTPUT_FILE}`);
}

generateIcons();
