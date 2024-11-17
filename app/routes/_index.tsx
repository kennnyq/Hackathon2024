// ~/routes/index.tsx (Adjust the path if different)
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

  const [sidebarTimeout, setSidebarTimeout] = useState<Boolean>(false)
  const [sidebarActive, setSidebarActive] = useState<Boolean>(true)
  const [switcherActive, setSwitcherActive] = useState<Boolean>(false)
  const [color, setColor] = useState<Color>('none')
  const [lotName, setLotName] = useState<string>('none')

  console.log(color)
  console.log(lotName)

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
        sidebarTimeout={sidebarTimeout}
        setSidebarActive={setSidebarActive}
        setSwitcherActive={setSwitcherActive}
        setSidebarTimeout={setSidebarTimeout}
        setLotName={setLotName}
      />
      {isDesktop || largeViewport ? (
        <SidebarContainerDesktop
          lotName={lotName}
          color={color}
          sidebarActive={sidebarActive}
          sidebarTimeout={sidebarTimeout}
          setSidebarActive={setSidebarActive}
        />
      ) : (
        <SidebarContainerMobile
          lotName={lotName}
          color={color}
          sidebarActive={sidebarActive}
          sidebarTimeout={sidebarTimeout}
          setSidebarActive={setSidebarActive}
        />
      )}
      <DropUpButton pageType="home" /> {/* Add the DropUpButton here */}
    </Suspense>
  )
}
