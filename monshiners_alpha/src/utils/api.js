import { createClient } from 'contentful'

const space = process.env.VUE_APP_CONTENTFUL_SPACE_ID
const accessToken = process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
const environment = process.env.VUE_APP_CONTENTFUL_ENVIRONMENT || 'master'

if (!space || !accessToken) {
  // eslint-disable-next-line no-console
  console.warn('Contentful configuration is incomplete. Set VUE_APP_CONTENTFUL_SPACE_ID and VUE_APP_CONTENTFUL_ACCESS_TOKEN.')
}

const client = createClient({ space: space || 'missing-space-id', accessToken: accessToken || 'missing-access-token', environment })

export async function getEntries(query = {}) {
  try { return await client.getEntries(query) }
  catch (error) { console.error('Contentful getEntries failed', { query, error }); throw error }
}

export async function getEntry(id, query = {}) {
  try { return await client.getEntry(id, query) }
  catch (error) { console.error('Contentful getEntry failed', { id, query, error }); throw error }
}

export default { ...client, getEntries, getEntry }
