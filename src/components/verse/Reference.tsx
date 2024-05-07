import { Verse } from 'types/verse'

type ReferenceProps = {
  verse: Verse
  className?: string
}
export default function Reference({ verse, className }: ReferenceProps) {
  return (
    <p className={'text-lg ' + (className ?? '')}>
      {verse.book.name} {verse.chapter}:{verse.start}
      {verse.end ? '-' + verse.end : ''}
    </p>
  )
}
