import api from "@/utils/api"
import {responseAdapter as fruitResponseAdapter} from "@/models/fruit"

export const t = {'content_type':'theme'}

export class Ingredients {
    constructor({
                    id = null,
                    titel= '',
                    eintrge = [],
                } = {}) {
        this.id = id
        this.titel = titel
        this.eintrge = eintrge
    }
}

export function responseAdapter(response) {
    const {fields, sys} = response.sys.type === `Array`
        ? response.items[0]
        : response

    const eintrge = fields.eintrge
        .map(x => fruitResponseAdapter(x, response.includes))

    return new Ingredients({...fields, ...sys, eintrge})
}

export default {
    async get(locale) {
        return responseAdapter(await api.getEntries(
            {
                'content_type':'inhaltsstoffe',
                'locale': locale
            }))
    },
};
