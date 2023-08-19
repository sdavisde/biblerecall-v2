import LottieImage from '@components/Lottie'
import bookAnimation from '@assets/lottie/lordicon_book.json'
import Lightbox from '@components/Lightbox'
import Darkbox from '@components/Darkbox'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='w-full h-[94%] flex flex-col items-center'>
      <div className='w-[95%] h-full flex flex-col items-center gap-6 mt-6'>
        <div className='w-full h-12 flex ml-6'>
          <LottieImage
            data={bookAnimation}
            className='w-10 centered'
          />
          <h4 className='text-base centered ml-4'>My Verses</h4>
        </div>
        <hr className='w-full bg-darkGrey h-[2px]' />
        <Darkbox>
          <div className='w-full relative centered'>
            <Image
              src='/icons/close.svg'
              alt='close'
              width={12}
              height={12}
              style={{ color: '#bababa' }}
              className='absolute right-2 top-0'
            />
            <p className='text-sm text-center w-[81%]'>
              Verses will be saved automatically to your device. If you would
              like to view your verses on any device, <br />
              <a
                href='/'
                className='text-underline'
              >
                Log In Here
              </a>
            </p>
          </div>
        </Darkbox>
        <Lightbox title='+ Add Verse' />
      </div>
    </div>
  )
}
