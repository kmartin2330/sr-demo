<template>
<v-container>
		<v-row>
			<v-col cols="12">
				<v-simple-table class="mb-5" v-if="myActivities.length">
					<template v-slot:default>
						<thead>
						<tr>
							<th>#</th>
							<th>Activity</th>
							<th>Participants</th>
							<th>Budget</th>
							<th>
								<v-icon>mdi-pencil</v-icon>
							</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(activity,key) in myActivities" :key="key">
							<td>{{ key }}</td>
							<td>{{ activity.activity }}</td>
							<td>{{ activity.participants }}</td>
							<td>{{ activity.price }}</td>
							<td>
								<v-btn small icon color="red" title="Törlés" @click="removeActivityByKey(key)">
									<v-icon>mdi-trash-can-outline</v-icon>
								</v-btn>
							</td>
						</tr>
						</tbody>
					</template>
				</v-simple-table>

				<v-container v-else>
					<v-row>
						<v-alert class="ma-5" outlined width="100%" color="orange" dense>No saved Activities here.</v-alert>
					</v-row>
				</v-container>

				<v-btn v-show="myActivities.length > 0" block color="red white--text" @click="clearMyActivities()">Clear All</v-btn>
			</v-col>
		</v-row>
</v-container>

</template>

<script>
    export default {
        name: 'MyList',
        data() {
            return {}
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
            clearMyActivities() {
                if (confirm('All saved data will be lost! Are you sure ?')) {
                    this.$store.dispatch('clearSavedActivities')
                }
            }
        },
    }
</script>
