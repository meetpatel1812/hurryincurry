import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getFeaturedReviews } from "@/lib/actions"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default async function ContactPage() {
  const featuredReviews = await getFeaturedReviews()

  return (
    <div className="min-h-screen bg-green-50">
      <div className="bg-red-600 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us with any questions, feedback, or to make a reservation.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-600">Get in Touch</h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">Unit 150, 661 wye road sherwood park alberta</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (780) 709-7164</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">Curryinhurry07@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                      <p>Saturday - Sunday: 12:00 PM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-red-600">Location</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-80 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.123456789!2d-113.3123!3d53.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDMwJzQ0LjMiTiAxMTPCsDE4JzQ0LjMiVw!5e0!3m2!1sen!2sus!4v1621555555555!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                aria-label="Google Maps showing our location in Sherwood Park"
              ></iframe>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-red-600">Send Us a Message</h2>

            <form className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={5} required />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Send Message
                </Button>
              </div>
            </form>

            <h2 className="text-2xl font-bold mb-6 text-red-600">Customer Reviews</h2>

            <div className="space-y-4">
              {featuredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-2 italic text-sm">"{review.comment}"</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold">{review.customer_name}</span>
                      <span className="text-gray-500">{new Date(review.review_date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
