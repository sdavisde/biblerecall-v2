import { Profile } from '@components/Profile'
import { Settings } from '@components/Settings/Settings'
import { ThemeSelect } from '@components/Settings/SettingSelectors/Theme'
import { VisibilitySelect } from '@components/Settings/SettingSelectors/Visibility'
import { FontSelect } from '@components/Settings/SettingSelectors/Font'

export default async function Navbar() {
  return (
    <nav className='w-full h-10 bg-green flex justify-between'>
      <div className='flex flex-row ml-4'>
        <h1 className='centered text-base font-light'>Bible Recall</h1>
      </div>
      <div className='flex flex-row mr-4 h-full'>
        <Profile />
        <FontSelect />
        <VisibilitySelect />
        <ThemeSelect />
      </div>
    </nav>
  )
}
