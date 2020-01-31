

export default{
    state: {
        mode:'',
        photo:''
    },
    getters:{
      getMode(state){
        return state.mode
      },
      getPhoto(state){
        return state.photo
      }
    },
    mutations: {
        setMode(state, payload){
          state.mode = payload
        },
        setPhoto(state, payload){
          state.photo = payload
        }
    },
    actions: {
        initMode({commit}, mode){
          commit('setMode', mode)
        },
        initPhoto({commit}, photo){
           commit('setPhoto', photo)
        }
    },
}