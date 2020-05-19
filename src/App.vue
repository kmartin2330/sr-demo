<template>
  <v-app id="inspire">
    <v-app-bar app :class="classes">
      <v-toolbar-title>Bored Api</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-switch hide-details @change="changeDarkMode()" :value="$vuetify.theme.dark" label="Dark Mode"></v-switch>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <bored-frame></bored-frame>
        </v-row>
      </v-container>
    </v-content>
    <v-footer :class="classes" app>
      <span>&copy; Kummer Martin E.V. 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import boredFrame from './components/boredFrame'

  export default {
    props: {
      source: String,
    },
    mounted() {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem('dark_mode')) || false
    },
    components: { 'bored-frame': boredFrame },
    data: () => ({
      drawer: null,
      classes: ['gray', 'lighten-2', 'dark-gray--text']
    }),
    methods: {
      changeDarkMode() {
        let newMode = !this.$vuetify.theme.dark;
        this.$vuetify.theme.dark = newMode
        localStorage.setItem('dark_mode', JSON.stringify(newMode))
      }
    },
  }
</script>