import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            We'd love to hear from you. Here are the best ways to reach the HXD Movies team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Email Us</h3>
              <p className="text-sm text-muted-foreground">Send us an email and we'll respond ASAP.</p>
              <p className="text-sm font-medium">rukabura123@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">Based in the land of a Thousand hills.</p>
              <p className="text-sm font-medium">Kigali City, Rwanda</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">How does HXD Movies work?</h4>
            <p className="text-sm text-muted-foreground">
              Simply select your current mood, and our algorithm will recommend movies that match your emotional state.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Can I suggest new movies?</h4>
            <p className="text-sm text-muted-foreground">
              We're always looking to expand our database. Send us your suggestions through this form.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Is HXD Movies free to use?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, HXD Movies is completely free to use. We believe everyone deserves great movie recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
