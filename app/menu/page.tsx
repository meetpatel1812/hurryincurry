import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCategories, getMenuItems, getCategoryByName } from "@/lib/actions"
import { MenuHeader } from "@/components/menu-header"
import { MenuCategory } from "@/components/menu-category"

interface MenuPageProps {
  searchParams: { category?: string }
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
const categories = await getCategories()
const allMenuItems = await getMenuItems()

// Get the category to default to based on search params
let defaultCategoryId = categories[0]?.id
if (searchParams.category) {
  const targetCategory = await getCategoryByName(searchParams.category)
  if (targetCategory) {
    defaultCategoryId = targetCategory.id
  }
}

return (
// <div className="min-h-screen bg-green-50">
<div className="min-h-screen bg-black">
<div className="bg-red-600 text-white py-16">
<div className="container">
<MenuHeader />
</div>
</div>

<div className="container py-12">
<Tabs defaultValue={defaultCategoryId} className="w-full">
<TabsList className="mb-8 flex flex-wrap h-auto bg-transparent border-b border-gray-200 pb-2 gap-2">
{categories.map((category) => (
<TabsTrigger
key={category.id}
value={category.id}
className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-full px-6"
>
{category.name}
</TabsTrigger>
))}
</TabsList>

<Suspense fallback={<div>Loading menu items...</div>}>
{categories.map((category) => {
const menuItems = allMenuItems.filter((item) => item.category_id === category.id)

return (
<TabsContent key={category.id} value={category.id} className="mt-6">
<MenuCategory category={category} items={menuItems} />
</TabsContent>
)
})}
</Suspense>
</Tabs>
</div>
</div>
)
}
