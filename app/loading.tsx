/**
 * @file        app/loading.tsx
 * @author      Ornitorink0 <ornitorink0.dev@gmail.com>
 * @created     2025-05-22
 * @updated     2025-06-08
 * @license     MIT
 * @version     3.3.4
 * @brief       Mostra il loader spinner
 *
 * @changelog
 * https://github.com/Ornitorink0/Mnemosine/commits/main/app/loading.tsx
 */

import { Loader } from '@/components/ui/self/loader';

export default function Loading() {
  return (
    <div className="bg-black/70 z-50 fixed inset-0 flex items-center justify-center">
      <Loader className="w-10 h-10" />
    </div>
  );
}
