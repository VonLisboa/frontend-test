import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    listElements: {status: true, count: 0},
    expire: 12
})

export const mutations = {

    add: (state, data) => {
        data['index'] = state.listElements.count
        state.listElements[data['index']] = data
        state.listElements.count++
    },

    edit: (state, data)  => state.listElements[data['index']] = data,

    remove: (state, index) => {
        state.listElements[index] = {}
        delete state.listElements[index]
    }
}