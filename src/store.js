import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        myActivities: localStorage.hasOwnProperty('my_activities') ? JSON.parse(localStorage.getItem('my_activities')) : [],
    },
    mutations: {},
    actions: {
        removeActivity(context, key) {
            context.state.myActivities.splice(key, 1);

            context.dispatch('saveActivities')
        },
        saveActivity(context, activity) {
            let isAlreadySaved = false

            for (let a of context.state.myActivities) {
                if (a.key == activity.key) {
                    isAlreadySaved = true
                }
            }

            if (!isAlreadySaved) {

                context.state.myActivities.push(activity);
                context.dispatch('saveActivities')

                return true
            }
            return false
        },
        clearSavedActivities(context) {
            context.state.myActivities = []
            context.dispatch('saveActivities')
        },
        saveActivities(context) {
            localStorage.setItem('my_activities', JSON.stringify(context.state.myActivities))
        }
    }
})
