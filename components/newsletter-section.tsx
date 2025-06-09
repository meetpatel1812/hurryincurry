"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("subscribers").insert([{ email, name }])

      if (error) {
        throw error
      }

      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })

      setEmail("")
      setName("")
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container">
      <div className="bg-orange-600 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Our Latest Offers</h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter to receive exclusive offers, new menu items, and special event invitations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-white text-orange-600 hover:bg-white/90">
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
