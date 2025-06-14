import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedItems, getFeaturedReviews } from "@/lib/actions"
import NewsletterSignup from "@/components/newsletter-signup"

// new code
import Script from 'next/script'

export default function HomePage() {
  return (
    <>
      <Script
        src="https://cdn.popupsmart.com/bundle.js"
        data-id="966262"
        strategy="afterInteractive"
      />
      {/* Your actual page content */}
      <div>Welcome to our site!</div>
    </>
  )
}

// new code done 

export default async function Home() {
  const featuredItems = await getFeaturedItems()
  const featuredReviews = await getFeaturedReviews()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-red-600 text-white">
{/*         Meet update */}




{/* old code */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          /* style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }} */
          style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/04/57/27/57/360_F_457275775_zKthn4tQlf9e9EgRSEDCLeXmlp3ayDyi.jpg?height=800&width=1600')" }}
        ></div>
        <div className="container relative z-20 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Authentics Indian Cuisine</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience the rich flavors of India at Curry in Hurry, Sherwood Park's premier Indian restaurant
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/menu">View Our Menu</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">Visit Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-red-600">About Curry in Hurry</h2>
              <p className="text-gray-700 mb-6">
                Welcome to Curry in Hurry, where we bring the authentic flavors of India to Sherwood Park. Our restaurant
                offers a delightful culinary journey through the diverse regions of India, featuring traditional recipes
                prepared with the finest ingredients and aromatic spices.
              </p>
              <p className="text-gray-700 mb-6">
                Our chefs have years of experience in crafting delicious Indian dishes that cater to all palates.
                Whether you prefer mild, medium, or spicy, we ensure that every dish delivers an explosion of flavors
                that will leave you craving for more.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Visit Us Today</Link>
              </Button>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://i.imgur.com/Wx5H5ph.png?height=600&width=800"
                alt="Curry in Hurry Restaurant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Serve Section */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-red-600">What We Serve</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore our wide range of authentic Indian dishes, from flavorful curries to tandoori specialties, all
              prepared with traditional recipes and the finest ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image src="https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg" alt="Non Veg Curry Dishes" fill className="object-cover" />

              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Non Veg Curries</h3>
                <p className="text-gray-600 mb-4">
                  Succulent meat and seafood curries slow-cooked in rich, aromatic gravies with authentic Indian spices and herbs.
                </p>
                <Link href="/menu?category=NonVeg Specials" className="text-red-600 hover:text-red-700 font-medium">
                  Explore Curries →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="https://mrsbalbirsingh.com/cdn/shop/articles/Mrs_Balbir_Singh_s_Traditional_Naan_Recipe.png?height=400&width=600"
                  alt="Tandoori Specialties"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tandoori Specialties (Breads)</h3>
                <p className="text-gray-600 mb-4">
                  Marinated meats and vegetables cooked to perfection in our traditional tandoor oven.
                </p>
                <Link href="/menu?category=Tandoori Breads" className="text-red-600 hover:text-red-700 font-medium">
                  Discover Tandoori →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="https://www.sailusfood.com/wp-content/uploads/2013/09/paneer-tawa-masala.jpg?height=400&width=600"
                  alt="Vegetarian Delights"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Vegetarian Delights</h3>
                <p className="text-gray-600 mb-4">
                  A wide variety of flavorful vegetarian dishes that showcase the diversity of Indian cuisine.
                </p>
                <Link href="/menu?category=Vegetable Delight" className="text-red-600 hover:text-red-700 font-medium">
                  View Vegetarian Menu →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-red-600">Featured Dishes</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Try our most popular dishes, carefully selected to give you the best dining experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={item.image_url || "/placeholder.svg?height=300&width=400"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {item.is_vegetarian && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Veg
                    </div>
                  )}
                  {item.is_spicy && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Spicy
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.categories?.name}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-600">${item.price.toFixed(2)}</span>
                    <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                      <Link href="/menu">View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/menu">See All Menu Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-red-600">What Our Customers Say</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their dining experience at
              Curry in Hurry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <Card key={review.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{review.customer_name}</span>
                    <span className="text-sm text-gray-500">{new Date(review.review_date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <section className="py-16 md:py-24 bg-red-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Authentic Indian Flavors</h2>
            <p className="mb-8">
              Visit us in Sherwood Park to enjoy our delicious Indian cuisine in a warm and welcoming atmosphere.
            </p>
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-100">
              <Link href="/contact">Find Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
