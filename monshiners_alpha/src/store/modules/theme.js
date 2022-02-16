import { GET_THEME} from '../action-types'
import { SET_THEME} from '../mutation-types'
import { SWITCH_THEME} from '../action-types'
import { CHANGE_THEME} from '../mutation-types'
import ThemeModel, {Theme} from '../../models/theme'
import utils from "@/utils/season"

export default {
    namespaced: true,
    actions: {
        async [GET_THEME]({ commit }, query) {
            commit(SET_THEME, await ThemeModel.get(query));
        },
        [SWITCH_THEME]({ commit }, direction) {
            commit(CHANGE_THEME, direction);
        }
    },
    mutations: {
        [SET_THEME](state, Themes) {
           state.themes.push(...Themes)
            Object.assign(state.currentTheme, Themes.find((el) => el.month === utils.getMonth()))
        },
        [CHANGE_THEME](state, direction){
            const t = state.themes
            let index = t.indexOf(t.find((el) => el.id === state.currentTheme.id))
            state.currentTheme = new Theme()
            Object.assign(state.currentTheme, t[index+direction === -1 ? t.length-1 : index+direction > t.length-1 ? 0 : index+direction])
        }
    },
    state: () => ({
        currentTheme: new Theme(),
        themes: []
    })
};
