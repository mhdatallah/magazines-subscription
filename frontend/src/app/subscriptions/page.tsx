import { Subscriptions } from "@/components/Subscriptions";

export default function Page() {
  return (
    <div className='w-2/3 m-auto my-8'>
      <Subscriptions userId={1} />
    </div>
  )
}
