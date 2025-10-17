import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateImageUrl(prompt: string, seed: string | number = Math.random()): string {
  const encodedPrompt = encodeURIComponent(prompt);
  const seedValue = typeof seed === 'string' ? seed : seed.toString();
  return `https://api.a0.dev/assets/image?text=${encodedPrompt}&aspect=1:1&seed=${seedValue}`;
}