"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DebugPage() {
  const [blobStatus, setBlobStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const checkBlobStatus = async () => {
    setRefreshing(true)
    try {
      const response = await fetch("/api/debug/blob")
      const data = await response.json()
      setBlobStatus(data)
    } catch (error) {
      console.error("Error checking Blob status:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    checkBlobStatus()
  }, [])

  return (
    <div className="container py-8 md:py-12 px-4 sm:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Storage Diagnostics</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Vercel Blob Status
              {blobStatus?.status === "ok" ? (
                <Badge variant="success" className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Error
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Diagnostic information about your Vercel Blob storage connection</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : blobStatus ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Blob Token</h3>
                    <div className="flex items-center">
                      {blobStatus.blobTokenAvailable ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                          <XCircle className="h-3 w-3 mr-1" />
                          Not Available
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Test Result</h3>
                    <div className="flex items-center">
                      {blobStatus.status === "ok" ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Success
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                          <XCircle className="h-3 w-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-1">Message</h3>
                  <p className="text-sm text-muted-foreground">{blobStatus.message}</p>
                </div>

                {blobStatus.testUrl && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Test File</h3>
                    <a
                      href={blobStatus.testUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline break-all"
                    >
                      {blobStatus.testUrl}
                    </a>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium mb-1">Last Checked</h3>
                  <p className="text-sm text-muted-foreground">{new Date(blobStatus.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to fetch Blob storage status</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button onClick={checkBlobStatus} disabled={refreshing}>
                {refreshing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh Status
                  </>
                )}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">Go to Admin</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Steps</CardTitle>
            <CardDescription>If you're experiencing issues with Blob storage, try these steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">1. Verify Environment Variables</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure the <code className="bg-muted px-1 py-0.5 rounded">BLOB_READ_WRITE_TOKEN</code> environment
                  variable is correctly set in your Vercel project settings.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">2. Check Blob Store Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Verify that your Blob store is properly connected to your Vercel project in the Storage tab of your
                  Vercel dashboard.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">3. Redeploy Your Application</h3>
                <p className="text-sm text-muted-foreground">
                  Sometimes a fresh deployment can resolve issues with environment variables and connections.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">4. Check Server Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Review your Vercel Function Logs for any errors related to Blob storage operations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
