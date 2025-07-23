'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const token = searchParams.get('token') || ''

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.post('/api/users/verifyemail', { token }, { withCredentials: true })
        setVerified(true)
      } catch (err) {
        setError(true)
      }
    }

    if (token) verify()
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">{token ? token : 'No token'}</h2>

      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  )
}
