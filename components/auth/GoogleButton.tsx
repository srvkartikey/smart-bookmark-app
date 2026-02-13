'use client'

import { supabase } from '@/lib/supabaseClient'

export default function GoogleButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-2 bg-black text-white rounded"
    >
      Sign in with Google
    </button>
  )
}
