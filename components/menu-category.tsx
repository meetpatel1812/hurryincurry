import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  is_vegetarian: boolean
  is_spicy: boolean
  customization_options: any
}

interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
}

interface MenuCategoryProps {
  category: Category
  items: MenuItem[]
}

export function MenuCategory({ category, items }: MenuCategoryProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-4 mb-6">
        {category.image_url && (
          <div className="relative h-16 w-16 rounded-full overflow-hidden text-white">
            <Image src={category.image_url || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-red-600">{category.name}</h2>
{/*           {category.description && <p className="text-muted-foreground">{category.description}</p>} */}
          {category.name === "Meat & Sea Food" ? (
  <>
    <p className="text-white"><strong>Choose your Own Curry</strong></p>
    <p className="text-white"><strong>1. Curry</strong> - An Onion & Tomato base flavoured gravy with herb & spices.</p>
  <p className="text-white"><strong>2. Saagwala</strong> - Addition of fresh spinach & cream makes the dish healthier & tastier.</p>
  <p className="text-white"><strong>3. Kadai</strong> - Thick delicious gravy cooked with sautéed onions, bell peppers & tomatoes.</p>
  <p className="text-white"><strong>4. Roganjosh</strong> - A spicy thin curry cooked with cracked whole spices.</p>
  <p className="text-white"><strong>5. Vondaloo</strong> - South Indian curry with touch of tamarind & topped with shredded coconut.</p>
  <p className="text-white"><strong>6. Bhuna</strong> - Meat cooked in our thick gravy with onions & roasted tomatoes.</p>
  <p className="text-white"><strong>7. Masala</strong> - Creamy thick sauce cooked with herbs & spices.</p>
  <p className="text-white"><strong>8. Lababdaar</strong> - A Mughlai style dish made with onion & tomato creamy sauce.</p>
  <p className="text-white"><strong>9. Korma</strong> - Spicy sauce made of yogurt & cream.</p>
  </>
) : (
  category.description && <p className="text-white">{category.description}</p>
)}
        </div>
      </div>

      <div className="space-y-8 text-white">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-6">
            {item.image_url && (
              <div className="relative h-40 w-full md:w-48 md:h-32 rounded-md overflow-hidden">
                <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{item.name}</h3>
                  <div className="flex gap-2 mt-1">
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
                </div>
                <span className="font-medium text-red-600">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground mt-2">{item.description}</p>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-muted-foreground text-center py-4">No items available in this category.</p>
        )}
      </div>
    </div>
  )
}
