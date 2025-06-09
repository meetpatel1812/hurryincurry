"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Pencil, Trash, Plus, Loader2, Calendar } from "lucide-react"
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

export function OffersDashboard() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentOfferId, setCurrentOfferId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setOffers(data || [])
    } catch (error) {
      console.error("Error fetching offers:", error)
      toast({
        title: "Error",
        description: "Failed to load offers. Please try again.",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.title) {
        throw new Error("Title is required")
      }

      if (currentOfferId) {
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
          .eq("id", currentOfferId)

        if (error) throw error

        toast({
          title: "Success",
          description: "Offer updated successfully",
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
          title: "Success",
          description: "Offer added successfully",
        })
      }

      // Reset and refresh
      resetForm()
      fetchOffers()
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

  const handleEdit = (offer: Offer) => {
    setCurrentOfferId(offer.id)
    setFormData({
      title: offer.title,
      description: offer.description || "",
      discount_percentage: offer.discount_percentage,
      discount_amount: offer.discount_amount,
      start_date: offer.start_date ? new Date(offer.start_date).toISOString().split("T")[0] : null,
      end_date: offer.end_date ? new Date(offer.end_date).toISOString().split("T")[0] : null,
      image_url: offer.image_url || "",
      is_active: offer.is_active,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!currentOfferId) return
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("offers").delete().eq("id", currentOfferId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Offer deleted successfully",
      })

      fetchOffers()
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
    setCurrentOfferId(id)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentOfferId(null)
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

  const openAddDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Special Offers</CardTitle>
          <Button onClick={openAddDialog} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" /> Add Offer
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
          ) : offers.length > 0 ? (
            <div className="grid gap-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{offer.title}</h3>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
                      {offer.discount_percentage && <span>{offer.discount_percentage}% off</span>}
                      {offer.discount_amount && <span>${offer.discount_amount.toFixed(2)} off</span>}
                      {(offer.start_date || offer.end_date) && (
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {offer.start_date && offer.end_date
                            ? `${formatDate(offer.start_date)} - ${formatDate(offer.end_date)}`
                            : offer.end_date
                              ? `Until ${formatDate(offer.end_date)}`
                              : `From ${formatDate(offer.start_date)}`}
                        </span>
                      )}
                      <span className={offer.is_active ? "text-green-600" : "text-red-600"}>
                        • {offer.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(offer)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => confirmDelete(offer.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No offers found. Add your first offer.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentOfferId ? "Edit Offer" : "Add Offer"}</DialogTitle>
            <DialogDescription>
              {currentOfferId ? "Update the details of this offer." : "Fill in the details to add a new offer."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date || ""}
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
                  checked={formData.is_active || false}
                  onCheckedChange={(checked) => handleSwitchChange("is_active", checked)}
                />
                <Label htmlFor="is_active">Active</Label>
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
                    {currentOfferId ? "Updating..." : "Adding..."}
                  </>
                ) : currentOfferId ? (
                  "Update Offer"
                ) : (
                  "Add Offer"
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
              This action cannot be undone. This will permanently delete the offer.
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
