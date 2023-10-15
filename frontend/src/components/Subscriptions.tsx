"use client"
import React, { useEffect, useState } from 'react'
import { useSubscriptions } from '@/hooks/swr'
import { magazinesCancelSubscription } from '@/api/subscriptionService';
import { Subscription } from '@/types';

export const Subscriptions = ({ userId }: { userId: number }) => {
  const { data: subscriptionsData, isValidating: isValidatingSubscriptions, mutate: mutateSubscriptions } = useSubscriptions({ userId });
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();

  useEffect(() => {
    if (subscriptionsData && !isValidatingSubscriptions) setSubscriptions(subscriptionsData)
  }, [isValidatingSubscriptions, subscriptionsData])


  const handleClick = (subscriptionId: number) => {
    magazinesCancelSubscription({ subscriptionId }).then(() => {
      mutateSubscriptions();
    })
  }

  return (
    <div className='bg-zinc-900 rounded-xl p-4 text-center'>
      <table className='w-full' >
        <tbody className='[&>tr>td]:p-2 [&>tr>td:first-child]:rounded-s-md [&>tr>td:last-child]:rounded-e-md'>
          <tr className='bold uppercase bg-zinc-800 text-stone-400'>
            <td>ID</td>
            <td>Magazine ID</td>
            <td>Status</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Actions</td>
          </tr>
          {subscriptions?.map((mag, idx) => {
            const { id, startDate, endDate, isActive, MagazineId } = mag;
            return (
              <tr key={idx} className='hover:bg-zinc-800 text-stone-300'>
                <td>{id}</td>
                <td>{MagazineId}</td>
                <td>{isActive ? 'Active' : "Inactive"}</td>
                <td>{new Date(startDate).toLocaleDateString()}</td>
                <td>{endDate ? new Date(endDate).toLocaleDateString() : '-'}</td>
                {isActive && <td className='w-4/12'><button onClick={() => handleClick(id)} className="px-4 py-2 w-1/2 rounded text-sm bg-red-800 hover:bg-red-500 hover:text-black">Cancel Subscription</button></td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
