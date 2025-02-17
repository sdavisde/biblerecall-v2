'use client'

import { Button } from '@components/ui/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@components/ui/credenza'
import { Form } from '@components/ui/form'
import { Settings, settingsSchema } from '@configuration/settings'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { submitSettingsForm } from 'src/server/routers/settings'
import { z } from 'zod'
import { FontSelect } from './SettingSelectors/Font'
import { ThemeSelect } from './SettingSelectors/Theme'
import { VisibilitySelect } from './SettingSelectors/Visibility'
import { FormButton } from '@components/form/form-button'

interface Props {
  settings: Settings | null
}
export function SettingsForm({ settings }: Props) {
  const form = useForm<z.infer<typeof settingsSchema>>({
    defaultValues: settings ?? {},
    resolver: zodResolver(settingsSchema),
  })

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button
          className='w-8 h-8 !p-[8px]'
          variant='ghost'
        >
          <Edit />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className='max-h-screen overflow-y-auto'>
        <CredenzaClose>Close</CredenzaClose>
        <CredenzaHeader>
          <CredenzaTitle>Edit Application Settings</CredenzaTitle>
          <CredenzaDescription>Customize the appearance of Bible Recall for you</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <Form {...form}>
            <form
              action={submitSettingsForm}
              className='flex flex-col gap-4 justify-end'
            >
              <FontSelect />
              <ThemeSelect />
              <VisibilitySelect />
              <FormButton>Submit</FormButton>
            </form>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
