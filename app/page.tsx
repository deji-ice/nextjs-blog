import Image from 'next/image'
import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<div>
<h1 className='text-4xl font-bold'>Welcome to my Blog!</h1>
<div>this is the blog content</div>
</div>
  )
}
