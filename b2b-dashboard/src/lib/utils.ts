import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to smartly merge Tailwind classes.
 * Essential for merging base component styles with custom overrides (e.g. padding, colors).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
