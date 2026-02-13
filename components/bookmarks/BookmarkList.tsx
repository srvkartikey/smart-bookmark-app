'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import BookmarkItem from './BookmarkItem'

interface Bookmark {
  id: string
  title: string
  url: string
}

interface BookmarkListProps {
  refreshKey: number
}

export default function BookmarkList({ refreshKey }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setBookmarks(data)
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    fetchBookmarks()
  }, [refreshKey])

  return (
    <div className="space-y-4 mt-6">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDeleted={fetchBookmarks}
        />
      ))}
    </div>
  )
}
