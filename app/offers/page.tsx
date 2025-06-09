import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getOffers } from "@/lib/actions"
import { OffersHeader } from "@/components/offers-header"
import { OfferCard } from "@/components/offer-card"

export default async function OffersPage() {
  const offers = await getOffers()

  return (
    <div className="min-h-screen bg-green-50">
      <div className="bg-red-600 text-white py-16">
        <div className="container">
          <OffersHeader />
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.length > 0 ? (
            offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No Current Offers</h3>
              <p className="text-gray-600 mb-6">Check back soon for new promotions and special deals!</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/menu">Browse Our Menu</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
