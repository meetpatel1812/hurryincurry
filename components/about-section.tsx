import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">About Curry in Hurry</h2>
          <div className="space-y-4">
            <p>
              Welcome to Curry in Hurry, where we bring the authentic flavors of India to Sherwood Park. Our restaurant is
              dedicated to serving traditional Indian cuisine made with fresh ingredients and aromatic spices.
            </p>
            <p>
              Founded with a passion for sharing the rich culinary heritage of India, our chefs have mastered the art of
              creating dishes that capture the essence of various Indian regions. From the fiery curries of the south to
              the rich, creamy dishes of the north, we offer a diverse menu that caters to all tastes.
            </p>
            <p>
              At Curry in Hurry, we believe that good food brings people together. Whether you're dining in, taking
              out, or ordering delivery, we're committed to providing you with an exceptional culinary experience.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=600" alt="Restaurant interior" fill className="object-cover" />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Serve</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Authentic Curries</h3>
            <p className="text-muted-foreground">
              Rich, flavorful curries made with traditional spices and techniques.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Fresh Roti</h3>
            <p className="text-muted-foreground">Breads and meats cooked in our traditional clay oven.</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Vegetarian Delights</h3>
            <p className="text-muted-foreground">A wide range of flavorful vegetarian and vegan options.</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">Sweet Endings</h3>
            <p className="text-muted-foreground">Traditional Indian desserts to complete your meal.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
