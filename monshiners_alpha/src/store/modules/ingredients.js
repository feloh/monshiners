import { GET_INGREDIENTS } from '../action-types'
import { SET_INGREDIENTS } from '../mutation-types'
import IngredientsModel, { Ingredients } from '../../models/ingredients'

export default {
    namespaced: true,
    actions: {
        async [GET_INGREDIENTS]({ commit }, locales) {
            commit(SET_INGREDIENTS, await IngredientsModel.get(locales))
        },
    },
    mutations: {
        [SET_INGREDIENTS](state, Ingredients) {
            Object.assign(state, Ingredients)
        },
    },
    state: () => new Ingredients(),
}
