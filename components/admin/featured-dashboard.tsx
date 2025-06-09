"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Star } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  is_vegetarian: boolean
  is_spicy: boolean
  is_featured: boolean
  category_id: string
}

interface Category {
  id: string
  name: string
}

export function FeaturedDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all")
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (categoriesError) throw categoriesError
      setCategories(categoriesData || [])

      // Fetch menu items
      const { data: menuItemsData, error: menuItemsError } = await supabase.from("menu_items").select("*").order("name")

      if (menuItemsError) throw menuItemsError
      setMenuItems(menuItemsData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    setUpdatingId(id)
    try {
      const { error } = await supabase.from("menu_items").update({ is_featured: !currentValue }).eq("id", id)

      if (error) throw error

      // Update local state
      setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, is_featured: !currentValue } : item)))

      toast({
        title: "Success",
        description: `Item ${!currentValue ? "added to" : "removed from"} featured items`,
      })
    } catch (error) {
      console.error("Error updating featured status:", error)
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredMenuItems =
    selectedCategory !== "all" ? menuItems.filter((item) => item.category_id === selectedCategory) : menuItems

  const featuredItems = menuItems.filter((item) => item.is_featured)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Featured Items</CardTitle>
        </CardHeader>
        <CardContent>
          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredItems.map((item) => {
                const category = categories.find((c) => c.id === item.category_id)
                return (
                  <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                    <div className="relative h-40 w-full">
                      <Image
                        src={item.image_url || "/placeholder.svg?height=200&width=300"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 rounded-full p-1">
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-medium text-orange-600">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{category?.name}</p>
                      <div className="flex gap-2 mb-4">
                        {item.is_vegetarian && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Vegetarian
                          </Badge>
                        )}
                        {item.is_spicy && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Spicy
                          </Badge>
                        )}
                      </div>
                      <Button
                        onClick={() => toggleFeatured(item.id, item.is_featured)}
                        variant="outline"
                        className="w-full"
                        disabled={updatingId === item.id}
                      >
                        {updatingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Remove from Featured"}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No featured items. Add some from the list below.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Menu Items</CardTitle>
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as string | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : filteredMenuItems.length > 0 ? (
            <div className="grid gap-4">
              {filteredMenuItems
                .filter((item) => !item.is_featured)
                .map((item) => {
                  const category = categories.find((c) => c.id === item.category_id)
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50"
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-muted-foreground flex gap-2 items-center">
                          <span>{category?.name}</span>
                          <span>•</span>
                          <span>${item.price.toFixed(2)}</span>
                          {item.is_vegetarian && <span className="text-green-600">• Vegetarian</span>}
                          {item.is_spicy && <span className="text-red-600">• Spicy</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => toggleFeatured(item.id, item.is_featured)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          disabled={updatingId === item.id}
                        >
                          {updatingId === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Star className="h-4 w-4" /> Feature
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No menu items found in this category.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
