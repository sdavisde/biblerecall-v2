import Image from 'next/image'
import Link from 'next/link'

export default function Landing() {
  return (
    <main className='w-screen h-screen flex flex-col justify-between overflow-hidden'>
      <div className='top w-full h-full'>
        <h1 className='text-xl m-8 text-green font-extralight'>Bible Recall</h1>
        <div className='lg:absolute top-0 w-full h-screen flex flex-col lg:flex-row'>
          <div className='flex flex-col gap-4 justify-center items-center w-full'>
            <h2>Memorize</h2>
            <h2 className='font-meditation'>Meditate</h2>
            <h2 className='font-heartwarming'>Connect</h2>
            <h3 className='text-green'>With God&apos;s Word</h3>
            <p className='mx-12 text-center'>
              Ephesians tells us that the sword of the Spirit is the word of
              God. Are you ready for the spiritual battles in your life?
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
              src='/book.svg'
              width={715}
              height={367}
              alt='Bible Image'
              className='z-2 absolute left-0 !max-w-[140%] md:!w-[140%]'
            />
          </div>
        </div>
      </div>
    </main>
  )
}
