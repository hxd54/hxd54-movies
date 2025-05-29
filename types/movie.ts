export interface Movie {
  id: string
  title: string
  description: string
  imageUrl: string
  trailerUrl: string
  categories: string[]
  moods: string[]
  likes: number
  dislikes: number
}

export interface CategoryRecommendation {
  categoryName: string
  movieId: string
}

export interface UserInteraction {
  movieId: string
  userId: string // Add userId to track interactions per user
  liked: boolean | null // true for like, false for dislike, null for no interaction
}

export type TranslatorCategory =
  | "Rocky"
  | "Gaheza"
  | "Savimbi"
  | "Sankara"
  | "B The Great"
  | "Junior Giti"
  | "Senior"
  | "Dylan"

export const TRANSLATOR_CATEGORIES: TranslatorCategory[] = [
  "Rocky",
  "Gaheza",
  "Savimbi",
  "Sankara",
  "B The Great",
  "Junior Giti",
  "Senior",
  "Dylan",
]
