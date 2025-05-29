export function Stats() {
  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Impact</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              We've helped hundreds of businesses achieve their goals.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">Clients Served</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">Client Satisfaction</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">1000+</div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">Projects Completed</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">12+</div>
            <div className="text-sm md:text-base text-muted-foreground mt-2">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
