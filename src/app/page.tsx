import { LandingPageBibleSplash } from '@components/icons/LandingPageBibleSplash'
import { LinkButton } from '@components/ui/link-button'

export const dynamic = 'force-static'

export default function Landing() {
  return (
    <main className='w-screen h-screen flex flex-col justify-between overflow-hidden'>
      <div className='top w-full h-full'>
        <h1 className='text-xl m-8 text-primary font-extralight'>Bible Recall</h1>
        <div className='lg:absolute top-0 w-full h-screen flex flex-col lg:flex-row'>
          <div className='flex flex-col gap-4 justify-center items-center w-full'>
            <h2>Memorize</h2>
            <h2 className='font-satisfy'>Meditate</h2>
            <h2 className='font-rockSalt'>Connect</h2>
            <h3 className='text-green'>With God&apos;s Word</h3>
            <p className='mx-12 text-center text-muted-foreground'>
              Ephesians tells us that the sword of the Spirit is the word of God. Are you ready for the spiritual
              battles in your life?
            </p>
            <LinkButton href='/home'>Start Memorizing</LinkButton>
          </div>
          <div className='centered w-full h-full mt-4 relative overflow-hidden'>
            <LandingPageBibleSplash />
          </div>
        </div>
      </div>
    </main>
  )
}
