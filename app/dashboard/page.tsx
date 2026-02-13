'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import AddBookmarkForm from '@/components/bookmarks/AddBookmarkForm'
import BookmarkList from '@/components/bookmarks/BookmarkList'

export default function DashboardPage() {
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Bookmarks</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      <AddBookmarkForm onAdded={() => setRefreshKey(prev => prev + 1)} />

      <BookmarkList refreshKey={refreshKey} />
    </div>
  )
}
