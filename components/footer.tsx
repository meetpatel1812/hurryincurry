import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/lib/actions"

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-red-600 mb-4">Curry in Hurry</h3>
            <p className="text-sm text-gray-600 mb-4">
              Authentic Indian cuisine in Sherwood Park, Alberta. Experience the rich flavors of India.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-red-600">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-red-600">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-red-600">
{/*                 <span className="sr-only">Twitter</span> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-600 hover:text-red-600">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-600 hover:text-red-600">
                  Offers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Unit 150, 661 wye road sherwood park alberta</li>
              <li>+1 (780) 709-7164</li>
              <li>Curryinhurry07@gmail.com</li>
              <li>
                <Link href="/contact" className="text-red-600 hover:text-red-700">
                  View on Map
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <form action={subscribeToNewsletter}>
              <div className="flex flex-col space-y-2">
                <Input type="email" name="email" placeholder="Your email address" required className="bg-white" />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            &copy; {new Date().getFullYear()} Curry in Hurry. All rights reserved. Created by Elite Graphics.
          </p>
        </div>
      </div>
    </footer>
  )
}
