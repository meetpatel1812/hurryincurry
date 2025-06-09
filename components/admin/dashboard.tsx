"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuManager } from "@/components/admin/menu-manager"
import { OfferManager } from "@/components/admin/offer-manager"
import { ReviewManager } from "@/components/admin/review-manager"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export function AdminDashboard() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Restaurant Admin Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut} disabled={loading}>
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      </div>

      <Tabs defaultValue="menu">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="offers">Offers Management</TabsTrigger>
          <TabsTrigger value="reviews">Reviews Management</TabsTrigger>
        </TabsList>

        <TabsContent value="menu">
          <MenuManager />
        </TabsContent>

        <TabsContent value="offers">
          <OfferManager />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
