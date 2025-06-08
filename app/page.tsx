import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex h-[calc(100dvh-4em)] w-full flex-col items-center justify-center">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[-50%] h-[200%] skew-y-12'
          )}
        />
        {/* <HalftoneWaves /> */}
        <main className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
          <h1 className="max-w-3xl text-4xl sm:text-6xl md:text-8xl font-light leading-tight tracking-tight">
            <span className="block">MNEMOSINE</span>
            <span className="block">
              ALLENA
              <br />
              MENTI.
            </span>
          </h1>
        </main>
      </div>
    </div>
  );
}
