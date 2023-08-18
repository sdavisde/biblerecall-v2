import Image from 'next/image'
import Link from 'next/link'

export default function Landing() {
  return (
    <main className='w-screen h-screen flex flex-col justify-between overflow-hidden'>
      <div className='top w-full h-3/5'>
        <h1 className='text-xl m-8 text-green font-extralight'>Bible Recall</h1>
        <div className='h-full flex flex-col justify-center items-center pb-32'>
          <h2>Memorize</h2>
          <h2 className='font-meditation'>Meditate</h2>
          <h2 className='font-heartwarming'>Connect</h2>
          <h3 className='text-green'>With God&apos;s Word</h3>
          <p className='mx-12 my-4 text-center'>
            Ephesians tells us that the sword of the Spirit is the word of God.
            Are you ready for the spiritual battles in your life?
          </p>
          <Link
            href='/home'
            className='bg-green text-white rounded-3xl px-4 py-2'
          >
            Start Memorizing
          </Link>
        </div>
      </div>
      <div className='bottom w-[220%] h-2/5 relative'>
        <Image
          src='/book.svg'
          width={715}
          height={367}
          alt='Bible Image'
          className='absolute left-[-50px] bottom-[-20px]'
        />
      </div>
    </main>
  )
}
