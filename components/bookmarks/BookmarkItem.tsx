'use client'

import { supabase } from '@/lib/supabaseClient'

interface Bookmark {
  id: string
  title: string
  url: string
}

interface BookmarkItemProps {
  bookmark: Bookmark
  onDeleted: () => void
}

export default function BookmarkItem({ bookmark, onDeleted }: BookmarkItemProps) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', bookmark.id)

    if (!error) {
      onDeleted()
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          className="text-blue-600 text-sm"
        >
          {bookmark.url}
        </a>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 text-sm"
      >
        Delete
      </button>
    </div>
  )
}
