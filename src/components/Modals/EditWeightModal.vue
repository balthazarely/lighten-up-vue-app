<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Entry</div>
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
        <q-btn @click="submitTask" label="Enter" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </div>
</template>


<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: ["weight", "date", "id"],
  data() {
    return {
      weightEntry: {
        weight: this.weight,
        date: this.date,
      },
    };
  },
  methods: {
    ...mapActions("weight", ["updateTask"]),
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.weightEntry,
      });
      //   this.$emit("close");
    },
  },
};
</script>

