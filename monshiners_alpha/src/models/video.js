export class Video {
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

    return new Video({ ...fields, ...sys}, includes)
}
