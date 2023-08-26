'use client'

import { ThemeProvider, createTheme } from '@mui/material'

export default function Theme({ children }: { children: React.ReactNode }): React.ReactNode {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#81957f',
        light: '#81957f',
        dark: '#81957f',
        contrastText: '#81957f',
      },
      warning: {
        main: '#CC706F',
        light: '#CC706F',
      },
    },
    typography: {
      fontFamily: 'Urbanist',
      fontSize: 12,
    },
  })
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
