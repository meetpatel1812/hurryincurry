import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Check if user is an admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("email", session.user.email).single()

  if (!adminUser) {
    redirect("/admin/login?error=unauthorized")
  }

  // If authenticated and authorized, redirect to admin dashboard
  redirect("/admin/dashboard")
}
