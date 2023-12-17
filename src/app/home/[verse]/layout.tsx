export default async function VersePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-[calc(100vh-5rem)] h-[1px] bg-lightGrey text-black dark:bg-black dark:text-lightGrey'>
      {children}
    </main>
  )
}
