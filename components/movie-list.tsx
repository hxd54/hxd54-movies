"use client"

import { useState, useEffect } from "react"
import MovieCard from "@/components/movie-card"
import { useMovies } from "@/hooks/use-movies-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface MovieListProps {
  selectedCategories: string[]
  selectedMood: string | null
}

export default function MovieList({ selectedCategories, selectedMood }: MovieListProps) {
  const { movies, isLoading: isDataLoading } = useMovies()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state for better UX
  useEffect(() => {
    if (!isDataLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isDataLoading])

  // Filter movies based on selected categories and mood
  const filteredMovies = movies.filter((movie) => {
    const matchesCategories =
      selectedCategories.length === 0 || selectedCategories.some((category) => movie.categories.includes(category))

    const matchesMood = !selectedMood || movie.moods.includes(selectedMood)

    return matchesCategories && matchesMood
  })

  if (isLoading || isDataLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col h-full">
            <Skeleton className="aspect-[2/3] w-full" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-4">No movies in the database yet</h3>
        <p className="text-muted-foreground mb-6">Get started by adding movies through the admin dashboard.</p>
        <Link href="/login">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Login to Add Movies
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredMovies.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          No movies match your selected filters. Try adjusting your criteria.
        </div>
      ) : (
        filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  )
}
