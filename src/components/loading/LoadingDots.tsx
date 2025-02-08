interface SuspenseBoundaryLoaderProps {
  size?: 'sm' | 'md' | 'lg'
}

const SuspenseBoundaryLoader: React.FC<SuspenseBoundaryLoaderProps> = ({ size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-t-2 border-b-2',
    md: 'w-8 h-8 border-t-4 border-b-4',
    lg: 'w-12 h-12 border-t-4 border-b-4',
  }

  return (
    <div className='flex items-center justify-center bg-background'>
      <div className={`${sizeClasses[size]}  border-primary rounded-full animate-spin`}></div>
    </div>
  )
}

export default SuspenseBoundaryLoader
