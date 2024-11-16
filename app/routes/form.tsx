import { redirect } from '@remix-run/react'
import React from 'react'
import RatingForm from '~/components/sidebar/RatingForm'

const form = () => {
  return <RatingForm />
}

export const action = async ({ request }: any) => {
  const formData = await request.formData()
  const rating = formData.get('rating')
  // const image = formData.get('image') // File object

  console.log(rating)
  // console.log(image)
  // Handle the uploaded image and rating here
  // e.g., Save the data to your database or a file storage

  return Response.json('Success!')
}

export default form
