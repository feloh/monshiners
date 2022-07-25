import api from '../utils/api'
import {responseAdapter as imageResponseAdapter} from './image'
import {responseAdapter as fruitResponseAdapter} from './fruit'

export const pl = 'pl'

export class Product {
    constructor({
                    id = null,
                    losnummer = ``,
                    jahrgang = 0,
                    bezeichnung = ``,
                    typ = ``,
                    beschreibung = ``,
                    produktbild = ``,
                    inhaltsstoffe = [],
                    ausverkauft = null,
                    link = ``,
                    hauptprodukt = null
                } = {}) {
        this.id = id
        this.losnummer = losnummer
        this.jahrgang = jahrgang
        this.bezeichnung = bezeichnung
        this.typ = typ
        this.beschreibung = beschreibung
        this.produktbild = produktbild
        this.inhaltsstoffe = inhaltsstoffe
        this.ausverkauft = ausverkauft
        this.link = link
        this.hauptprodukt = hauptprodukt
    }
}

export function responseAdapter(response) {
    /*const {fields, sys} = response.sys.type === `Array`
            ? response.items[0]
            : response*/

    const {items} = response
    let res = []

    items.forEach((item) => {
        const {fields, sys} = item
        const produktbild = imageResponseAdapter(fields.produktbild, response.includes)
        const inhaltsstoffe = fields.inhaltsstoffe
            .map(x => fruitResponseAdapter(x, response.includes))

        let p = new Product({...fields, ...sys, produktbild, inhaltsstoffe})
        res.push(p)
    })
    return res
}

export default {
    async getAll(query) {
        return responseAdapter(await api.getEntries(
            {
                'content_type': 'product',
                'locale': query.locale
            }))
    },
    async getAllImg(locale) {
        return responseAdapter(await api.getEntries(
            {
                'content_type': 'product',
                'locale': locale
            }))
    },
}
