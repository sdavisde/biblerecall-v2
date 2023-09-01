export default function SuccessPage() {
  // read search params for difficulty level

  return (
    <div className='w-full h-full centered flex-col gap-8'>
      <h1 className='font-semibold'>Well done completing that verse!</h1>
      <div className='flex flex-col gap-4 text-center'>
        <div>Continue - Icon</div>
        <div>Retry - Icon</div>
        <div>Home - Icon</div>
      </div>
    </div>
  )
}
