import { GET_TEXTBLOCK} from '../action-types'
import { SET_TEXTBLOCK } from '../mutation-types'
import TextBlockModel, { TextBlock } from '../../models/textblock'

export default {
    namespaced: true,
    actions: {
        async [GET_TEXTBLOCK]({ commit }, query) {
            commit(SET_TEXTBLOCK, await TextBlockModel.get(query))
        },
    },
    mutations: {
        [SET_TEXTBLOCK](state, TextBlock) {
            Object.assign(state, TextBlock)
        },
    },
    state: () => new TextBlock()
}
