import api from '../utils/api'
import {responseAdapter as textBlockResponseAdapter} from "@/models/textblock"
import {responseAdapter as imageResponseAdapter} from './image'

export const reference = {'sys.id': '3lAVKi6bWbI1xoNAyNxaGq'}

export class Reference {
    constructor({
                    id = null,
        bestandteile = [],
        galerie = []
                } = {}) {
        this.id = id
        this.bestandteile = bestandteile
        this.galerie = galerie
    }
}

export function responseAdapter(response) {
    const {fields, sys} = response.sys.type === `Array`
        ? response.items[0]
        : response

    const bestandteile = fields.bestandteile
        .map(x => textBlockResponseAdapter(x, response.includes))

    let galerie = []
    if (fields.galerie !== undefined) {
        galerie = fields.galerie
            .map(x => imageResponseAdapter(x, response.includes))
    }
    return new Reference({...fields, ...sys, bestandteile, galerie})
}

export default {
    async get(query) {
        return responseAdapter(await api.getEntries({
            'locale': query.locale,
            'sys.id': query.id
        }))
    },
}
