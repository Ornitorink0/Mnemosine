/**
 * @file        components/theme-provider.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Provider del tema (light/dark)
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/components/theme-provider.tsx
 */

'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
