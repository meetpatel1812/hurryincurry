import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getCategories, getMenuItems } from "@/lib/actions"
import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Plus, Leaf, Flame } from "lucide-react"
import AdminMenuItemForm from "@/components/admin-menu-item-form"

export default async function AdminMenuPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("email", session.user.email).single()

  if (!adminUser) {
    redirect("/admin/login?error=unauthorized")
  }

  const categories = await getCategories()
  const allMenuItems = await getMenuItems()

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="bg-orange-600 text-white py-8">
        <div className="container">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Menu Management</h1>
              <p>Add, edit, or remove menu items</p>
            </div>
            <Button asChild variant="outline" className="bg-white text-orange-600 hover:bg-orange-100">
              <Link href="/admin/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu Items</h2>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/admin/menu/add">
              <Plus className="h-4 w-4 mr-2" /> Add New Item
            </Link>
          </Button>
        </div>

        <Tabs defaultValue={categories[0]?.id} className="w-full">
          <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent border-b border-gray-200 pb-2 gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-full px-6"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const menuItems = allMenuItems.filter((item) => item.category_id === category.id)

            return (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="h-40 relative">
                          <Image
                            src={item.image_url || "/placeholder.svg?height=300&width=400"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="flex gap-2">
                              {item.is_vegetarian && (
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                  <Leaf className="h-3 w-3 mr-1" /> Veg
                                </span>
                              )}
                              {item.is_spicy && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                  <Flame className="h-3 w-3 mr-1" /> Spicy
                                </span>
                              )}
                              {item.is_featured && (
                                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                          <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline" className="flex-1">
                              <Link href={`/admin/menu/edit/${item.id}`}>
                                <Pencil className="h-4 w-4 mr-2" /> Edit
                              </Link>
                            </Button>
                            <AdminMenuItemForm itemId={item.id} />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                      <h3 className="text-xl font-medium mb-2">No Items in this Category</h3>
                      <p className="text-gray-600 mb-6">Add your first menu item to this category.</p>
                      <Button asChild className="bg-orange-600 hover:bg-orange-700">
                        <Link href="/admin/menu/add">
                          <Plus className="h-4 w-4 mr-2" /> Add New Item
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
