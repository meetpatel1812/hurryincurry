"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setName("")
    setEmail("")
    setMessage("")
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
