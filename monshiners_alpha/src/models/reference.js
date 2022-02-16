import api from '../utils/api'
import {responseAdapter as textBlockResponseAdapter} from "@/models/textblock"

export const reference = {'sys.id': '3lAVKi6bWbI1xoNAyNxaGq'}

export class Reference {
    constructor({
                    id = null,
        bestandteile = []
                } = {}) {
        this.id = id
        this.bestandteile = bestandteile
    }
}

export function responseAdapter(response) {
    console.log(response)
    const {fields, sys} = response.sys.type === `Array`
        ? response.items[0]
        : response
    const bestandteile = fields.bestandteile
        .map(x => textBlockResponseAdapter(x, response.includes))

    return new Reference({...fields, ...sys, bestandteile})
}

export default {
    async get(query) {
        return responseAdapter(await api.getEntries({
            'locale': query.locale,
            'sys.id': query.id
        }))
    },
}
