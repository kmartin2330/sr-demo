<template>
	<v-container>
		<v-row>
			<v-col :cols="$vuetify.breakpoint.mdAndDown ? 12 : 6">
				<h3 class="mb-2">You Should</h3>
				<v-textarea :loading="isLoading" autofocus dense solo v-model="activity.activity"></v-textarea>

				<v-btn :small="$vuetify.breakpoint.mdAndDown" @click="saveActivity(activity)" class="red white--text" block>
					<small>Save for later</small></v-btn>
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

				<v-label for="budget">Budget - {{ budget }}</v-label>
				<v-slider @change="getActivity()" id="budget" step="0.1" min="0" :max="maxPrice" ticks v-model="activity.price">
					<template slot="append">
						<v-text-field type="number" step="0.1" min="0" :max="maxPrice" class="mt-0 pt-0" single-line dense style="width: 60px" v-model="activity.price"></v-text-field>
					</template>
				</v-slider>

				<v-btn :small="$vuetify.breakpoint.mdAndDown" :disabled="isLoading" :loading="isLoading" @click="getActivity(false)" class="blue white--text" block>
					<small>Hit me with a new one!</small></v-btn>
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
                error: false,
                errorMsg: '',
                isLoading: true,
                maxPrice: 10,
                types: ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
            }
        },
        computed: {
            budget() {
                if (this.activity.price == 0) {
                    return 'Free'
                }
                if (this.activity.price <= (this.maxPrice * 0.50)) {
                    return 'Cheap'
                }
                if (this.activity.price >= (this.maxPrice * 0.51)) {
                    return 'Expensive'
                }
            },
            myActivities() {
                return this.$store.state.myActivities
            }
        },
        mounted() {
            this.getActivity()
        },
        methods: {
            getActivity(withParams = true) {
                this.isLoading = true;
                let queryParams = '';
                let tmp = {
                    type: this.activity.type,
                    participants: this.activity.participants,
                    price: this.activity.price,
                }

                if (withParams) {
                    queryParams = `?` + new URLSearchParams(tmp).toString()
                }

                axios.get(`http://www.boredapi.com/api/activity` + queryParams).then(response => {
                    if (response.data && response.data.hasOwnProperty('error')) {
                        this.error = true;
                        this.errorMsg = response.data.error;
                        return false;
                    }

                    this.setData(response.data);
                    this.error = false;
                }).finally(() => {
                    this.isLoading = false;
                });
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
