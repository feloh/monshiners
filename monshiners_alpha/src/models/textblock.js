import api from '../utils/api'

export class TextBlock {
    constructor({
                    id = null,
                    berschrift = '',
                    identifier = '',
                    inhalt = []
                } = {}, includes) {
        this.id = id

        if(includes){
            const obj = includes.Entry.filter(obj => {return obj.sys.id === this.id})
            this.titel = obj[0].fields.berschrift
            this.identifier = obj[0].fields.identifier
            this.inhalt = obj[0].fields.inhalt.content
        } else {
            this.titel = berschrift
            this.identifier = identifier
            this.inhalt = inhalt.content
        }


    }
}
export function responseAdapter(response, includes) {
    const { fields, sys } = response.sys.type === `Array`
        ? response.items[0]
        : response;


    return new TextBlock({ ...fields, ...sys}, includes)
}
export default {
    async get(query) {
        return responseAdapter(await api.getEntries({
            'locale': query.locale,
            'sys.id': query.id
        }))
    },
}
