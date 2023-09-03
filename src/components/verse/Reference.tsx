import { Verse } from '@lib/util'

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
