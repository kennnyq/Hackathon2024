// ~/routes/index.tsx
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Suspense, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import MapContainer from '~/components/map/MapContainer'
import SidebarContainerDesktop from '~/components/sidebar/SidebarDesktopContainer'
import SidebarContainerMobile from '~/components/sidebar/SidebarMobileContainer'
import { useWindowSize } from '~/utils/hooks'
import { Color } from '~/utils/types'
import { MarkerLocations } from '~/utils/marker_locations'
import ColorSwitcher from '~/components/ColorSwitcher'
import DropUpButton from '~/components/DropUpButton' // Import the DropUpButton

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

  const [switcherActive, setSwitcherActive] = useState<Boolean>(false)
  const [color, setColor] = useState<Color>('green')

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ColorSwitcher
        color={color}
        switcherActive={switcherActive}
        setColor={setColor}
        setSwitcherActive={setSwitcherActive}
      />
      <MapContainer
        color={color}
        markers={MarkerLocations}
        setSwitcherActive={setSwitcherActive}
      />
      {isDesktop || largeViewport ? (
        <SidebarContainerDesktop />
      ) : (
        <SidebarContainerMobile />
      )}
      <DropUpButton pageType="home" /> {/* Add the DropUpButton here */}
    </Suspense>
  )
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const slug = params.index

  console.log(params)
  return null
}
