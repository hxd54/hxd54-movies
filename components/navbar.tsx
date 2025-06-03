"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Film, LogOut, Menu, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    if (pathname === "/admin") {
      router.push("/")
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold px-4 py-2">
          <Film className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-base sm:text-xl">HXD Movies</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
          <div className="px-2">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden px-4">
          <ModeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75vw] sm:w-[350px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  HXD Movies
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                      pathname === link.href
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <div className="mt-4 pt-4 border-t px-2">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.username}</p>
                        <p className="text-sm text-muted-foreground">{user?.role}</p>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      className="block w-full text-center py-2 mb-2 border rounded-md hover:bg-accent transition-colors"
                      onClick={closeMenu}
                    >
                      Admin Dashboard
                    </Link>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="mt-4" onClick={closeMenu}>
                    <Link href="/login">
                      <User className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
