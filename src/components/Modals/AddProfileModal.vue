<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">My Goals</div>
      </q-card-section>
      <!-- v-model="goalWeightEntry.goalWeight"
      :value="goalWeightEntry.goalWeight"-->

      <q-card-section class="q-pt-none">
        <q-input
          type="number"
          style="max-width: 200px"
          label="Enter Goal Weight"
          v-model="goalWeightEntry.goalWeight"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <!-- v-model="goalWeightEntry.goalDate"
        :value="goalWeightEntry.goalWeight"-->
        <q-input
          mask="date"
          :rules="['date']"
          label="Enter Goal Date"
          v-model="goalWeightEntry.goalDate"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="goalWeightEntry.goalDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="submitGoalEntry" label="Enter" color="primary" v-close-popup />
        <!-- <q-btn @click="resetGoals" label="Reset" color="secondary" v-close-popup /> -->
      </q-card-actions>
    </q-card>
  </div>
</template>


<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      goalWeightEntry: {
        goalWeight: this.goalWeight,
        goalDate: this.goalDate,
        //        goalWeight: this.goals.myGoals.goalWeight,
        // goalDate: this.goals.myGoals.goalDate,
      },
    };
  },
  props: ["goalWeight", "goalDate"],
  methods: {
    ...mapActions("weight", ["addGoal"]),

    submitGoalEntry() {
      this.addGoal(this.goalWeightEntry);
      // goalWeight: this.goalWeightEntry.goalWeight,
      //       goalDate: this.goalWeightEntry.goalDate,
      console.log(this.goalWeightEntry.goalWeight, "< weight");
      console.log(this.goalWeightEntry.goalDate, "< Date");
      // console.log(this.goalWeightEntry);
    },
  },
};
</script>

