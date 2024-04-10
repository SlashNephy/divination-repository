import { Anchor, Badge, Card, Checkbox, Code, Container, Group, Loader, Space, Stack, Table, Text, Title } from '@mantine/core'
import { IconAlertTriangleFilled, IconBook, IconPuzzle } from '@tabler/icons-react'
import React, { Suspense, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { usePluginMaster } from './lib/usePluginMaster.ts'

export function App(): React.JSX.Element {
  const { t } = useTranslation()
  const [isTesting, setIsTesting] = useState(false)

  return (
    <Container mb="lg" mt="lg" size="xl">
      <Card withBorder>
        <Stack>
          <Text>
            <Trans i18nKey="TopDescription">
              <Anchor href="/" />
            </Trans>
          </Text>

          <Stack>
            <Group>
              <Title order={3}>
                <IconBook />️ {t('HowToUseHeader')}
              </Title>
            </Group>

            <Text>{t('HowToUseDescription')}</Text>
            <Code>https://xiv.starry.blue/plugins/master.json</Code>
          </Stack>

          <Stack>
            <Group>
            <Title order={3}>
                <IconAlertTriangleFilled />️ {t('DisclaimerHeader')}
              </Title>
            </Group>

            <Text>
              <Trans i18nKey="DisclaimerDescription" />
            </Text>
          </Stack>

    <Stack>
          <Group>
            <Title order={3}>
              <IconPuzzle />️ {t('PluginListHeader')}
            </Title>
          </Group>

              <Text>{t('PluginListDescription')}</Text>
              <Checkbox checked={isTesting} label={t('PluginListShowTestingVersions')} size="sm" onChange={(event) => { setIsTesting(event.currentTarget.checked) }} />

              <Suspense
                fallback={
                  <Stack justify="center">
                    <Loader />
                  </Stack>
                }
              >
                <PluginList isTesting={isTesting} />
              </Suspense>
            </Stack>
        </Stack>
      </Card>
    </Container>
  )
}

type PluginListProps = {
  isTesting: boolean
}

export function PluginList({ isTesting }: PluginListProps): React.JSX.Element {
  const { t } = useTranslation()
  const plugins = usePluginMaster()

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t('PluginListTableHeaderName')}</Table.Th>
          <Table.Th>{t('PluginListTableHeaderDescription')}</Table.Th>
          <Table.Th>{t('PluginListTableHeaderVersion')}</Table.Th>
          <Table.Th>{t('PluginListTableHeaderDownloads')}</Table.Th>
        </Table.Tr>

      </Table.Thead>
      <Table.Tbody>
        {plugins
          .sort((a, b) => b.DownloadCount - a.DownloadCount)
          .map((plugin) => (
            <Table.Tr key={plugin.InternalName}>
              <Table.Td>
                <Anchor
                  href={`https://github.com/SlashNephy/Divination/tree/master/${plugin.InternalName}`}
                  target="_blank"
                >
                  <Title order={3}>{plugin.InternalName}</Title>
                </Anchor>
              </Table.Td>
              <Table.Td>
                <Stack>
                  {plugin.Description && (
                    <Text style={{ wordWrap: 'break-word', wordBreak: 'break-all', width: '100%', tableLayout: 'fixed' }}>
                      {plugin.Description}
                    </Text>
                  )}
                </Stack>

                <Space h="md" />

                <Group>
                  {plugin.CategoryTags.map((tag) => (
                    <Badge key={tag} color="secondary" variant="flat">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Badge>
                  ))}
                  {plugin.Tags.map((tag) => (
                    <Badge key={tag} color="primary" variant="flat">
                      #{tag}
                    </Badge>
                  ))}
                </Group>
              </Table.Td>
              <Table.Td>
                <Stack>
                <Anchor href={isTesting ? plugin.DownloadLinkTesting : plugin.DownloadLinkInstall} target="_blank">
                  {isTesting ? plugin.TestingAssemblyVersion : plugin.AssemblyVersion}
                </Anchor>
                <Badge color="orange" variant="dot">
                API {plugin.DalamudApiLevel}
                </Badge>
                </Stack>
              </Table.Td>
              <Table.Td>{plugin.DownloadCount}</Table.Td>
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table>
  )
}
