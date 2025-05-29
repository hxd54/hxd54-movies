import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Target, Shield } from "lucide-react"

export function Values() {
  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Core Values</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            The principles that guide everything we do.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <Heart className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Client-Focused</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We put our clients first, focusing on their needs and goals to deliver exceptional results.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <Users className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We believe in the power of teamwork, both within our company and with our clients.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <Target className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Excellence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We strive for excellence in everything we do, maintaining the highest standards of quality.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="pb-2">
            <Shield className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Integrity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We operate with honesty, transparency, and ethical practices in all our interactions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
