import { GET_PRODUCT } from '../action-types'
import { SET_PRODUCT } from '../mutation-types'
import ProductModel, { Product } from '../../models/product'

export default {
    namespaced: true,
    actions: {
        async [GET_PRODUCT]({ commit }, locale){
            commit(SET_PRODUCT, await ProductModel.get(locale))
        },
    },
    mutations: {
        [SET_PRODUCT](state, Product) {
            Object.assign(state, Product)
        },
    },
    state: () => new Product(),
}
