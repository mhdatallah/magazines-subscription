import { Magazines } from '../components/Magazines'

export default function Home() {
  return (
    <div className='p-8'>
      <h1>Magazines For Less</h1>
      <div className='w-2/3 m-auto my-8'>
        <Magazines />
      </div>
    </div>
  )
}
