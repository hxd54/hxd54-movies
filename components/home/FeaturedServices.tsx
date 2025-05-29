import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Business Consulting",
    description: "Strategic guidance to optimize your business operations and growth.",
    icon: "💼",
    link: "/services/consulting",
  },
  {
    title: "Web Development",
    description: "Custom websites and applications built with cutting-edge technology.",
    icon: "💻",
    link: "/services/development",
  },
  {
    title: "Digital Marketing",
    description: "Increase your online presence and reach your target audience.",
    icon: "📈",
    link: "/services/marketing",
  },
  {
    title: "UI/UX Design",
    description: "Create beautiful, intuitive interfaces that users love.",
    icon: "🎨",
    link: "/services/design",
  },
]

export function FeaturedServices() {
  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Services</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            We offer a comprehensive range of services to help your business succeed.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {services.map((service) => (
          <Card key={service.title} className="h-full">
            <CardHeader>
              <div className="text-4xl mb-2">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={service.link} className="inline-flex items-center text-sm font-medium text-primary">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
