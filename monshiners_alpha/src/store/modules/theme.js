import { GET_THEME} from '../action-types'
import { SET_THEME} from '../mutation-types'
import ThemeModel, { Theme } from '../../models/theme'

export default {
    namespaced: true,
    actions: {
        async [GET_THEME]({ commit }, query) {
            commit(SET_THEME, await ThemeModel.get(query));
        }
    },
    mutations: {
        [SET_THEME](state, Theme) {
            Object.assign(state, Theme);
        }
    },
    state: () => new Theme()
};
