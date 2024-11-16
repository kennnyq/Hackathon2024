import type { MetaFunction } from '@remix-run/node'
import { Suspense } from 'react'
import MapContainer from '~/components/map/MapContainer'

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapContainer />
    </Suspense>
  )
}
