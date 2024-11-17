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

export function filterAndSortPinataData(givenLot, givenColor, pinataData) {
  // Initialize an empty array to store the matching objects
  const matchingObjects = [];

  // Loop through each object in the PinataData array
  for (const item of pinataData) {
      const keyvalues = item.metadata.keyvalues || {};

      // Skip the object if imgName is null or undefined
      if (keyvalues.imgName === null || keyvalues.imgName === undefined) {
          continue;
      }

      // Check if lotName and color match the given ones
      if (keyvalues.lotName !== givenLot || keyvalues.color !== givenColor) {
          continue;
      }

      // Check if a file exists and if it's a png, jpg, or jpeg
      const fileName = keyvalues.imgName;
      if (!fileName) {
          continue;
      }

      const extension = fileName.split('.').pop().toLowerCase();
      if (!['png', 'jpg', 'jpeg'].includes(extension)) {
          continue;
      }

      // All conditions met, add the object to the matchingObjects array
      matchingObjects.push({
          ipfs_pin_hash: item.ipfs_pin_hash,
          imgName: fileName,
          rating: keyvalues.rating || null,
          date_pinned: new Date(item.date_pinned)
      });
  }

  // Sort the matching objects by date_pinned (ascending: oldest to newest)
  matchingObjects.sort((a, b) => a.date_pinned - b.date_pinned);

  // Output the sorted objects with required values
  const output = matchingObjects.map(obj => ({
      ipfs_pin_hash: obj.ipfs_pin_hash,
      imgName: obj.imgName,
      rating: obj.rating
  }));

  return output;
}
