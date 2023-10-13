"use client"
import React from 'react'
import { useMagazines } from '@/hooks/swr'

export const Magazines = () => {
  const { data: magazines } = useMagazines();

  const handleClick = (id: number, is_subscribed: boolean) => {
    console.log(id, is_subscribed)
  }

  return (
    <div className='bg-zinc-900 rounded-xl p-4 text-center'>
      <table className='w-full' >
        <tbody className='[&>tr>td]:p-2 [&>tr>td:first-child]:rounded-s-md [&>tr>td:last-child]:rounded-e-md'>
          <tr className='bold uppercase bg-zinc-800 text-stone-400'>
            <td>Title</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
          {magazines?.map((mag, idx) => {
            const { id, title, is_subscribed } = mag;
            return (
              <tr key={idx} className='hover:bg-zinc-800 text-stone-300'>
                <td className='w-4/12'>{title}</td>
                <td className='w-4/12'>{is_subscribed ? "Subscribed" : "Not subscribed"}</td>
                <td className='w-4/12'><button onClick={() => handleClick(id, is_subscribed)} className={`px-4 py-2 w-1/2 rounded text-sm ${is_subscribed ? "bg-red-800 hover:bg-red-500 hover:text-black" : "bg-green-800 hover:bg-green-500 hover:text-black"}`}>{is_subscribed ? "Cancel Subscription" : "Subscribe"}</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
