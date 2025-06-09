/**
 * @file        lib/utils.ts
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Gestore di classi condizionali
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/lib/utils.ts
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
