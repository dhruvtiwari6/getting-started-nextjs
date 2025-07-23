'use client';
export const dynamic = "force-dynamic";


import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const token = searchParams.get('token') || '';    

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token }, { withCredentials: true });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">verify email</h1>
        <h2 className="p-2 bg-orange-500 text-black"> {token ? `${token}` : "no token"} </h2>

        {verified && (
          <div>
            <h2>Verified</h2>
            <Link href='/login'>login</Link>
          </div>
        )}

        {error&& (
          <div>
            <h2>Error</h2>
          </div>
        )}
    </div>
  );
}
