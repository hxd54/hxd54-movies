import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

interface TeamMemberProps {
  name: string
  title: string
  bio: string
  image: string
}

export function TeamMember({ name, title, bio, image }: TeamMemberProps) {
  return (
    <Card className="h-full">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{bio}</p>
        <div className="flex gap-2 mt-4">
          <a href="#" aria-label={`${name}'s LinkedIn`} className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" aria-label={`${name}'s Twitter`} className="text-muted-foreground hover:text-primary">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
