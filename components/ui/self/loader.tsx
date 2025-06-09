/**
 * @file        components/ui/self/loader.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-04-05
 * @updated     2025-06-08
 * @license     MIT
 * @version     0.1.0
 * @brief       Loader spinner
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/components/ui/self/loader.tsx
 */

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
  size?: number;
}

export function Loader({ className, size = 24 }: LoaderProps) {
  return (
    <Loader2
      className={cn('animate-spin text-primary', className)}
      size={size}
    />
  );
}
