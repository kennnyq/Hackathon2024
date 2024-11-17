export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  )
}

export function timeAgo(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const differenceInMilliseconds = now.getTime() - date.getTime()
  const differenceInHours = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60)
  )

  if (differenceInHours === 1) {
    return '1 hour ago'
  } else {
    return `${differenceInHours} hours ago`
  }
}

export function remapMarkers(pinataData: any, markerLocations: any) {
  console.log('Pinata Data:', pinataData)
  console.log('Marker Loco:', markerLocations)
  return markerLocations.map((marker: any) => {
    const markerKebabLocation = kebabCase(marker.location)
    let count = 0
    let totalRating = 0
    let validImages: any = []

    pinataData.forEach((file: any) => {
      if (file.date_unpinned) return

      const fileLotName = file.metadata.keyvalues.lotName
      const fileColor = file.metadata.keyvalues.color
      const imageName = file.metadata.keyvalues?.imgName
      const fileRating = parseFloat(file.metadata.keyvalues.rating)

      if (marker.color !== fileColor || markerKebabLocation !== fileLotName)
        return

      count++
      if (!isNaN(fileRating)) {
        totalRating += fileRating
      }

      // Check if image is valid
      if (!imageName) return

      const extension = imageName.split('.').pop().toLowerCase()
      if (!['png', 'jpg', 'jpeg'].includes(extension)) {
        return
      }

      console.log(imageName)

      validImages.push({
        imgName: imageName,
        rating: fileRating,
        hash: file.ipfs_pin_hash,
        date: file.date_pinned,
      })
    })

    const reviews = validImages
      .sort((a: any, b: any) => a.date_pinned - b.date_pinned)
      .map((val: any, i: any) => ({
        imagePath: `https://gateway.pinata.cloud/ipfs/${val.hash}/data/${val.imgName}`,
        rating: val.rating,
        dateTime: val.date,
      }))

    const averageRating = (count > 0 ? totalRating / count : 0).toFixed(1)

    return {
      ...marker,
      count,
      averageRating,
      reviews,
    }
  })
}
