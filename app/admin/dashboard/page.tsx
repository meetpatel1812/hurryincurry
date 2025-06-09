"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuDashboard } from "@/components/admin/menu-dashboard"
import { OffersDashboard } from "@/components/admin/offers-dashboard"
import { FeaturedDashboard } from "@/components/admin/featured-dashboard"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if admin is authenticated via localStorage (for demo)
    const adminAuthenticated = localStorage.getItem("adminAuthenticated") === "true"

    if (!adminAuthenticated) {
      router.push("/admin/login")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminEmail")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="bg-orange-600 text-white py-8">
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Curry in Hurry Admin</h1>
              <p>Manage your restaurant's content</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="bg-white text-orange-600 hover:bg-orange-100">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="offers">Offers Management</TabsTrigger>
            <TabsTrigger value="featured">Featured Items</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-4">
            <MenuDashboard />
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <OffersDashboard />
          </TabsContent>

          <TabsContent value="featured" className="space-y-4">
            <FeaturedDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
