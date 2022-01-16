import { GET_SEASON} from '../action-types'
import { SET_SEASON } from '../mutation-types'
import SeasonModel, { Season } from '../../models/season'

export default {
    namespaced: true,
    actions: {
        async [GET_SEASON]({ commit }, query) {
            commit(SET_SEASON, await SeasonModel.get(query))
        },
    },
    mutations: {
        [SET_SEASON](state, Season) {
            Object.assign(state, Season)
        },
    },
    state: () => new Season(),
}
