<template>
  <v-container>

  <v-row>
    <v-simple-table v-if="myActivities.length">
      <table class="v-data-table v-data-table--dense">
        <thead>
        <th>#</th>
        <th>Activity</th>
        <th>Participants</th>
        <th>Budget</th>
        <th><v-icon>mdi-pencil</v-icon></th>
        </thead>
        <tbody>
        <tr v-for="(activity,key) in myActivities" :key="key">
          <td>{{ key }}</td>
          <td>{{ activity.activity }}</td>
          <td>{{ activity.participants }}</td>
          <td>{{ activity.price }}</td>
          <td><v-btn small icon color="red" title="Törlés" @click="removeActivityByKey(key)"><v-icon>mdi-trash-can-outline</v-icon></v-btn></td>
        </tr>
        </tbody>
      </table>
    </v-simple-table>
    <v-alert v-else class="ma-5" outlined width="100%" color="orange" dense>No saved Activities here.</v-alert>
    <v-btn v-show="myActivities.length > 0" class="mt-2" block color="red white--text" @click="clearMyActivities()">Clear All</v-btn>
  </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'My List',
    data() {
      return {

      }
    },
    computed: {
      myActivities() {
        return this.$store.state.myActivities
      }
    },
    methods: {
      removeActivityByKey(key) {
        this.$store.dispatch('removeActivity', key);
      },
      clearMyActivities(){
        if(confirm('All saved data will be lost! Are you sure ?')){
          this.$store.dispatch('clearSavedActivities')
        }
      }
    },
  }
</script>
