<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Make Entry</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="weightEntry.weight"
          type="number"
          style="max-width: 200px"
          label="Enter Weight"
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="weightEntry.date" mask="date" :rules="['date']" label="Enter Date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="weightEntry.date">
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
        <q-btn @click="submitEntry" label="Enter" color="primary" v-close-popup />
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
      weightEntry: {
        weight: "",
        date: "",
        timestamp: moment(this.date).valueOf(),
      },
    };
  },
  methods: {
    ...mapActions("weight", ["addTask"]),

    submitEntry() {
      this.addTask(this.weightEntry);
      //   console.log(this.weightEntry.weight, "< weight");
      //   console.log(this.weightEntry.weightDate, "< Date");
      //   console.log(this.weightEntry);
    },
  },
};
</script>

