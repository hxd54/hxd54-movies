export function Timeline() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Journey</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              From our humble beginnings to where we are today.
            </p>
          </div>
        </div>
        <div className="mt-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>

          {/* Timeline Items */}
          <div className="grid grid-cols-1 gap-8">
            <TimelineItem
              year="2010"
              title="Company Founded"
              description="Our company was established with a vision to provide exceptional professional services."
              position="left"
            />
            <TimelineItem
              year="2013"
              title="Expanded Services"
              description="We added new service offerings to meet the growing needs of our clients."
              position="right"
            />
            <TimelineItem
              year="2016"
              title="International Expansion"
              description="We began serving clients internationally, expanding our reach to new markets."
              position="left"
            />
            <TimelineItem
              year="2019"
              title="Award Recognition"
              description="Our work was recognized with industry awards for excellence and innovation."
              position="right"
            />
            <TimelineItem
              year="2023"
              title="Digital Transformation"
              description="We embraced new technologies to enhance our service delivery and client experience."
              position="left"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  year: string
  title: string
  description: string
  position: "left" | "right"
}

function TimelineItem({ year, title, description, position }: TimelineItemProps) {
  return (
    <div className={`relative flex ${position === "left" ? "justify-end" : "justify-start"} md:justify-center`}>
      <div className={`w-full md:w-5/12 ${position === "right" ? "md:ml-auto" : "md:mr-auto"}`}>
        <div className="bg-background p-4 rounded-lg shadow-sm border">
          <div className="font-bold text-primary">{year}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      {/* Timeline Dot */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
    </div>
  )
}
