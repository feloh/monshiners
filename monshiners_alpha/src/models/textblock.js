export class Textblock {
    constructor({
                    id = null
                } = {}, includes) {
        this.id = id
        const obj = includes.Entry.filter(obj => {return obj.sys.id === this.id})
        this.titel = obj[0].fields.berschrift
        this.identifier = obj[0].fields.identifier
        this.inhalt = obj[0].fields.inhalt.content
    }
}
export function responseAdapter(response, includes) {
    const { fields, sys } = response.sys.type === `Array`
        ? response.items[0]
        : response;


    return new Textblock({ ...fields, ...sys}, includes)
}
