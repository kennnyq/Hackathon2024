import type { MetaFunction } from '@remix-run/node'
import { Suspense } from 'react'
import { isDesktop } from 'react-device-detect'
import MapContainer from '~/components/map/MapContainer'
import SidebarContainerDesktop from '~/components/sidebar/SidebarDesktopContainer'
import SidebarContainerMobile from '~/components/sidebar/SidebarMobileContainer'
import { useWindowSize } from '~/utils/hooks'

export const meta: MetaFunction = () => {
  return [
    { title: 'Comet Park' },
    {
      name: 'Comet Park',
      content: 'Get help finding a spot in the UTD parking lots!',
    },
  ]
}

export default function Index() {
  const [windowWidth, windowHeight] = useWindowSize()
  const largeViewport = windowWidth > 768

  console.log('Mobile')

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapContainer />
      {isDesktop || largeViewport ? (
        <SidebarContainerDesktop />
      ) : (
        <SidebarContainerMobile />
      )}
    </Suspense>
  )
}
