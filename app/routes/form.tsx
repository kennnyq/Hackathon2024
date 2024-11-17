import { redirect } from '@remix-run/react'
import React from 'react'
import RatingForm from '~/components/sidebar/RatingForm'
import axios from 'axios'
import FormData from 'form-data'

const form = () => {
  return <RatingForm />
}

export const action = async ({ request }: any) => {
  const formData = await request.formData()
  const rating = formData.get('rating')
  const image = formData.get('image') // File object

  console.log('Rating:', rating)
  console.log('Image:', image)

  // Validate the rating
  if (!rating) {
    return { error: 'Rating is required.' }
  }

  // // Create a new FormData instance
  // const data = new FormData();

  // // Add the rating as a JSON file
  // const ratingJson = JSON.stringify({ rating });
  // const ratingBuffer = Buffer.from(ratingJson);

  // data.append('file', ratingBuffer, {
  //   filename: 'rating.json',
  //   filepath: 'data/rating.json',
  //   contentType: 'application/json',
  // });

  // // If an image was uploaded, add it to the FormData
  // if (image && typeof image === 'object' && (image as any).size > 0) {
  //   const arrayBuffer = await (image as any).arrayBuffer();
  //   const imageBuffer = Buffer.from(arrayBuffer);

  //   data.append('file', imageBuffer, {
  //     filename: (image as any).name || 'image.jpg',
  //     filepath: `data/${(image as any).name || 'image.jpg'}`,
  //     contentType: (image as any).type || 'image/jpeg',
  //   });
  // }

  // // Add pinataOptions with wrapWithDirectory set to true
  // const options = JSON.stringify({
  //   wrapWithDirectory: true,
  // });
  // data.append('pinataOptions', options);

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
      image,
      {
        maxBodyLength: Infinity, // Prevent axios from erroring out with large files
        headers: {
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

export default form
