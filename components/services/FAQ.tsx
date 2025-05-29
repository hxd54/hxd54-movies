import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Answers to common questions about our services.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl mt-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
            <AccordionContent>
              Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while
              more complex projects can take several months. During our initial consultation, we'll provide a detailed
              timeline based on your specific requirements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is your pricing structure?</AccordionTrigger>
            <AccordionContent>
              We offer flexible pricing options including project-based, hourly, and retainer models. Each project is
              unique, so we provide custom quotes based on your specific needs and objectives. Contact us for a free
              consultation and quote.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you work with small businesses?</AccordionTrigger>
            <AccordionContent>
              We work with businesses of all sizes, from startups to large enterprises. We tailor our services to meet
              your specific needs and budget, ensuring you get the support you need to grow your business.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do you measure success?</AccordionTrigger>
            <AccordionContent>
              We establish clear KPIs and metrics at the beginning of each project, aligned with your business goals. We
              provide regular reports and analytics to track progress and demonstrate ROI, adjusting our approach as
              needed to ensure optimal results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What industries do you specialize in?</AccordionTrigger>
            <AccordionContent>
              We have experience across a wide range of industries including technology, healthcare, education, retail,
              finance, and professional services. Our diverse expertise allows us to bring fresh perspectives and proven
              strategies to your industry.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
