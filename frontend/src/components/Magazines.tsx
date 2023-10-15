"use client"
import React, { useEffect, useState } from 'react'
import { useMagazines, useSubscriptions } from '@/hooks/swr'
import { magazinesSubscribe } from '@/api/subscriptionService';
import { Magazine, Subscription } from '@/types';

export const Magazines = ({ userId }: { userId: number }) => {
  const { data: magazinesData, isValidating: isValidatingMagazines, mutate: mutateMagazines } = useMagazines();
  const { data: subscriptionsData, isValidating: isValidatingSubscriptions, mutate: mutateSubscriptions } = useSubscriptions({ userId });
  const [magazines, setMagazines] = useState<Magazine[]>();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();

  useEffect(() => {
    if (magazinesData && !isValidatingMagazines) setMagazines(magazinesData)
  }, [magazinesData, isValidatingMagazines])
  useEffect(() => {
    if (subscriptionsData && !isValidatingSubscriptions) setSubscriptions(subscriptionsData)
  }, [isValidatingSubscriptions, subscriptionsData])


  const handleClick = (magazineId: number, is_subscribed: boolean) => {
    if (is_subscribed === false) {
      magazinesSubscribe({ magazineId, userId }).then(() => {
        mutateMagazines();
        mutateSubscriptions();
      })
    }
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
            const { id, title } = mag;
            const is_subscribed = Array.isArray(subscriptions) && subscriptions?.filter(subscription => subscription.isActive && subscription.MagazineId === id).length > 0;
            return (
              <tr key={idx} className='hover:bg-zinc-800 text-stone-300'>
                <td className='w-4/12'>{title}</td>
                <td className='w-4/12'>{is_subscribed ? "Subscribed" : "Not subscribed"}</td>
                {(is_subscribed === false) && <td className='w-4/12'><button onClick={() => handleClick(id, is_subscribed)} className={`px-4 py-2 w-1/2 rounded text-sm ${is_subscribed ? "bg-red-800 hover:bg-red-500 hover:text-black" : "bg-green-800 hover:bg-green-500 hover:text-black"}`}>{is_subscribed ? "Cancel Subscription" : "Subscribe"}</button></td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
