'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from './ui/self/mode-toggle';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  requiredRole?: 'super' | 'admin' | 'patient';
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    requiredRole: 'admin',
    children: [
      {
        title: 'Gestione Pazienti',
        href: '/dashboard/manage-users',
      },
      {
        title: 'Assegna Sessioni',
        href: '/dashboard/assign-session',
      },
      {
        title: 'Visualizza Risultati',
        href: '/dashboard/view-results',
      },
    ],
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contatti',
    href: '/contatti',
  },
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    title: 'Termini',
    href: '/terms',
  },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, signOut } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur">
      <div className="container flex mx-auto h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src={'/mnemosine-logo.svg'}
              alt="Logo"
              width={32}
              height={32}
            />
            <span className="hidden text-xl font-bold sm:inline-block">
              Mnemosine
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          {navItems
            .filter((item) => {
              // Se l'item richiede un ruolo specifico, mostralo solo se l'utente ha quel ruolo
              if (item.requiredRole) {
                return user?.role === item.requiredRole || user?.role === 'super';
              }
              return true;
            })
            .map((item) => {
              // Check if the item has children for dropdown
              if (item.children) {
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-auto px-2 py-1.5 text-base font-medium"
                      >
                        {item.title}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.title} asChild>
                          <Link
                            href={child.href}
                            className="w-full cursor-pointer"
                          >
                            {child.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              // Regular nav item without dropdown
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-primary',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:gap-2">
            {user ? (
              <Button size="sm" className="px-4" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button size="sm" className="px-4">
                  Login
                </Button>
              </Link>
            )}
          </div>
          <ModeToggle />
          {/* Mobile navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/** SheetTitle Evita un errore di compilazione */}
            <SheetTitle className="hidden" />
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-12 px-4">
                <div className="grid gap-4">
                  {navItems
                    .filter((item) => {
                      if (item.requiredRole) {
                        return (
                          user?.role === item.requiredRole ||
                          user?.role === 'super'
                        );
                      }
                      return true;
                    })
                    .map((item) => {
                      // For mobile, we'll show dropdown items as indented links
                      return (
                        <div key={item.title} className="grid gap-2">
                          <Link
                            href={item.href}
                            className={cn(
                              'text-base font-medium transition-colors hover:text-primary',
                              item.disabled && 'cursor-not-allowed opacity-80'
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Link>

                          {item.children && (
                            <div className="grid gap-2 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.title}
                                  href={child.href}
                                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                <div className="grid gap-2">
                  {user ? (
                    <Button variant="outline" onClick={() => signOut()}>
                      Logout
                    </Button>
                  ) : (
                    <Link href="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function useUser(): {
  user:
  | {
    id: string;
    username: string;
    role: 'super' | 'admin' | 'patient';
    sessionIds: string[];
    notes: string;
  }
  | undefined;
  signOut: () => void;
} {
  const { data: session } = useSession();
  return { user: session?.user, signOut }; // Restituisci la funzione signOut senza ridefinirla
}
