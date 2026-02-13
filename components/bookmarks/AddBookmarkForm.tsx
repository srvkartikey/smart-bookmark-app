'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface AddBookmarkFormProps {
  onAdded: () => void
}

export default function AddBookmarkForm({ onAdded }: AddBookmarkFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('User not authenticated')
      }

      const { error } = await supabase.from('bookmarks').insert({
        title,
        url,
        user_id: user.id,
      })

      if (error) throw error

      setTitle('')
      setUrl('')
      onAdded()
    } catch (error: any) {
      console.error('Insert error:', error.message)
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  )
}
