import Image from "next/image"
import { TeamMember } from "@/components/about/TeamMember"
import { Timeline } from "@/components/about/Timeline"
import { Values } from "@/components/about/Values"

export const metadata = {
  title: "About Us | Company Name",
  description: "Learn about our company, our mission, and our team",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our Company</h1>
            <p className="text-muted-foreground md:text-xl">
              Founded in 2010, we've been helping businesses grow and succeed for over a decade. Our mission is to
              provide exceptional services that drive results.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=720&width=1280" alt="Our office" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">How We Started</h3>
            <p className="text-muted-foreground">
              Our company was founded by a group of industry experts who saw a gap in the market for high-quality,
              client-focused professional services. What started as a small team has grown into a full-service agency
              with clients worldwide.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="text-muted-foreground">
              Our mission is to empower businesses with the tools, strategies, and support they need to thrive in
              today's competitive landscape. We believe in building long-term partnerships with our clients, focusing on
              their success as our primary goal.
            </p>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <Timeline />

      {/* Our Values */}
      <Values />

      {/* Team Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our talented team of professionals is dedicated to delivering exceptional results.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <TeamMember
            name="John Smith"
            title="CEO & Founder"
            bio="With over 15 years of industry experience, John leads our company with vision and expertise."
            image="/placeholder.svg?height=400&width=400"
          />
          <TeamMember
            name="Emily Johnson"
            title="Chief Operations Officer"
            bio="Emily ensures our operations run smoothly and efficiently to deliver the best results for our clients."
            image="/placeholder.svg?height=400&width=400"
          />
          <TeamMember
            name="Michael Wong"
            title="Head of Development"
            bio="Michael leads our development team, creating innovative solutions for complex challenges."
            image="/placeholder.svg?height=400&width=400"
          />
          <TeamMember
            name="Sarah Garcia"
            title="Marketing Director"
            bio="Sarah brings creative strategies to help our clients stand out in competitive markets."
            image="/placeholder.svg?height=400&width=400"
          />
        </div>
      </section>
    </div>
  )
}
