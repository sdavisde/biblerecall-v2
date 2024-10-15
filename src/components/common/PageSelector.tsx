import { Button } from '@components/ui/button'
import { ConditionalLink } from '@components/util/ConditionalLink'
import { Lodash } from '@util/lodash'
import Image from 'next/image'

type PageSelectorProps = {
  title: string
  subtitle: string
  imageSrc: string
  /** If null, this page selector will effectively be disabled */
  href: string | null
}

export const PageSelector = ({ title, subtitle, imageSrc, href }: PageSelectorProps) => {
  return (
    <ConditionalLink
      href={href}
      className='w-full max-w-lg group'
    >
      <Button
        asDiv
        className='relative w-full h-[120px] rounded-lg cursor-pointer overflow-hidden bg-white shadow-md p-0 hover:bg-white hover:shadow-lg transition-all duration-300'
        variant='outline'
      >
        {Lodash.isNil(href) && <div className='absolute inset-0 bg-gray-500 opacity-30 z-30'></div>}
        <div className='flex-1 p-4 bg-white flex flex-col justify-center z-10'>
          <h2 className='text-lg font-bold'>{title}</h2>
          <p className='text-sm text-gray-600'>{subtitle}</p>
        </div>

        <div className='relative w-1/2 h-full overflow-hidden'>
          <Image
            src={imageSrc}
            alt='Memorize Verses'
            height='200'
            width='250'
            className='w-full h-full object-cover group-hover:blur-sm transition-all duration-300'
            placeholder='blur'
            blurDataURL='/blurry-bible.jpg'
          />

          <div className='absolute top-0 left-[-50px] w-full h-full bg-white z-20 diagonal-cutoff' />
        </div>
      </Button>
    </ConditionalLink>
  )
}
