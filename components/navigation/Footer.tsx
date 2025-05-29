import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <p className="text-muted-foreground text-sm">
              Providing professional services since 2010. We help businesses grow and succeed.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/consulting" className="text-muted-foreground hover:text-primary text-sm">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/development" className="text-muted-foreground hover:text-primary text-sm">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/services/marketing" className="text-muted-foreground hover:text-primary text-sm">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/design" className="text-muted-foreground hover:text-primary text-sm">
                  Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@company.com" className="text-muted-foreground hover:text-primary text-sm">
                  info@company.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary text-sm">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
