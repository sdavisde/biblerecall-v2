import Navbar from '@components/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='w-full h-screen'>
      <Navbar />
      {children}
    </main>
  )
}
