import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Working with this team transformed our business. Their expertise and dedication are unmatched.",
    author: "Sarah Johnson",
    title: "CEO, TechStart Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "The level of professionalism and quality of work exceeded our expectations. Highly recommended!",
    author: "Michael Chen",
    title: "Marketing Director, GrowthCo",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "Their strategic insights helped us navigate a challenging market and come out stronger.",
    author: "Emma Rodriguez",
    title: "Founder, InnovateNow",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials() {
  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="h-full">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{testimonial.quote}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4 border-t pt-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
