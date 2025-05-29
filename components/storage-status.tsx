"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Database, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function StorageStatus() {
  const [status, setStatus] = useState<{
    status: string
    storage: string
    blobTokenAvailable?: boolean
    movieCount?: number
    timestamp: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const checkStatus = async () => {
    setRefreshing(true)
    try {
      const response = await fetch("/api/status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Error checking status:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center">
        <Badge variant="outline" className="text-xs animate-pulse">
          <Database className="h-3 w-3 mr-1" />
          Checking storage...
        </Badge>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="destructive" className="text-xs">
          <Database className="h-3 w-3 mr-1" />
          Status unavailable
        </Badge>
        <Button variant="ghost" size="sm" onClick={checkStatus} disabled={refreshing}>
          <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant={status.storage === "Vercel Blob" ? "default" : "secondary"} className="text-xs cursor-help">
              <Database className="h-3 w-3 mr-1" />
              {status.storage === "Vercel Blob" ? "Vercel Blob" : "In-memory storage"}
              {status.movieCount !== undefined && ` (${status.movieCount} movies)`}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              <p>Storage: {status.storage}</p>
              <p>Blob Token: {status.blobTokenAvailable ? "Available" : "Not Available"}</p>
              <p>Movies: {status.movieCount !== undefined ? status.movieCount : "Unknown"}</p>
              <p>Last checked: {new Date(status.timestamp).toLocaleTimeString()}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button variant="ghost" size="sm" onClick={checkStatus} disabled={refreshing}>
        <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
      </Button>
    </div>
  )
}
