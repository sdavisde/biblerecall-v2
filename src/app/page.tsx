import { Rock_Salt, Satisfy } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const satisfy = Satisfy({ weight: '400', subsets: ['latin'] })
const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] })

export default function Landing() {
  return (
    <main className='w-screen h-screen flex flex-col justify-between overflow-hidden'>
      <div className='top w-full h-full'>
        <h1 className='text-xl m-8 text-green font-extralight'>Bible Recall</h1>
        <div className='lg:absolute top-0 w-full h-screen flex flex-col lg:flex-row'>
          <div className='flex flex-col gap-4 justify-center items-center w-full'>
            <h2>Memorize</h2>
            <h2 className={satisfy.className}>Meditate</h2>
            <h2 className={rockSalt.className + ' text-lg'}>Connect</h2>
            <h3 className='text-green'>With God&apos;s Word</h3>
            <p className='mx-12 text-center'>
              Ephesians tells us that the sword of the Spirit is the word of God. Are you ready for the spiritual
              battles in your life?
            </p>
            <Link
              href='/home'
              className='bg-green text-white rounded-3xl px-4 py-2 z-3'
            >
              Start Memorizing
            </Link>
          </div>
          <div className='centered w-full h-full mt-4 relative overflow-hidden'>
            <Image
              className='z-2 absolute left-0 !max-w-[140%] md:!w-[140%]'
              src='/bible.svg'
              width={715}
              height={367}
              alt='Bible Image'
            />
          </div>
        </div>
      </div>
    </main>
  )
}
