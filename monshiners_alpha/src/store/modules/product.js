import {GETALL_PRODUCT} from '../action-types'
import {SETALL_PRODUCT} from '../mutation-types'
import ProductModel, {Product} from '../../models/product'

export default {
    namespaced: true,
    actions: {
        async [GETALL_PRODUCT]({commit}, locale) {
            commit(SETALL_PRODUCT, await ProductModel.getAll(locale))
        },
    },
    mutations: {
        [SETALL_PRODUCT](state, Products) {
            state.productImg.push(...Products)
        },
    },
    state: () => ({
        currentProduct: new Product(),
        productImg: []
    }),
}
