import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Verses } from '@util/verses'
import { useVerses } from 'src/hooks/use-verses'
import { PropsWithChildren, useState } from 'react'
import { Verse } from 'src/service/verse/types'

type DeleteVerseDialogProps = {
  verse: Verse
}

export const DeleteVerseDialog = ({ verse, children }: PropsWithChildren<DeleteVerseDialogProps>) => {
  const [open, setOpen] = useState(false)
  const [, dispatchVerses] = useVerses()

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        asChild
        onClick={(e) => {
          setOpen((prev) => !prev)
          e.stopPropagation()
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Verse</DialogTitle>
          <DialogDescription>Are you sure you want to delete {Verses.stringifyReference(verse)}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='ghost'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => dispatchVerses(verse, 'delete')}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
