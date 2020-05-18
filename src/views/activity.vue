<template>
	<v-container>
		<v-row>
			<v-col :cols="$vuetify.breakpoint.mdAndDown ? 12 : 6">
				<h3 class="mb-2">You Should</h3>
				<v-textarea :loading="isLoading" autofocus dense solo v-model="activity.activity"></v-textarea>

				<v-btn :small="$vuetify.breakpoint.mdAndDown" @click="saveActivity(activity)" class="red white--text" block><small>Save for later</small></v-btn>
			</v-col>
			<v-col cols="$vuetify.breakpoint.mdAndDown ? 12 : 6">
				<h3 class="mb-2">Activity Details:</h3>

				<v-select @change="getActivity()" id="type" dense v-model="activity.type" :items="types" label="Type"></v-select>

				<v-text-field
						@input="getActivity()"
						id="participants"
						type="number"
						v-model="activity.participants"
						label="Participants"
						required
						dense
				></v-text-field>

				<v-label for="budget">Budget</v-label>
				<v-slider @change="getActivity()" id="budget" step="0.1" min="0" :max="maxPrice" ticks v-model="activity.price">
					<template slot="prepend">
						{{ activity.price }}
					</template>
					<template slot="append">
						{{ budget }}
					</template>
				</v-slider>
				<v-btn :small="$vuetify.breakpoint.mdAndDown" :disabled="isLoading" :loading="isLoading" @click="getActivity(true)" class="blue white--text" block><small>Hit me with a new one!</small></v-btn>
			</v-col>
		</v-row>
		<v-snackbar v-model="error" top color="red">
			{{ errorMsg }}
			<v-btn color="black" text @click="error = false">
				Close
			</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
    export default {
        name: 'Activity',
        data: function () {
            return {
                activity: {
                    activity: '',
                    type: 'education',
                    accessibility: '',
                    key: '',
                    link: '',
                    participants: 1,
                    price: 0,
                },
                dataChangedRecently: false,
                error: false,
                errorMsg: '',
		            isLoading: false,
		            maxPrice: 100,
                types: ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
            }
        },
        computed: {
            budget() {
								if(this.activity.price == 0) return 'Free'
								if(this.activity.price <= (this.maxPrice * 0.50)) return 'Cheap'
								if(this.activity.price >= (this.maxPrice * 0.51)) return 'Expensive'

            },
            myActivities() {
                return this.$store.state.myActivities
            }
        },
        mounted() {

            this.getActivity()

        },
        methods: {
            getActivity(withoutParams) {
                let x = this;
                let queryParams = '';
                let tmp = {
                    type: this.activity.type,
                    participants: this.activity.participants,
                    price: this.activity.price,
                }
								if(!withoutParams){
                  queryParams = `?` + new URLSearchParams(tmp).toString()
								}
		            this.isLoading = true;
                axios.get(`http://www.boredapi.com/api/activity` + queryParams).then(function (response) {
                    if (response.data) {
                        if (!response.data.hasOwnProperty('error')) {
                            x.setData(response.data);
                            x.error = false
                        } else {
                            x.error = true
                            x.errorMsg = response.data.error
                        }
                    }
		                x.isLoading = false;
                })
            },
            setData(data) {
                this.activity = data;
            },
		        saveActivity() {
                this.$store.dispatch('saveActivity', this.activity)
            }
        },
    }
</script>
