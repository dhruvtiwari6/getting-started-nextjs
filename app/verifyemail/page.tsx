'use client'

import React, { Suspense } from 'react'
import VerifyEmail from './verifyemail'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  )
}
