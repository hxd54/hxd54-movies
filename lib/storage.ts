import { blobStorage } from "./blob-storage"
import type { Movie, CategoryRecommendation, UserInteraction } from "@/types/movie"
import { put } from "@vercel/blob"

// Define Blob prefixes
const BLOB_PREFIXES = {
  USER_INTERACTIONS: "user-interactions/",
}

// In-memory fallback storage when Blob is not available
const memoryStore: {
  movies: Movie[]
  categoryRecommendations: CategoryRecommendation[]
  userInteractions: UserInteraction[]
} = {
  movies: [],
  categoryRecommendations: [],
  userInteractions: [],
}

// Check if Blob is available
const isBlobAvailable = blobStorage.isBlobAvailable

// Log storage mode on startup
console.log(`Storage mode: ${isBlobAvailable ? "Vercel Blob" : "In-memory"}`)

// Storage interface
export const storage = {
  // Expose Blob availability status
  get isStorageAvailable() {
    return isBlobAvailable
  },

  // Get all movies
  async getMovies(): Promise<Movie[]> {
    if (isBlobAvailable) {
      try {
        const movies = await blobStorage.getMovies()
        return movies
      } catch (error) {
        console.error("Error fetching movies from Blob, falling back to memory store:", error)
        return memoryStore.movies
      }
    }
    return memoryStore.movies
  },

  // Add a movie
  async addMovie(movie: Movie): Promise<boolean> {
    if (isBlobAvailable) {
      try {
        const success = await blobStorage.addMovie(movie)
        if (!success) {
          console.warn("Failed to add movie to Blob, falling back to memory store")
          memoryStore.movies.push(movie)
        }
        return true
      } catch (error) {
        console.error("Error adding movie to Blob, falling back to memory store:", error)
        memoryStore.movies.push(movie)
        return true
      }
    } else {
      memoryStore.movies.push(movie)
      return true
    }
  },

  // Update a movie
  async updateMovie(id: string, movieData: Partial<Omit<Movie, "id">>): Promise<boolean> {
    if (isBlobAvailable) {
      try {
        const success = await blobStorage.updateMovie(id, movieData)
        if (!success) {
          console.warn("Failed to update movie in Blob, falling back to memory store")
          const movieIndex = memoryStore.movies.findIndex((m) => m.id === id)
          if (movieIndex === -1) return false
          memoryStore.movies[movieIndex] = { ...memoryStore.movies[movieIndex], ...movieData, id }
        }
        return true
      } catch (error) {
        console.error("Error updating movie in Blob, falling back to memory store:", error)
        const movieIndex = memoryStore.movies.findIndex((m) => m.id === id)
        if (movieIndex === -1) return false
        memoryStore.movies[movieIndex] = { ...memoryStore.movies[movieIndex], ...movieData, id }
        return true
      }
    } else {
      const movieIndex = memoryStore.movies.findIndex((m) => m.id === id)
      if (movieIndex === -1) return false
      memoryStore.movies[movieIndex] = { ...memoryStore.movies[movieIndex], ...movieData, id }
      return true
    }
  },

  // Remove a movie
  async removeMovie(id: string): Promise<boolean> {
    if (isBlobAvailable) {
      try {
        const success = await blobStorage.removeMovie(id)
        if (!success) {
          console.warn("Failed to remove movie from Blob, falling back to memory store")
          const initialLength = memoryStore.movies.length
          memoryStore.movies = memoryStore.movies.filter((movie) => movie.id !== id)
          memoryStore.userInteractions = memoryStore.userInteractions.filter(
            (interaction) => interaction.movieId !== id,
          )
          return initialLength !== memoryStore.movies.length
        }
        return true
      } catch (error) {
        console.error("Error removing movie from Blob, falling back to memory store:", error)
        const initialLength = memoryStore.movies.length
        memoryStore.movies = memoryStore.movies.filter((movie) => movie.id !== id)
        memoryStore.userInteractions = memoryStore.userInteractions.filter((interaction) => interaction.movieId !== id)
        return initialLength !== memoryStore.movies.length
      }
    } else {
      const initialLength = memoryStore.movies.length
      memoryStore.movies = memoryStore.movies.filter((movie) => movie.id !== id)
      memoryStore.userInteractions = memoryStore.userInteractions.filter((interaction) => interaction.movieId !== id)
      return initialLength !== memoryStore.movies.length
    }
  },

  // Get all category recommendations
  async getCategoryRecommendations(): Promise<CategoryRecommendation[]> {
    if (isBlobAvailable) {
      try {
        const recommendations = await blobStorage.getCategoryRecommendations()
        return recommendations
      } catch (error) {
        console.error("Error fetching category recommendations from Blob, falling back to memory store:", error)
        return memoryStore.categoryRecommendations
      }
    }
    return memoryStore.categoryRecommendations
  },

  // Update a category recommendation
  async updateCategoryRecommendation(categoryName: string, movieId: string): Promise<boolean> {
    if (isBlobAvailable) {
      try {
        const success = await blobStorage.updateCategoryRecommendation(categoryName, movieId)
        if (!success) {
          console.warn("Failed to update recommendation in Blob, falling back to memory store")
          const index = memoryStore.categoryRecommendations.findIndex((rec) => rec.categoryName === categoryName)
          if (index !== -1) {
            memoryStore.categoryRecommendations[index].movieId = movieId
          } else {
            memoryStore.categoryRecommendations.push({ categoryName, movieId })
          }
        }
        return true
      } catch (error) {
        console.error("Error updating category recommendation in Blob, falling back to memory store:", error)
        const index = memoryStore.categoryRecommendations.findIndex((rec) => rec.categoryName === categoryName)
        if (index !== -1) {
          memoryStore.categoryRecommendations[index].movieId = movieId
        } else {
          memoryStore.categoryRecommendations.push({ categoryName, movieId })
        }
        return true
      }
    } else {
      const index = memoryStore.categoryRecommendations.findIndex((rec) => rec.categoryName === categoryName)
      if (index !== -1) {
        memoryStore.categoryRecommendations[index].movieId = movieId
      } else {
        memoryStore.categoryRecommendations.push({ categoryName, movieId })
      }
      return true
    }
  },

  // Get all user interactions
  async getUserInteractions(): Promise<UserInteraction[]> {
    if (isBlobAvailable) {
      try {
        const interactions = await blobStorage.getUserInteractions()
        return interactions
      } catch (error) {
        console.error("Error fetching user interactions from Blob, falling back to memory store:", error)
        return memoryStore.userInteractions
      }
    }
    return memoryStore.userInteractions
  },

  // Update a user interaction
  async updateUserInteraction(movieId: string, userId: string, liked: boolean): Promise<boolean> {
    if (isBlobAvailable) {
      try {
        console.log(`Updating interaction in Blob: ${movieId} for user ${userId} -> ${liked ? "liked" : "disliked"}`)

        // Create interaction object
        const interaction: UserInteraction = { movieId, userId, liked }

        // Convert to JSON string
        const interactionData = JSON.stringify(interaction)

        // Upload to Blob with explicit content type
        const blob = await put(`${BLOB_PREFIXES.USER_INTERACTIONS}${userId}_${movieId}.json`, interactionData, {
          contentType: "application/json",
          access: "public",
          allowOverwrite: true, // Allow overwriting existing interactions
        })

        console.log(`Successfully updated interaction in Blob: ${movieId} for user ${userId}, URL: ${blob.url}`)
        return true
      } catch (error) {
        console.error(`Error updating interaction for movie ${movieId} in Blob:`, error)
        const index = memoryStore.userInteractions.findIndex(
          (interaction) => interaction.movieId === movieId && interaction.userId === userId,
        )
        if (index !== -1) {
          memoryStore.userInteractions[index].liked = liked
        } else {
          memoryStore.userInteractions.push({ movieId, userId, liked })
        }
        return true
      }
    } else {
      const index = memoryStore.userInteractions.findIndex(
        (interaction) => interaction.movieId === movieId && interaction.userId === userId,
      )
      if (index !== -1) {
        memoryStore.userInteractions[index].liked = liked
      } else {
        memoryStore.userInteractions.push({ movieId, userId, liked })
      }
      return true
    }
  },

  // Check if a user has already interacted with a movie
  async hasUserInteracted(movieId: string, userId: string): Promise<boolean> {
    const userInteractions = await this.getUserInteractions()
    return userInteractions.some((interaction) => interaction.movieId === movieId && interaction.userId === userId)
  },

  // Get all data
  async getAllData(): Promise<{
    movies: Movie[]
    categoryRecommendations: CategoryRecommendation[]
    userInteractions: UserInteraction[]
  }> {
    if (isBlobAvailable) {
      try {
        return await blobStorage.getAllData()
      } catch (error) {
        console.error("Error fetching all data from Blob, falling back to individual fetches:", error)
      }
    }

    // Fallback to individual fetches or memory store
    const movies = await this.getMovies()
    const categoryRecommendations = await this.getCategoryRecommendations()
    const userInteractions = await this.getUserInteractions()

    return {
      movies,
      categoryRecommendations,
      userInteractions,
    }
  },

  // Test Blob storage connection
  async testStorage(): Promise<{ success: boolean; message: string; url?: string }> {
    if (!isBlobAvailable) {
      return {
        success: false,
        message: "Blob storage is not available",
      }
    }

    return await blobStorage.testBlobStorage()
  },
}
