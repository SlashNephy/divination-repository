import { MantineProvider } from '@mantine/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'


import { App } from './App.tsx'
import { i18n } from './lib/i18n.ts'

// eslint-disable-next-line import/order
import '@mantine/core/styles.css'

const container = document.getElementById('root')
if (container !== null) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </I18nextProvider>
    </StrictMode>
  )
}
