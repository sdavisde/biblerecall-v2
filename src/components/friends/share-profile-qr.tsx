'use client'

import { getBaseUrl } from '@components/lib/utils'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { Share } from 'lucide-react'
import { useQRCode } from 'next-qrcode'

interface Props {
  userId: string
  userName: string
}
export function ShareProfileQR({ userId, userName }: Props) {
  const { Canvas } = useQRCode()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='gap-2'
        >
          <Share className='w-5 h-5' />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan to add {userName} as a friend</DialogTitle>
        </DialogHeader>
        <div className='w-full centered'>
          <Canvas
            text={`${getBaseUrl()}/x/community?uid=${userId}`}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: '#000000',
                light: '#FFFFFF',
              },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
