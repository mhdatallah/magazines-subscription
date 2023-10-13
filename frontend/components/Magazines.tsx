"use client"
import React from 'react'
import { useMagazines } from '@/hooks/swr'

export const Magazines = () => {
  const { data: magazines } = useMagazines();
  return (
    <div>Magazines</div>
  )
}
