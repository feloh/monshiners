import api from '../utils/api'
import { responseAdapter as imageResponseAdapter } from './image'

export const pl = 'pl'

export class Product {
    constructor({
                    id = null,
                    typ = ``,
                    hauptprodukt = null,
                    losnummer = ``,
                    jahrgang = 0,
                    beschreibung = ``,
                    produktbild = ``,
                    produktszenen = [],
                } = {}) {
        this.id = id
        this.typ = typ
        this.hauptprodukt = hauptprodukt
        this.losnummer = losnummer
        this.jahrgang = jahrgang
        this.beschreibung = beschreibung
        this.produktbild = produktbild
        this.produktszenen = produktszenen
    }
}

export function responseAdapter(response) {
    const {fields, sys} = response.sys.type === `Array`
        ? response.items[0]
        : response

    const produktbild = imageResponseAdapter(fields.produktbild, response.includes)

    const produktszenen = fields.produktszenen
        .map(x => imageResponseAdapter(x, response.includes))

    return new Product({...fields, ...sys, produktbild, produktszenen})
}

export default {
    async get(locale) {
        return responseAdapter(await api.getEntries(
            { 'content_type':'product',
                    'fields.hauptprodukt': true,
                    'locale': locale
            }))
    },
}
