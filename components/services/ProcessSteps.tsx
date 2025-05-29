import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProcessSteps() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Process</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              How we work with you to deliver exceptional results.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                1
              </div>
              <CardTitle>Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We begin by understanding your business, goals, and challenges through in-depth consultation.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                2
              </div>
              <CardTitle>Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We develop a tailored strategy and action plan designed to achieve your specific objectives.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                3
              </div>
              <CardTitle>Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our expert team executes the strategy with precision, keeping you informed throughout the process.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                4
              </div>
              <CardTitle>Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We measure results, gather feedback, and make adjustments to ensure optimal outcomes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
