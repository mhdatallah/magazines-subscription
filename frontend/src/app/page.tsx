import Link from 'next/link'

const LINKS = [
  {
    href: '/subscriptions',
    label: 'My subscriptions',
  },
  {
    href: '/magazines',
    label: 'View all magazines',
  },
]

export default function Home() {
  return (
    <div className='flex justify-center py-44'>
      {LINKS.map((link, idx) => <Link key={idx} href={link.href}><button className={'p-8 w-60 mx-8 rounded-xl bg-violet-800 hover:bg-violet-600 text-violet-100'}>{link.label}</button></Link>)}
    </div>
  )
}
