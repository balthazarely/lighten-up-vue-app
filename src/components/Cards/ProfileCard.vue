<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item class="q-ma-sm">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{userDetails}}</q-item-label>
          <q-item-label caption>A weight-loss warrior</q-item-label>
        </q-item-section>

        <div class="q-pb-md q-ma-md absolute-right">
          <q-btn color="secondary" size="sm" label="Edit Goals" @click="showProfileModal = true" />
        </div>
      </q-item>

      <q-dialog v-model="showProfileModal">
        <AddProfileModal :goalWeight="GetGoals.goalWeight" :goalDate="GetGoals.goalDate" />
      </q-dialog>

      <q-separator />

      <div>
        <div class="row">
          <div class="col-4 q-pa-sm">
            <q-item-label caption>Start Weight:</q-item-label>
            <q-card-section>
              <div class="text-h5 ellipsis text-secondary text-weight-bolder">
                {{startWeight[1]}}
                <span
                  class="text-h6 ellipsis text-grey-5 text-weight-medium 1-ml-0"
                >lbs.</span>
              </div>
            </q-card-section>
          </div>

          <div class="col-4 q-pa-sm">
            <q-item-label caption>Current Weight:</q-item-label>
            <q-card-section>
              <div class="text-h5 ellipsis text-secondary text-weight-bolder">
                {{currentWeight}}
                <span
                  class="text-h6 ellipsis text-grey-5 text-weight-medium 1-ml-0"
                >lbs.</span>
              </div>
            </q-card-section>
          </div>
          <div class="col-4 q-pa-sm">
            <q-item-label caption>Total Weight Lost:</q-item-label>
            <q-card-section>
              <div class="text-h5 ellipsis text-secondary text-weight-bolder">
                {{weightLost}}
                <span
                  class="text-h6 ellipsis text-grey-5 text-weight-medium 1-ml-0"
                >lbs.</span>
              </div>
            </q-card-section>
          </div>
          <div class="col-4 q-pa-sm">
            <q-item-label caption>Goal Date:</q-item-label>
            <q-card-section>
              <div
                class="text-h6 ellipsis text-primary text-weight-bolder"
              >{{GetGoals.goalDate | formatDate}}</div>
            </q-card-section>
          </div>
          <div class="col-4 q-pa-sm">
            <q-item-label caption>Goal Weight:</q-item-label>
            <q-card-section>
              <div class="text-h6 ellipsis text-primary text-weight-bolder">
                {{GetGoals.goalWeight}}
                <span
                  class="text-h6 ellipsis text-grey-5 text-weight-medium 1-ml-0"
                >lbs.</span>
              </div>
            </q-card-section>
          </div>
          <q-separator />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showProfileModal: false,
    };
  },
  computed: {
    ...mapGetters("weight", ["GetGoals"]),
  },
  components: {
    AddProfileModal: require("components/Modals/AddProfileModal.vue").default,
  },
  props: ["currentWeight", "startWeight", "userDetails", "weightLost", "goals"],
  filters: {
    formatDate: function (value) {
      if (value) {
        let data = moment(value).format("MMM Do YYYY");
        return data;
      }
    },
  },
};
</script>


<style scoped lang="sass">
.my-card
  width: 600px
</style>

