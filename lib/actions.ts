"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string
  const name = (formData.get("name") as string) || null

  if (!email) {
    return { error: "Email is required" }
  }

  try {
    const supabase = createClient()

    const { error } = await supabase.from("subscribers").insert({ email, name })

    if (error) {
      if (error.code === "23505") {
        return { error: "You are already subscribed!" }
      }
      return { error: "Failed to subscribe. Please try again." }
    }

    return { success: "Thank you for subscribing!" }
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function getFeaturedItems() {
  const supabase = createClient()

  try {
    // First get the featured menu items
    const { data: menuItems, error: menuError } = await supabase
      .from("menu_items")
      .select("id, name, description, price, image_url, is_vegetarian, is_spicy, category_id")
      .eq("is_featured", true)
      .limit(4)

    if (menuError) {
      console.error("Error fetching featured items:", menuError)
      return []
    }

    // If we have menu items, get their categories separately
    if (menuItems && menuItems.length > 0) {
      const categoryIds = menuItems.map((item) => item.category_id).filter(Boolean)

      if (categoryIds.length > 0) {
        const { data: categories, error: categoryError } = await supabase
          .from("categories")
          .select("id, name")
          .in("id", categoryIds)

        if (categoryError) {
          console.error("Error fetching categories:", categoryError)
        } else if (categories) {
          // Join the data manually
          return menuItems.map((item) => ({
            ...item,
            categories: categories.find((cat) => cat.id === item.category_id) || null,
          }))
        }
      }
    }

    return menuItems || []
  } catch (error) {
    console.error("Error in getFeaturedItems:", error)
    return []
  }
}

export async function getCategories() {
  const supabase = createClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

export async function getCategoryByName(name: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", name)
    .single()

  if (error) {
    console.error("Error fetching category by name:", error)
    return null
  }

  return data
}

export async function getMenuItems(categoryId?: string) {
  const supabase = createClient()

  try {
    let query = supabase
      .from("menu_items")
      .select("id, name, description, price, image_url, is_vegetarian, is_spicy, category_id, customization_options")
      .order("name")

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data: menuItems, error: menuError } = await query

    if (menuError) {
      console.error("Error fetching menu items:", menuError)
      return []
    }

    // Get all unique category IDs
    const categoryIds = [...new Set(menuItems.map((item) => item.category_id).filter(Boolean))]

    if (categoryIds.length > 0) {
      const { data: categories, error: categoryError } = await supabase
        .from("categories")
        .select("id, name")
        .in("id", categoryIds)

      if (categoryError) {
        console.error("Error fetching categories:", categoryError)
      } else if (categories) {
        // Join the data manually
        return menuItems.map((item) => ({
          ...item,
          categories: categories.find((cat) => cat.id === item.category_id) || null,
        }))
      }
    }

    return menuItems
  } catch (error) {
    console.error("Error in getMenuItems:", error)
    return []
  }
}

export async function getOffers() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("offers")
    .select("*")
    .eq("is_active", true)
    .order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching offers:", error)
    return []
  }

  return data
}

export async function getFeaturedReviews() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_featured", true)
    .order("review_date", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }

  return data
}

export async function addMenuItem(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const categoryId = formData.get("category_id") as string
  const isVegetarian = formData.get("is_vegetarian") === "on"
  const isSpicy = formData.get("is_spicy") === "on"
  const isFeatured = formData.get("is_featured") === "on"
  const imageUrl = formData.get("image_url") as string

  if (!name || !price || !categoryId) {
    return { error: "Name, price and category are required" }
  }

  try {
    const supabase = createClient()

    const { error } = await supabase.from("menu_items").insert({
      name,
      description,
      price,
      category_id: categoryId,
      is_vegetarian: isVegetarian,
      is_spicy: isSpicy,
      is_featured: isFeatured,
      image_url: imageUrl,
    })

    if (error) {
      return { error: "Failed to add menu item. Please try again." }
    }

    revalidatePath("/menu")
    revalidatePath("/admin/menu")
    return { success: "Menu item added successfully!" }
  } catch (error) {
    console.error("Error adding menu item:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function updateMenuItem(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const categoryId = formData.get("category_id") as string
  const isVegetarian = formData.get("is_vegetarian") === "on"
  const isSpicy = formData.get("is_spicy") === "on"
  const isFeatured = formData.get("is_featured") === "on"
  const imageUrl = formData.get("image_url") as string

  if (!name || !price || !categoryId) {
    return { error: "Name, price and category are required" }
  }

  try {
    const supabase = createClient()

    const { error } = await supabase
      .from("menu_items")
      .update({
        name,
        description,
        price,
        category_id: categoryId,
        is_vegetarian: isVegetarian,
        is_spicy: isSpicy,
        is_featured: isFeatured,
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      return { error: "Failed to update menu item. Please try again." }
    }

    revalidatePath("/menu")
    revalidatePath("/admin/menu")
    return { success: "Menu item updated successfully!" }
  } catch (error) {
    console.error("Error updating menu item:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function deleteMenuItem(id: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("menu_items").delete().eq("id", id)

    if (error) {
      return { error: "Failed to delete menu item. Please try again." }
    }

    revalidatePath("/menu")
    revalidatePath("/admin/menu")
    return { success: "Menu item deleted successfully!" }
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function addOffer(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const discountPercentage = formData.get("discount_percentage")
    ? Number.parseFloat(formData.get("discount_percentage") as string)
    : null
  const discountAmount = formData.get("discount_amount")
    ? Number.parseFloat(formData.get("discount_amount") as string)
    : null
  const startDate = formData.get("start_date") as string
  const endDate = formData.get("end_date") as string
  const imageUrl = formData.get("image_url") as string
  const isActive = formData.get("is_active") === "on"

  if (!title) {
    return { error: "Title is required" }
  }

  try {
    const supabase = createClient()

    const { error } = await supabase.from("offers").insert({
      title,
      description,
      discount_percentage: discountPercentage,
      discount_amount: discountAmount,
      start_date: startDate,
      end_date: endDate,
      image_url: imageUrl,
      is_active: isActive,
    })

    if (error) {
      return { error: "Failed to add offer. Please try again." }
    }

    revalidatePath("/offers")
    revalidatePath("/admin/offers")
    return { success: "Offer added successfully!" }
  } catch (error) {
    console.error("Error adding offer:", error)
    return { error: "An unexpected error occurred" }
  }
}
