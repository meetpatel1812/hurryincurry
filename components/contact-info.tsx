import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-red-600 mt-1" />
          <div>
            <h3 className="font-medium">Address</h3>
            <address className="not-italic text-muted-foreground">Unit 150, 661 wye road sherwood park alberta</address>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-red-600 mt-1" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-muted-foreground">+1 (587)-713-0024</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-red-600 mt-1" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">Curryinhurry07@gmail.com</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-red-600 mt-1" />
          <div>
            <h3 className="font-medium">Hours</h3>
            <div className="text-muted-foreground">
              <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 12:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
