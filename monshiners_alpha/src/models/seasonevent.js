import Theme from './theme'

export class SeasonEvent {
    constructor({
                    id = null,
        derzeitigePhase = false,
                    assets = {}
                } = {}, includes) {
        this.id = id
        this.derzeitigePhase = derzeitigePhase
        const obj = includes.Entry.filter(obj => {return obj.sys.id === this.id})
        this.bezeichnung = obj[0].fields.bezeichnung
        this.beschreibung = obj[0].fields.beschreibung
        this.assets = assets
    }
}
export async  function responseAdapter(response, includes) {
    const { fields, sys } = response.sys.type === `Array`
        ? response.items.filter(obj => {return obj.fields.derzeitigePhase === true})
        : response

      const assets =  await Theme.get(includes.Entry[0].fields.assets[0].sys.id)


    return new SeasonEvent({ ...fields, ...sys, assets}, includes)
}
