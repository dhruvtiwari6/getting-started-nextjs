import React from 'react'

function page({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>profile data</h1>
      <h2 className = "p-3 bg-green-500">{params.id}</h2>
    </div>
  )
}

export default page
