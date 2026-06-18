import { createClient } from 'contentful'

const space = process.env.VUE_APP_CONTENTFUL_SPACE_ID
const accessToken = process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
const environment = process.env.VUE_APP_CONTENTFUL_ENVIRONMENT || 'master'

if (!space || !accessToken) {
  // eslint-disable-next-line no-console
  console.warn('Contentful credentials are missing. Set VUE_APP_CONTENTFUL_SPACE_ID and VUE_APP_CONTENTFUL_ACCESS_TOKEN.')
}

const client = createClient({ space, accessToken, environment })

export async function fetchEntries(query) {
  try {
    return await client.getEntries(query)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Contentful getEntries failed', error)
    throw error
  }
}

export async function fetchEntry(id, options = {}) {
  try {
    return await client.getEntry(id, options)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Contentful getEntry failed for ${id}`, error)
    throw error
  }
}

export default client
