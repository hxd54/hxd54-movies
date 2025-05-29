import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Here's how you can reach us directly.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <Mail className="h-6 w-6 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">info@company.com</p>
            <p className="text-sm text-muted-foreground">support@company.com</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="h-6 w-6 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-sm text-muted-foreground">+1 (234) 567-890</p>
            <p className="text-sm text-muted-foreground">+1 (234) 567-891</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Office</h3>
            <p className="text-sm text-muted-foreground">
              123 Business Street
              <br />
              Suite 100
              <br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="h-6 w-6 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Business Hours</h3>
            <p className="text-sm text-muted-foreground">Monday - Friday: 9am - 5pm</p>
            <p className="text-sm text-muted-foreground">Saturday - Sunday: Closed</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-2">Connect With Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
