"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useServerMovies } from "./use-server-movies"
import type { Movie, CategoryRecommendation, TranslatorCategory } from "@/types/movie"
import { TRANSLATOR_CATEGORIES } from "@/types/movie"

interface MoviesContextType {
  movies: Movie[]
  addMovie: (movie: Movie) => Promise<boolean>
  removeMovie: (id: string) => Promise<boolean>
  likeMovie: (id: string) => Promise<boolean>
  dislikeMovie: (id: string) => Promise<boolean>
  getUserInteraction: (id: string) => { movieId: string; liked: boolean | null } | undefined
  categoryRecommendations: CategoryRecommendation[]
  updateCategoryRecommendation: (categoryName: string, movieId: string) => Promise<boolean>
  getRecommendedMovie: (categoryName: string) => Movie | undefined
  translatorCategories: TranslatorCategory[]
  updateMovie: (id: string, movieData: Partial<Omit<Movie, "id">>) => Promise<boolean>
  isLoading: boolean
  error: string | null
}

// Create the context with a default value that matches the shape but throws an error if used
const MoviesContext = createContext<MoviesContextType | undefined>(undefined)

export function MoviesProvider({ children }: { children: ReactNode }) {
  const {
    movies,
    categoryRecommendations,
    isLoading,
    error,
    addMovie,
    updateMovie,
    removeMovie,
    likeMovie,
    dislikeMovie,
    getUserInteraction,
    updateCategoryRecommendation,
    getRecommendedMovie,
  } = useServerMovies()

  const translatorCategories = TRANSLATOR_CATEGORIES

  // Create the context value object
  const contextValue: MoviesContextType = {
    movies,
    addMovie,
    removeMovie,
    likeMovie,
    dislikeMovie,
    getUserInteraction,
    categoryRecommendations,
    updateCategoryRecommendation,
    getRecommendedMovie,
    translatorCategories,
    updateMovie,
    isLoading,
    error,
  }

  return <MoviesContext.Provider value={contextValue}>{children}</MoviesContext.Provider>
}

export function useMovies() {
  const context = useContext(MoviesContext)
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider")
  }
  return context
}
