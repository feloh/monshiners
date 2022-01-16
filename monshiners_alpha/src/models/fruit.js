import { responseAdapter as imageResponseAdapter } from './image'

export class Fruit {
    constructor({
                    id = null,
                    bild = {}
                } = {}, includes) {
        this.id = id
        const obj = includes.Entry.filter(obj => {return obj.sys.id === this.id})
        this.name = obj[0].fields.name
        this.kurzbeschreibung = obj[0].fields.kurzbeschreibung
        this.bild = bild
    }
}
export function responseAdapter(response, includes) {
    const { fields, sys } = response.sys.type === `Array`
        ? response.items[0]
        : response

    const bild = imageResponseAdapter(fields.bild, includes)

    return new Fruit({ ...fields, ...sys, bild}, includes)
}
