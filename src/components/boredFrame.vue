<template>
  <v-card class="col-xs-12 col-md-8 col-lg-6">
    <v-tabs background-color="transparent">
      <v-tab to="/">
        Activities
      </v-tab>
      <v-tab to="/list">
        My List <v-badge v-show="myActivities > 0" offset-x="-2" offset-y="-3" :content="myActivities"></v-badge>
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-card>
</template>

<script>
  export default {
    computed: {
      myActivities() {
        return this.$store.state.myActivities.length;
      }
    },
  }
</script>