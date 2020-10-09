import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    listElements: {status: true, count: 1, "0":{"index":0,"color":2,"title":"Headquarters","address":"3763 W. Dallas St.","name":"Hellena John","job":"Software Tester","email":"email@example.com","phone":"8085550111"}},
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