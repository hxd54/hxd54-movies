"use client"

import { useState } from "react"
import MovieList from "@/components/movie-list"
import { Card, CardContent } from "@/components/ui/card"
import CategoryFilter from "@/components/category-filter"
import MoodFilter from "@/components/mood-filter"

export default function HomeClient() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  return (
    <div className="container py-8 px-4 sm:px-6">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Movie Mood</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Find the perfect movie for your mood</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Filter by Category</h2>
              <CategoryFilter onCategoryChange={setSelectedCategories} />

              <h2 className="text-xl font-semibold mt-6">Filter by Mood</h2>
              <MoodFilter onMoodChange={setSelectedMood} />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <MovieList selectedCategories={selectedCategories} selectedMood={selectedMood} />
        </div>
      </div>
    </div>
  )
}
