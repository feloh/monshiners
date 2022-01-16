export class Image {
    constructor({
                    id = null
                } = {}, includes) {
        this.id = id
        const obj = includes.Asset.filter(obj => {return obj.sys.id === this.id})
        this.url = obj[0].fields.file.url
    }
}
export function responseAdapter(response, includes) {
    const { fields, sys } = response.sys.type === `Array`
        ? response.items[0]
        : response;

    return new Image({ ...fields, ...sys}, includes)
}
