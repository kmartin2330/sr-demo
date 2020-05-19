<template>
	<v-container>
		<v-row>
			<v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
				<h3 class="mb-2">You Should</h3>
				<v-textarea :loading="isLoading" auto-grow solo :height="$vuetify.breakpoint.smAndDown ? 70 : 200" v-model="activity.activity"></v-textarea>
			</v-col>
			<v-col cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
				<h3 class="mb-2">Activity Details:</h3>

				<v-select @change="getActivity()" id="type" v-model="activity.type" :items="types" label="Type"></v-select>

				<v-text-field
						@input="getActivity()"
						id="participants"
						type="number"
						v-model="activity.participants"
						label="Participants"
						required
				></v-text-field>

				<v-label for="budget">Budget - {{ budget }}</v-label>
				<v-slider @change="getActivity()" id="budget" step="0.1" min="0" :max="maxPrice" ticks v-model="activity.price">
					<template slot="append">
						<v-text-field type="number" step="0.1" min="0" :max="maxPrice" class="mt-activity-input pt-0" dense style="width: 60px" @change="getActivity()" v-model="activity.price"></v-text-field>
					</template>
				</v-slider>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
				<v-btn :small="$vuetify.breakpoint.smAndDown" @click="saveActivity(activity)" class="green white--text" block>
					<small>Save for later</small>
				</v-btn>
			</v-col>
			<v-col cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
				<v-btn :small="$vuetify.breakpoint.smAndDown" :disabled="isLoading" :loading="isLoading" @click="getActivity(false)" class="blue white--text" block>
					<small>Hit me with a new one!</small>
				</v-btn>
			</v-col>
		</v-row>
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
                isLoading: true,
                maxPrice: 10,
                baseTypes: ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
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
            },
		        types(){
                let tmp = []
                this.baseTypes.forEach(type => {
                   tmp.push({text: type.charAt(0).toUpperCase() + type.slice(1), value: type})
                })
                return tmp
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
                        this.$toast.error(response.data.error, 'Error:');
                        return false;
                    }

                    this.setData(response.data);
                }).finally(() => {
                    this.isLoading = false;
                });
            },
            setData(data) {
                this.activity = data;
            },
            saveActivity() {
                this.$store.dispatch('saveActivity', this.activity).then(result => {
                    if(!result){
												this.$toast.error('This activity already saved!', 'Error:');
                        return false;
                    }
												this.$toast.success('You saved a new activity', 'Success:' );
                })
            }
        },
    }
</script>
<style scoped>
	.mt-activity-input {
		margin-top: -14px !important;
	}
</style>