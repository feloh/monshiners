import api from '../utils/api'
import {responseAdapter as seasonEventResponseAdapter} from '@/models/seasonevent'

export class Season {
    constructor({
                    id = null,
                    jahreszeit = ``,
                    saisonphasen = []
                } = {}) {
        this.id = id
        this.jahreszeit = jahreszeit
        this.saisonphasen = saisonphasen
    }
}

export  async function responseAdapter(response, locale) {
    const {fields, sys} = response.sys.type === `Array`
        ? response.items[0]
        : response

      const saisonphasen = await seasonEventResponseAdapter(fields.saisonphasen, response.includes, locale)

    return new Season({...fields, ...sys, saisonphasen})
}

export default {
    async get(query) {
        return responseAdapter(
            await api.getEntries({
                    'content_type': 'jahreszeit',
                    'fields.identifier' : query.season,
                    'locale': query.locale
            }))
    },
}
