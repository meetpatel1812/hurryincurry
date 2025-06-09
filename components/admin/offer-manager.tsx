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
import { useToast } from "@/hooks/use-toast"
import { Trash, Edit } from "lucide-react"

interface Offer {
  id: string
  title: string
  description: string | null
  discount_percentage: number | null
  discount_amount: number | null
  start_date: string | null
  end_date: string | null
  image_url: string | null
  is_active: boolean
}

export function OfferManager() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [formData, setFormData] = useState<Partial<Offer>>({
    title: "",
    description: "",
    discount_percentage: null,
    discount_amount: null,
    start_date: null,
    end_date: null,
    image_url: "",
    is_active: true,
  })
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    setLoading(true)

    const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch offers",
        variant: "destructive",
      })
    } else {
      setOffers(data || [])
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingOffer) {
        // Update existing offer
        const { error } = await supabase
          .from("offers")
          .update({
            title: formData.title,
            description: formData.description,
            discount_percentage: formData.discount_percentage,
            discount_amount: formData.discount_amount,
            start_date: formData.start_date,
            end_date: formData.end_date,
            image_url: formData.image_url,
            is_active: formData.is_active,
          })
          .eq("id", editingOffer.id)

        if (error) throw error

        toast({
          title: "Offer updated",
          description: `${formData.title} has been updated successfully.`,
        })
      } else {
        // Create new offer
        const { error } = await supabase.from("offers").insert([
          {
            title: formData.title,
            description: formData.description,
            discount_percentage: formData.discount_percentage,
            discount_amount: formData.discount_amount,
            start_date: formData.start_date,
            end_date: formData.end_date,
            image_url: formData.image_url,
            is_active: formData.is_active,
          },
        ])

        if (error) throw error

        toast({
          title: "Offer created",
          description: `${formData.title} has been added successfully.`,
        })
      }

      // Reset form and refresh data
      resetForm()
      fetchOffers()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer)
    setFormData({
      title: offer.title,
      description: offer.description || "",
      discount_percentage: offer.discount_percentage,
      discount_amount: offer.discount_amount,
      start_date: offer.start_date,
      end_date: offer.end_date,
      image_url: offer.image_url || "",
      is_active: offer.is_active,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return

    try {
      const { error } = await supabase.from("offers").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Offer deleted",
        description: "The offer has been deleted successfully.",
      })

      fetchOffers()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingOffer(null)
    setFormData({
      title: "",
      description: "",
      discount_percentage: null,
      discount_amount: null,
      start_date: null,
      end_date: null,
      image_url: "",
      is_active: true,
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingOffer ? "Edit Offer" : "Add New Offer"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Offer Title</Label>
              <Input id="title" name="title" value={formData.title || ""} onChange={handleInputChange} required />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount_percentage">Discount Percentage (%)</Label>
                <Input
                  id="discount_percentage"
                  name="discount_percentage"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.discount_percentage || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_amount">Discount Amount ($)</Label>
                <Input
                  id="discount_amount"
                  name="discount_amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount_amount || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 5.99"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date ? new Date(formData.start_date).toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date ? new Date(formData.end_date).toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                />
              </div>
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

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex justify-end gap-2">
              {editingOffer && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                {editingOffer ? "Update Offer" : "Add Offer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Offers</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-4">Loading offers...</p>
          ) : offers.length > 0 ? (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{offer.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {offer.discount_percentage && <span>{offer.discount_percentage}% off</span>}
                      {offer.discount_amount && <span>${offer.discount_amount.toFixed(2)} off</span>}
                      <span>{offer.is_active ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(offer)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(offer.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4">No offers found. Add your first offer above.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
