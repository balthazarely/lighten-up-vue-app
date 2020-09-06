import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDB, firebaseAuth } from 'boot/firebase'


const state = {
    entries: {

    },
    goals: {

    },
    dataDownloaded: false
}

const mutations = {
    updateTask(state, payload) {
        Object.assign(state.entries[payload.id], payload.updates)
    },
    deleteTask(state, id) {
        Vue.delete(state.entries, id)
    },
    addTask(state, payload) {
        Vue.set(state.entries, payload.id, payload.task)
    },
    clearTasks(state) {
        state.entries = {}
        state.goals = {}
    },
    addGoal(state, payload) {
        state.goals = Object.assign({}, payload.task)
    },
    setDataDownloaded(state, value) {
        state.dataDownloaded = value
    }
}

const actions = {
    updateTask({ dispatch }, payload) {
        dispatch('fbUpdateTask', payload)
    },
    deleteTask({ dispatch }, id) {
        dispatch('fbDeleteTask', id)
    },
    addTask({ dispatch }, task) {
        let taskId = uid()
        let payload = {
            id: taskId,
            task: task
        }
        dispatch('fbAddTask', payload)
    },
    addGoal({ dispatch }, task) {
        let taskId = uid()

        let payload = {
            id: taskId,
            task: task
        }
        console.log(payload, "this is the PAYLOAD inside the ACTION")
        dispatch('fbAddGoal', payload)
    },


    // FIREBASE STUFF
    fbReadData({ commit }) {
        let userID = firebaseAuth.currentUser.uid
        let userTasks = firebaseDB.ref('entries/' + userID)

        // initlal check for data
        userTasks.once('value', snapshot => {
            commit('setDataDownloaded', true)
        })

        // CHILD ADDED
        userTasks.on("child_added", snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                task: task
            }
            commit('addTask', payload)
        })
        // Child changed
        userTasks.on("child_changed", snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                updates: task
            }
            commit('updateTask', payload)
        })
        // Child removed
        userTasks.on("child_removed", snapshot => {
            let taskId = snapshot.key
            commit('deleteTask', taskId)
        })
    },
    fbAddTask({ }, payload) {
        let userID = firebaseAuth.currentUser.uid
        let taskRef = firebaseDB.ref('entries/' + userID + '/' + payload.id)
        taskRef.set(payload.task)
    },
    fbUpdateTask({ }, payload) {
        let userID = firebaseAuth.currentUser.uid
        let taskRef = firebaseDB.ref('entries/' + userID + '/' + payload.id)
        taskRef.update(payload.updates)
    },
    fbDeleteTask({ }, taskId) {
        let userID = firebaseAuth.currentUser.uid
        let taskRef = firebaseDB.ref('entries/' + userID + '/' + taskId)
        taskRef.remove()
    },

    firebaseReadGoalsData({ commit }) {
        let userID = firebaseAuth.currentUser.uid
        let userTasks = firebaseDB.ref('goals/' + userID)
        // CHILD ADDED
        userTasks.on("child_added", snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                task: task
            }
            commit('addGoal', payload)
        })
    },

    fbAddGoal({ }, payload) {
        let userID = firebaseAuth.currentUser.uid
        let taskRef = firebaseDB.ref('goals/' + userID)
        taskRef.remove()
        let taskRef2 = firebaseDB.ref('goals/' + userID + '/' + payload.id)
        taskRef2.set(payload.task)
    },


}

const getters = {
    entries: (state) => {
        let sorted = {};
        Object
            .keys(state.entries).sort(function (a, b) {
                return new Date(state.entries[b].date) - new Date(state.entries[a].date);
            })
            .forEach(function (key) {
                sorted[key] = state.entries[key];
            });
        return sorted
    },
    sortedEntriesChart: (state) => {
        const data = Object.values(state.entries).map((x) => {
            return [x.date, x.weight]
        })
        return data
    },

    CurrentWeight: (state) => {
        if (Object.keys(state.entries).length === 0) {
            return null;
        } else {
            let sorted = {}
            Object.keys(state.entries).sort(function (a, b) {
                return new Date(state.entries[b].date) - new Date(state.entries[a].date);
            }).forEach(function (key) {
                sorted[key] = state.entries[key];
            });
            return Object.values(sorted)[0].weight
        }
    },
    StartWeight: (state) => {
        if (Object.keys(state.entries).length === 0) {
            return []
        } else {
            let sorted = {}
            Object.keys(state.entries).sort(function (a, b) {
                return new Date(state.entries[a].date) - new Date(state.entries[b].date);
            }).forEach(function (key) {
                sorted[key] = state.entries[key];
            });
            return [Object.values(sorted)[0].date, Object.values(sorted)[0].weight,]
        }

    },
    WeightLost: (state, getters) => {
        if (Object.keys(state.entries).length === 0) {
            return []
        } else {
            let array = Object.values(getters.entries).map(x => {
                return x.weight
            })
            let first = array.shift()
            let last = array.pop()
            return last - first
        }
    },
    GetGoals: (state) => {
        return state.goals
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}