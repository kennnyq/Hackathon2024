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

export function getLotImages() {
  // Get lot
  // Get color from pinata data
  // Array of valid files
  // Image exists
  // imgName !== "null"
  // Get hash keys
  // .jpeg .jpg .png
  // sorted by time
  // [image hash 1, image hash 2, image hash 3]
  // input Pinata Data
  // Outputs {hash: hashes, rating: rating} sorted by date
}
