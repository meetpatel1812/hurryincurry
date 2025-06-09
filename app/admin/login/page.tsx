"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Special case for demo purposes - hardcoded admin credentials
      if (email === "admin@gmail.com" && password === "admin") {
        // Create a session cookie or localStorage item to indicate admin is logged in
        localStorage.setItem("adminAuthenticated", "true")
        localStorage.setItem("adminEmail", email)

        router.push("/admin/dashboard")
        router.refresh()
        return
      }

      // Regular Supabase authentication for other users
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      router.push("/admin/dashboard")
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Admin Login</CardTitle>
          <CardDescription>Sign in to access the restaurant admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {(error || errorParam) && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error ||
                  (errorParam === "unauthorized"
                    ? "You are not authorized to access the admin area"
                    : "Authentication error")}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>For demo: admin@gmail.com / admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
