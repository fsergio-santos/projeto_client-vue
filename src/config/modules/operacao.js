

export default{
    state: {
        mode:''
      },
    getters:{
      getMode(state){
        return state.mode
      }
    },
    mutations: {
        setMode(state, payload){
          state.mode = payload
            /* eslint-disable no-console */
        },
    },
    actions: {
        initMode({commit}, mode){
          commit('setMode', mode)
        },
    },
}