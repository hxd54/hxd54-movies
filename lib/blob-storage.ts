import { put, del, list } from "@vercel/blob"
import type { Movie, CategoryRecommendation, UserInteraction } from "@/types/movie"

// Define key prefixes to organize our data
const BLOB_PREFIXES = {
  MOVIES: "movies/",
  CATEGORY_RECOMMENDATIONS: "recommendations/",
  USER_INTERACTIONS: "interactions/",
  METADATA: "metadata/",
}

// Check if Blob token is available
const isBlobTokenAvailable = !!process.env.BLOB_READ_WRITE_TOKEN

// Log Blob availability on startup
console.log(`Blob token available: ${isBlobTokenAvailable ? "Yes" : "No"}`)

// Storage interface for Blob
export const blobStorage = {
  // Check if Blob storage is available
  isBlobAvailable: isBlobTokenAvailable,

  // Get all movies
  async getMovies(): Promise<Movie[]> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot fetch movies")
      return []
    }

    try {
      // List all blobs with the movies prefix
      const { blobs } = await list({ prefix: BLOB_PREFIXES.MOVIES })

      if (blobs.length === 0) {
        console.log("No movie blobs found")
        return []
      }

      console.log(`Found ${blobs.length} movie blobs`)

      // Fetch each movie's data
      const moviesPromises = blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url)
          if (!response.ok) {
            throw new Error(`Failed to fetch movie data: ${response.statusText}`)
          }
          const data = await response.json()
          return data as Movie
        } catch (error) {
          console.error(`Error fetching movie from ${blob.url}:`, error)
          return null
        }
      })

      const moviesWithNulls = await Promise.all(moviesPromises)
      // Filter out any null values from failed fetches
      const movies = moviesWithNulls.filter((movie) => movie !== null) as Movie[]

      console.log(`Successfully loaded ${movies.length} movies from Blob storage`)
      return movies
    } catch (error) {
      console.error("Error fetching movies from Blob:", error)
      return []
    }
  },

  // Add a movie
  async addMovie(movie: Movie): Promise<boolean> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot add movie")
      return false
    }

    try {
      // Convert movie to JSON string
      const movieData = JSON.stringify(movie)

      console.log(`Adding movie to Blob: ${movie.id}`)

      // Upload to Blob with explicit content type
      const blob = await put(`${BLOB_PREFIXES.MOVIES}${movie.id}.json`, movieData, {
        contentType: "application/json",
        access: "public",
        allowOverwrite: true, // Allow overwriting existing movies with the same ID
      })

      console.log(`Successfully added movie to Blob: ${movie.id}, URL: ${blob.url}`)
      return true
    } catch (error) {
      console.error(`Error adding movie ${movie.id} to Blob:`, error)
      return false
    }
  },

  // Update a movie
  async updateMovie(id: string, movieData: Partial<Omit<Movie, "id">>): Promise<boolean> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot update movie")
      return false
    }

    try {
      console.log(`Updating movie in Blob: ${id}`)

      // Get the current movie data
      const movies = await this.getMovies()
      const movie = movies.find((m) => m.id === id)

      if (!movie) {
        console.error(`Movie with ID ${id} not found for update`)
        return false
      }

      // Update the movie with new data
      const updatedMovie = { ...movie, ...movieData }

      // Save the updated movie
      return await this.addMovie(updatedMovie)
    } catch (error) {
      console.error(`Error updating movie ${id} in Blob:`, error)
      return false
    }
  },

  // Remove a movie
  async removeMovie(id: string): Promise<boolean> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot remove movie")
      return false
    }

    try {
      console.log(`Removing movie from Blob: ${id}`)

      // Delete the movie blob
      await del(`${BLOB_PREFIXES.MOVIES}${id}.json`)

      console.log(`Successfully removed movie from Blob: ${id}`)

      // Also remove any user interactions for this movie
      try {
        const { blobs } = await list({ prefix: `${BLOB_PREFIXES.USER_INTERACTIONS}${id}_` })

        for (const blob of blobs) {
          await del(blob.url)
          console.log(`Removed related interaction: ${blob.url}`)
        }
      } catch (interactionError) {
        console.error(`Error removing interactions for movie ${id}:`, interactionError)
        // Continue even if interaction removal fails
      }

      return true
    } catch (error) {
      console.error(`Error removing movie ${id} from Blob:`, error)
      return false
    }
  },

  // Get all category recommendations
  async getCategoryRecommendations(): Promise<CategoryRecommendation[]> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot fetch recommendations")
      return []
    }

    try {
      // List all blobs with the recommendations prefix
      const { blobs } = await list({ prefix: BLOB_PREFIXES.CATEGORY_RECOMMENDATIONS })

      if (blobs.length === 0) {
        console.log("No recommendation blobs found")
        return []
      }

      console.log(`Found ${blobs.length} recommendation blobs`)

      // Fetch each recommendation's data
      const recommendationsPromises = blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url)
          if (!response.ok) {
            throw new Error(`Failed to fetch recommendation data: ${response.statusText}`)
          }
          const data = await response.json()
          return data as CategoryRecommendation
        } catch (error) {
          console.error(`Error fetching recommendation from ${blob.url}:`, error)
          return null
        }
      })

      const recommendationsWithNulls = await Promise.all(recommendationsPromises)
      // Filter out any null values from failed fetches
      const recommendations = recommendationsWithNulls.filter((rec) => rec !== null) as CategoryRecommendation[]

      console.log(`Successfully loaded ${recommendations.length} recommendations from Blob storage`)
      return recommendations
    } catch (error) {
      console.error("Error fetching category recommendations from Blob:", error)
      return []
    }
  },

  // Update a category recommendation
  async updateCategoryRecommendation(categoryName: string, movieId: string): Promise<boolean> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot update recommendation")
      return false
    }

    try {
      console.log(`Updating recommendation in Blob: ${categoryName} -> ${movieId}`)

      // Create recommendation object
      const recommendation: CategoryRecommendation = { categoryName, movieId }

      // Convert to JSON string
      const recommendationData = JSON.stringify(recommendation)

      // Upload to Blob with explicit content type
      const blob = await put(`${BLOB_PREFIXES.CATEGORY_RECOMMENDATIONS}${categoryName}.json`, recommendationData, {
        contentType: "application/json",
        access: "public",
        allowOverwrite: true, // Allow overwriting existing recommendations
      })

      console.log(`Successfully updated recommendation in Blob: ${categoryName}, URL: ${blob.url}`)
      return true
    } catch (error) {
      console.error(`Error updating recommendation ${categoryName} in Blob:`, error)
      return false
    }
  },

  // Get all user interactions
  async getUserInteractions(): Promise<UserInteraction[]> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot fetch interactions")
      return []
    }

    try {
      // List all blobs with the interactions prefix
      const { blobs } = await list({ prefix: BLOB_PREFIXES.USER_INTERACTIONS })

      if (blobs.length === 0) {
        console.log("No interaction blobs found")
        return []
      }

      console.log(`Found ${blobs.length} interaction blobs`)

      // Fetch each interaction's data
      const interactionsPromises = blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url)
          if (!response.ok) {
            throw new Error(`Failed to fetch interaction data: ${response.statusText}`)
          }
          const data = await response.json()
          return data as UserInteraction
        } catch (error) {
          console.error(`Error fetching interaction from ${blob.url}:`, error)
          return null
        }
      })

      const interactionsWithNulls = await Promise.all(interactionsPromises)
      // Filter out any null values from failed fetches
      const interactions = interactionsWithNulls.filter((int) => int !== null) as UserInteraction[]

      console.log(`Successfully loaded ${interactions.length} interactions from Blob storage`)
      return interactions
    } catch (error) {
      console.error("Error fetching user interactions from Blob:", error)
      return []
    }
  },

  // Update a user interaction
  async updateUserInteraction(movieId: string, userId: string, liked: boolean): Promise<boolean> {
    if (!isBlobTokenAvailable) {
      console.warn("Blob token not available, cannot update interaction")
      return false
    }

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
      return false
    }
  },

  // Get all data
  async getAllData(): Promise<{
    movies: Movie[]
    categoryRecommendations: CategoryRecommendation[]
    userInteractions: UserInteraction[]
  }> {
    const movies = await this.getMovies()
    const categoryRecommendations = await this.getCategoryRecommendations()
    const userInteractions = await this.getUserInteractions()

    return {
      movies,
      categoryRecommendations,
      userInteractions,
    }
  },

  // Create a test file to verify Blob storage is working
  async testBlobStorage(): Promise<{ success: boolean; message: string; url?: string }> {
    if (!isBlobTokenAvailable) {
      return {
        success: false,
        message: "Blob token not available, cannot test Blob storage",
      }
    }

    try {
      const testData = JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
      })

      // Add allowOverwrite: true to fix the error
      const blob = await put(`${BLOB_PREFIXES.METADATA}test.json`, testData, {
        contentType: "application/json",
        access: "public",
        allowOverwrite: true, // Allow overwriting the existing test file
      })

      return {
        success: true,
        message: "Successfully created test file in Blob storage",
        url: blob.url,
      }
    } catch (error) {
      console.error("Error testing Blob storage:", error)
      return {
        success: false,
        message: `Error testing Blob storage: ${error instanceof Error ? error.message : String(error)}`,
      }
    }
  },
}
