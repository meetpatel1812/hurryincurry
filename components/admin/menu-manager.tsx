"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Trash, Edit } from "lucide-react"

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

export function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
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
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    // Fetch categories
    const { data: categoriesData } = await supabase.from("categories").select("*").order("name")

    if (categoriesData) {
      setCategories(categoriesData)
    }

    // Fetch menu items
    const { data: menuItemsData } = await supabase.from("menu_items").select("*").order("name")

    if (menuItemsData) {
      setMenuItems(menuItemsData)
    }

    setLoading(false)
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

    try {
      if (editingItem) {
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
          })
          .eq("id", editingItem.id)

        if (error) throw error

        toast({
          title: "Menu item updated",
          description: `${formData.name} has been updated successfully.`,
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
          title: "Menu item created",
          description: `${formData.name} has been added to the menu.`,
        })
      }

      // Reset form and refresh data
      resetForm()
      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
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
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return

    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Menu item deleted",
        description: "The menu item has been deleted successfully.",
      })

      fetchData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      description: "",
      price: 0,
      image_url: "",
      is_vegetarian: false,
      is_spicy: false,
      is_featured: false,
      category_id: categories.length > 0 ? categories[0].id : "",
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
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
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <Select
                value={formData.category_id?.toString()}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_vegetarian"
                  checked={formData.is_vegetarian}
                  onCheckedChange={(checked) => handleSwitchChange("is_vegetarian", checked)}
                />
                <Label htmlFor="is_vegetarian">Vegetarian</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_spicy"
                  checked={formData.is_spicy}
                  onCheckedChange={(checked) => handleSwitchChange("is_spicy", checked)}
                />
                <Label htmlFor="is_spicy">Spicy</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {editingItem && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4">Loading menu items...</p>
          ) : menuItems.length > 0 ? (
            <div className="space-y-4">
              {menuItems.map((item) => {
                const category = categories.find((c) => c.id === item.category_id)

                return (
                  <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category?.name} - ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center py-4">No menu items found. Add your first item above.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
