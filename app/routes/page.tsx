import React from 'react'

import axios from 'axios'
import { useLoaderData } from 'react-router'

type File = {
  ipfs_pin_hash: string
  metadata: { name?: string }
}

function Index() {
  const files = useLoaderData<File[]>()
  const file = files[4]
  console.log(file.metadata)

  return (
    <div>
      <h1>Pinned Files on Pinata</h1>
      <ul>
        <li key={file.ipfs_pin_hash}>
          <h3>{file.metadata.name || file.ipfs_pin_hash}</h3>
          {/* Display the image */}
          <img
            src={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}/data/camera.jpg`}
            alt={file.metadata.name || 'Pinned File'}
            style={{ width: '200px', height: 'auto' }}
          />
          <p>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on IPFS
            </a>
          </p>
        </li>
      </ul>
    </div>
  )
}

export const loader = async () => {
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

export default Index
