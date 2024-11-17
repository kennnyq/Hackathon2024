// ~/routes/index.tsx (Adjust the path if different)
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Suspense, useEffect, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import MapContainer from '~/components/map/MapContainer'
import SidebarContainerDesktop from '~/components/sidebar/SidebarDesktopContainer'
import SidebarContainerMobile from '~/components/sidebar/SidebarMobileContainer'
import { useWindowSize } from '~/utils/hooks'
import { Color } from '~/utils/types'
import { MarkerLocations } from '~/utils/marker_locations'
import ColorSwitcher from '~/components/ColorSwitcher'
import DropUpButton from '~/components/DropUpButton'
import { uuidv4 } from '~/utils/utils'
import { useLoaderData } from '@remix-run/react'

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
  const pinataData = useLoaderData()
  const largeViewport = windowWidth > 768

  const [sidebarTimeout, setSidebarTimeout] = useState<Boolean>(false)
  const [sidebarActive, setSidebarActive] = useState<Boolean>(true)
  const [switcherActive, setSwitcherActive] = useState<Boolean>(false)
  const [color, setColor] = useState<Color>('green')
  const [lotName, setLotName] = useState<string>('none')

  console.log(pinataData)
  // useEffect(() => {}, [lotName])

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
      <DropUpButton pageType="home" />
    </Suspense>
  )
}

export const loader = async () => {
  const axios = (await import('axios')).default

  // Set your Pinata API key and secret
  const PINATA_API_KEY = process.env.PINATA_API_KEY
  const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY

  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    console.error('Pinata API keys are not set.')
    return { error: 'Server configuration error.' }
  }

  try {
    // Make the GET request to Pinata
    const response = await axios.get('https://api.pinata.cloud/data/pinList', {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    })

    console.log('Response received')

    // Return the list of files
    return response.data.rows
  } catch (error) {
    console.error('Error retrieving files from Pinata:', error)
    return { error: 'Failed to retrieve data from Pinata.' }
  }
}

export const action = async ({ request }: any) => {
  const axios = (await import('axios')).default
  const FormData = (await import('form-data')).default
  const fs = await import('fs')
  const path = await import('path')

  const formData = await request.formData()
  const rating = formData.get('rating')
  const image = formData.get('image')
  const lotName = formData.get('lotName')
  const color = formData.get('color')
  const currentDateTime = new Date().toISOString()

  console.log('Rating:', rating)
  console.log('Lot Name:', lotName)
  console.log('Color:', color)
  console.log('Image:', image)

  // Validate the rating
  if (!rating) {
    return { error: 'Rating is required.' }
  }

  // try {
  //   // Handle the file upload
  //   const filePath = await handleUpload(image)

  //   console.log(filePath)

  //   // Send the file to OpenAI API
  //   const response = await sendImageToOpenAI(filePath)

  //   return Response.json({
  //     message: 'Image uploaded successfully!',
  //     data: response,
  //   })
  // } catch (error: any) {
  //   return Response.json(
  //     { message: 'Failed to upload image to OpenAI.', error: error.message },
  //     { status: 500 }
  //   )
  // }

  // Create a new FormData instance
  const data = new FormData()

  // If an image was uploaded, add it to the FormData
  if (image && typeof image === 'object' && (image as any).size > 0) {
    const arrayBuffer = await (image as any).arrayBuffer()
    const imageBuffer = Buffer.from(arrayBuffer)

    data.append('file', imageBuffer, {
      filename: (image as any).name || 'image.jpg',
      filepath: `data/${(image as any).name || 'image.jpg'}`,
      contentType: (image as any).type || 'image/jpeg',
    })
  }

  const metadata = JSON.stringify({
    name: uuidv4(),
    keyvalues: {
      rating: rating,
      uploadDate: currentDateTime,
      lotName: lotName,
      color: color,
      imgName: (image as any)?.name || 'image.jpg',
    },
  })
  data.append('pinataMetadata', metadata)

  // Add pinataOptions with wrapWithDirectory set to true
  const options = JSON.stringify({
    wrapWithDirectory: true,
  })
  data.append('pinataOptions', options)

  // Set your Pinata API key and secret
  const PINATA_API_KEY = process.env.PINATA_API_KEY
  const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY

  // Ensure that API keys are set
  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
    console.error('Pinata API keys are not set.')
    return new Response(
      JSON.stringify({ error: 'Server configuration error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Make the POST request to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        maxBodyLength: Infinity, // Prevent axios from erroring out with large files
        headers: {
          ...data.getHeaders(),
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    )

    // Handle the response from Pinata
    const { IpfsHash } = response.data
    console.log('Pinned to IPFS with hash:', IpfsHash)

    // Return a success response
    return new Response(JSON.stringify({ success: true, ipfsHash: IpfsHash }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error pinning to Pinata:', error)

    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Failed to pin data to Pinata.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

const getFilesFromPinata = async (color) => {
  const response = await axios.get(
    'https://api.pinata.cloud/data/pinList?metadata[keyvalues]={"color":{"value":"green", "op": "eq"}}',
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    }
  )
}

async function handleUpload(file: any) {
  // Define the uploads directory
  const uploadsDir = path.resolve('uploads')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir)
  }

  // Create a unique filename
  const filePath = path.join(uploadsDir, `${Date.now()}-${file.name}`)
  const buffer = Buffer.from(await file.arrayBuffer())

  // Save the file
  fs.writeFileSync(filePath, buffer)

  return filePath
}

const sendImageToOpenAI = (image: any) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data from the resolved promise')
    }, 10) // Resolve after 1 second
  })
}
