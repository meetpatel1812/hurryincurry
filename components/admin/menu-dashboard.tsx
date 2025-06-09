"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Pencil, Trash, Plus, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

export function MenuDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    image_url: "",
    is_vegetarian: false,
    is_spicy: false,
    is_featured: false,
    category_id: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentItemId, setCurrentItemId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.name || !formData.price || !formData.category_id) {
        throw new Error("Name, price and category are required")
      }

      if (currentItemId) {
        // Update existing item
        const { error } = await supabase
          .from("menu_items")
          .update({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            image_url: formData.image_url,
            is_vegetarian: formData.is_vegetarian,
            is_spicy: formData.is_spicy,
            is_featured: formData.is_featured,
            category_id: formData.category_id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentItemId)

        if (error) throw error

        toast({
          title: "Success",
          description: "Menu item updated successfully",
        })
      } else {
        // Create new item
        const { error } = await supabase.from("menu_items").insert([
          {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            image_url: formData.image_url,
            is_vegetarian: formData.is_vegetarian,
            is_spicy: formData.is_spicy,
            is_featured: formData.is_featured,
            category_id: formData.category_id,
          },
        ])

        if (error) throw error

        toast({
          title: "Success",
          description: "Menu item added successfully",
        })
      }

      // Reset and refresh
      resetForm()
      fetchData()
      setIsDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setCurrentItemId(item.id)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: item.image_url || "",
      is_vegetarian: item.is_vegetarian,
      is_spicy: item.is_spicy,
      is_featured: item.is_featured,
      category_id: item.category_id,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!currentItemId) return
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", currentItemId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      })

      fetchData()
      setIsDeleteDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const confirmDelete = (id: string) => {
    setCurrentItemId(id)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentItemId(null)
    setFormData({
      name: "",
      description: "",
      price: 0,
      image_url: "",
      is_vegetarian: false,
      is_spicy: false,
      is_featured: false,
      category_id: categories.length > 0 ? categories[0].id : "default_category_id",
    })
  }

  const openAddDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const filteredMenuItems = selectedCategory
    ? menuItems.filter((item) => item.category_id === selectedCategory)
    : menuItems

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menu Items</CardTitle>
          <div className="flex items-center gap-4">
            <Select
              value={selectedCategory || "default_category_id"}
              onValueChange={(value) => setSelectedCategory(value || null)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default_category_id">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={openAddDialog} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : filteredMenuItems.length > 0 ? (
            <div className="grid gap-4">
              {filteredMenuItems.map((item) => {
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
                        {item.is_featured && <span className="text-orange-600">• Featured</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => confirmDelete(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No menu items found. Add your first item.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentItemId ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
            <DialogDescription>
              {currentItemId ? "Update the details of this menu item." : "Fill in the details to add a new menu item."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" name="name" value={formData.name || ""} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={formData.category_id || "default_category_id"}
                  onValueChange={(value) => handleSelectChange("category_id", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_vegetarian"
                    checked={formData.is_vegetarian || false}
                    onCheckedChange={(checked) => handleSwitchChange("is_vegetarian", checked)}
                  />
                  <Label htmlFor="is_vegetarian">Vegetarian</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_spicy"
                    checked={formData.is_spicy || false}
                    onCheckedChange={(checked) => handleSwitchChange("is_spicy", checked)}
                  />
                  <Label htmlFor="is_spicy">Spicy</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured || false}
                    onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {currentItemId ? "Updating..." : "Adding..."}
                  </>
                ) : currentItemId ? (
                  "Update Item"
                ) : (
                  "Add Item"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the menu item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
