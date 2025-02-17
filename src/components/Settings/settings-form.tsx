'use client'

import { Button } from '@components/ui/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
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
      <CredenzaContent>
        <Form {...form}>
          <form action={submitSettingsForm}>
            <input
              name='id'
              value={settings?.id}
              readOnly
              hidden
            />
            <CredenzaHeader>
              <CredenzaTitle>Edit Application Settings</CredenzaTitle>
              <CredenzaDescription>Customize the appearance of Bible Recall for you</CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className='max-h-[60dvh] overflow-y-auto'>
              <div className='flex flex-col gap-4 justify-end divide-y-2 divide-secondary space-y-2'>
                <FontSelect />
                <ThemeSelect />
                <VisibilitySelect />
              </div>
            </CredenzaBody>
            <CredenzaFooter>
              <FormButton>Submit</FormButton>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  )
}
