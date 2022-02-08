import {responseAdapter as imageResponseAdapter} from './image'
import {responseAdapter as videoResponseAdapter} from './video'
import api from "@/utils/api"

export class Theme {
    constructor({
                    id = null,
                    name = ``,
                    month = null,
                    text = ``,
                    jumbotron = ``,
                    hintergrund = ``,
                    collage = [],
                    detail = [],
                    videoParallax = ``,
                    videoParallaxStandbild = ``
                } = {}) {
        this.id = id
        this.name = name
        this.month = month
        this.text = text
        this.jumbotron = jumbotron
        this.hintergrund = hintergrund
        this.collage = collage
        this.detail = detail
        this.videoParallaxStandbild = videoParallaxStandbild
        this.videoParallax = videoParallax
    }
}

export function responseAdapter(response) {

    const{items} = response
    let res = []

    items.forEach((item) =>{
        const {fields, sys} = item

        const jumbotron = imageResponseAdapter(fields.jumbotron, response.includes)
        const hintergrund = imageResponseAdapter(fields.hintergrund, response.includes)
        const videoParallaxStandbild = videoResponseAdapter(fields.videoParallaxStandbild, response.includes)
        const videoParallax = videoResponseAdapter(fields.videoParallax, response.includes)

        const collage = fields.collage
            .map(x => imageResponseAdapter(x, response.includes))

        const detail = fields.detail
            .map(x => imageResponseAdapter(x, response.includes))

        let t = new Theme({
            ...fields, ...sys,
            jumbotron,
            hintergrund,
            collage,
            detail,
            videoParallax,
            videoParallaxStandbild
        })
        res.push(t)
    })
    return res
}

export default {
    async get(query) {
        return responseAdapter(
            await api.getEntries({
                'order': 'fields.month',
                'content_type': 'theme',
                'locale': query.locale
            }))
    }
};
