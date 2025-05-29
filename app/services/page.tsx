import { ServiceCard } from "@/components/services/ServiceCard"
import { ProcessSteps } from "@/components/services/ProcessSteps"
import { FAQ } from "@/components/services/FAQ"
import { CTA } from "@/components/home/CTA"

export const metadata = {
  title: "Services | Company Name",
  description: "Explore our range of professional services for businesses",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Comprehensive professional services tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard
            title="Business Consulting"
            description="Strategic guidance to optimize your business operations and drive growth."
            icon="💼"
            features={[
              "Business strategy development",
              "Operational efficiency analysis",
              "Growth planning",
              "Market research and analysis",
            ]}
            href="/services/consulting"
          />
          <ServiceCard
            title="Web Development"
            description="Custom websites and applications built with cutting-edge technology."
            icon="💻"
            features={[
              "Responsive website design",
              "E-commerce solutions",
              "Web application development",
              "Maintenance and support",
            ]}
            href="/services/development"
          />
          <ServiceCard
            title="Digital Marketing"
            description="Increase your online presence and reach your target audience."
            icon="📈"
            features={[
              "Search engine optimization (SEO)",
              "Social media marketing",
              "Content marketing",
              "Email marketing campaigns",
            ]}
            href="/services/marketing"
          />
          <ServiceCard
            title="UI/UX Design"
            description="Create beautiful, intuitive interfaces that users love."
            icon="🎨"
            features={[
              "User experience research",
              "Interface design",
              "Prototyping and testing",
              "Design system development",
            ]}
            href="/services/design"
          />
        </div>
      </section>

      {/* Our Process */}
      <ProcessSteps />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />
    </div>
  )
}
