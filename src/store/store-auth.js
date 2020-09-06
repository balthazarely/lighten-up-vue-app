import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
    loggedIn: false,
    userEmail: ''

}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    },
    setUserEmail(state, value) {
        state.userEmail = value.email
    }
}
const actions = {
    registerUser({ }, payload) {
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
            console.log(response)
        })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },
    loginUser({ }, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
            console.log(response)
            console.log('user logged in')
        })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },
    logoutUser() {
        firebaseAuth.signOut()
        console.log('user logged out')
    },

    handleAuthStateChange({ commit, dispatch }) {
        firebaseAuth.onAuthStateChanged(user => {
            Loading.hide()
            if (user) {
                commit('setLoggedIn', true)
                commit('setUserEmail', user)
                LocalStorage.set('loggedIn', true)
                this.$router.push('/').catch(err => { })
                dispatch('weight/fbReadData', null, { root: true })
                dispatch('weight/firebaseReadGoalsData', null, { root: true })
            }
            else {
                commit('weight/clearTasks', null, { root: true })
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.replace('/auth').catch(err => { })
            }
        })
    }

}

const getters = {
    loginStatus: (state) => {
        return state.userEmail
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}