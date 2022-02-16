import { GET_REFERENCE} from '../action-types'
import { SET_REFERENCE } from '../mutation-types'
import ReferenceModel, { Reference } from '../../models/reference'

export default {
    namespaced: true,
    actions: {
        async [GET_REFERENCE]({ commit }, query) {
            commit(SET_REFERENCE, await ReferenceModel.get(query))
        },
    },
    mutations: {
        [SET_REFERENCE](state, Reference) {
            Object.assign(state, Reference)
        },
    },
    state: () => new Reference()
}
