"use client"

import { useState, useEffect, useCallback } from "react"
import type { Movie, CategoryRecommendation, UserInteraction } from "@/types/movie"

interface MoviesData {
  movies: Movie[]
  categoryRecommendations: CategoryRecommendation[]
  userInteractions: UserInteraction[]
}

export function useServerMovies() {
  const [data, setData] = useState<MoviesData>({
    movies: [],
    categoryRecommendations: [],
    userInteractions: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load data from the server
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/movies")
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const fetchedData = await response.json()
      setData(fetchedData)
      setError(null)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to load movie data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Load data on component mount
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Add a new movie
  const addMovie = useCallback(
    async (movie: Movie) => {
      try {
        // Optimistically update UI
        setData((prevData) => ({
          ...prevData,
          movies: [...prevData.movies, movie],
        }))

        // Send to server
        const response = await fetch("/api/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movies: [...data.movies, movie],
            categoryRecommendations: data.categoryRecommendations,
            userInteractions: data.userInteractions,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to add movie")
        }

        return true
      } catch (err) {
        console.error("Error adding movie:", err)
        // Revert optimistic update
        await fetchData()
        return false
      }
    },
    [data, fetchData],
  )

  // Update an existing movie
  const updateMovie = useCallback(
    async (id: string, movieData: Partial<Omit<Movie, "id">>) => {
      try {
        // Optimistically update UI
        setData((prevData) => ({
          ...prevData,
          movies: prevData.movies.map((movie) => (movie.id === id ? { ...movie, ...movieData } : movie)),
        }))

        // Send to server
        const response = await fetch(`/api/movies/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        })

        if (!response.ok) {
          throw new Error("Failed to update movie")
        }

        return true
      } catch (err) {
        console.error("Error updating movie:", err)
        // Revert optimistic update
        await fetchData()
        return false
      }
    },
    [fetchData],
  )

  // Remove a movie
  const removeMovie = useCallback(
    async (id: string) => {
      try {
        // Optimistically update UI
        setData((prevData) => ({
          ...prevData,
          movies: prevData.movies.filter((movie) => movie.id !== id),
          userInteractions: prevData.userInteractions.filter((interaction) => interaction.movieId !== id),
          categoryRecommendations: prevData.categoryRecommendations.map((rec) =>
            rec.movieId === id ? { ...rec, movieId: "" } : rec,
          ),
        }))

        // Send to server
        const response = await fetch(`/api/movies/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete movie")
        }

        return true
      } catch (err) {
        console.error("Error removing movie:", err)
        // Revert optimistic update
        await fetchData()
        return false
      }
    },
    [fetchData],
  )

  // Update category recommendation
  const updateCategoryRecommendation = useCallback(
    async (categoryName: string, movieId: string) => {
      try {
        // Optimistically update UI
        setData((prevData) => {
          const exists = prevData.categoryRecommendations.some((rec) => rec.categoryName === categoryName)

          const newRecommendations = exists
            ? prevData.categoryRecommendations.map((rec) =>
                rec.categoryName === categoryName ? { ...rec, movieId } : rec,
              )
            : [...prevData.categoryRecommendations, { categoryName, movieId }]

          return {
            ...prevData,
            categoryRecommendations: newRecommendations,
          }
        })

        // Send to server
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName, movieId }),
        })

        if (!response.ok) {
          throw new Error("Failed to update recommendation")
        }

        return true
      } catch (err) {
        console.error("Error updating recommendation:", err)
        // Revert optimistic update
        await fetchData()
        return false
      }
    },
    [fetchData],
  )

  // Get recommended movie for a category
  const getRecommendedMovie = useCallback(
    (categoryName: string) => {
      const recommendation = data.categoryRecommendations.find((rec) => rec.categoryName === categoryName)
      if (!recommendation) return undefined
      return data.movies.find((movie) => movie.id === recommendation.movieId)
    },
    [data.categoryRecommendations, data.movies],
  )

  // Like a movie
  const likeMovie = useCallback(
    async (id: string) => {
      try {
        // Get or create userId
        let userId = localStorage.getItem("movieMoodUserId")
        if (!userId) {
          userId = `user_${Math.random().toString(36).substring(2, 15)}`
          localStorage.setItem("movieMoodUserId", userId)
        }

        const existingInteraction = data.userInteractions.find(
          (interaction) => interaction.movieId === id && interaction.userId === userId,
        )

        // If user already interacted with this movie, don't allow changes
        if (existingInteraction) {
          console.log("User already interacted with this movie")
          return false
        }

        // Optimistically update UI
        setData((prevData) => {
          // Update movies
          const newMovies = prevData.movies.map((movie) => {
            if (movie.id === id) {
              return { ...movie, likes: movie.likes + 1 }
            }
            return movie
          })

          // Add new user interaction
          const newInteractions = [...prevData.userInteractions, { movieId: id, userId, liked: true }]

          return {
            ...prevData,
            movies: newMovies,
            userInteractions: newInteractions,
          }
        })

        // Send to server
        const response = await fetch("/api/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId: id, userId, liked: true }),
        })

        if (!response.ok) {
          throw new Error("Failed to like movie")
        }

        return true
      } catch (err) {
        console.error("Error liking movie:", err)
        // Revert optimistic update
        await fetchData()
        return false
      }
    },
    [data.userInteractions, fetchData],
  )

  // Dislike a movie
  const dislikeMovie = useCallback(
    async (id: string) => {
      try {
        // Get or create userId
        let userId = localStorage.getItem("movieMoodUserId")
        if (!userId) {
          userId = `user_${Math.random().toString(36).substring(2, 15)}`
          localStorage.setItem("movieMoodUserId", userId)
        }

        const existingInteraction = data.userInteractions.find(
          (interaction) => interaction.movieId === id && interaction.userId === userId,
        )

        // If user already interacted with this movie, don't allow changes
        if (existingInteraction) {
          console.log("User already interacted with this movie")
          return false
        }

        // Optimistically update UI
        setData((prevData) => {
          // Update movies
          const newMovies = prevData.movies.map((movie) => {
            if (movie.id === id) {
              return { ...movie, dislikes: movie.dislikes + 1 }
            }
            return movie
          })

          // Add new user interaction
          const newInteractions = [...prevData.userInteractions, { movieId: id, userId, liked: false }]

          return {
            ...prevData,
            movies: newMovies,
            userInteractions: newInteractions,
          }
        })

        // Send to server
        const response = await fetch("/api/interactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId: id, userId, liked: false }),
        })

        if (!response.ok) {
          throw new Error("Failed to dislike movie")
        }

        return true
      } catch (err) {
        console.error("Error disliking movie:", err)
        // Revert optimistic update
        await fetchData()
        return false
      }
    },
    [data.userInteractions, fetchData],
  )

  // Get user interaction for a movie
  const getUserInteraction = useCallback(
    (id: string) => {
      // Generate a unique userId from localStorage or create one if it doesn't exist
      let userId = localStorage.getItem("movieMoodUserId")
      if (!userId) {
        userId = `user_${Math.random().toString(36).substring(2, 15)}`
        localStorage.setItem("movieMoodUserId", userId)
      }

      return data.userInteractions.find((interaction) => interaction.movieId === id && interaction.userId === userId)
    },
    [data.userInteractions],
  )

  // Return all the functions and data
  return {
    movies: data.movies,
    categoryRecommendations: data.categoryRecommendations,
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
  }
}
