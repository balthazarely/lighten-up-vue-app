<template>
  <div class="q-mb-md">
    <div class="row">
      <div class="col q-pr-xs" v-if="(this.currentWeight) !== null">
        <Card>
          <div slot="title">{{currentWeight}} lbs.</div>
          <div slot="subtitle">Last Weigh In</div>
        </Card>
      </div>
      <div class="col q-pr-xs" v-if="(this.GetGoals.goalWeight) !== ''">
        <Card>
          <div slot="title">{{GetGoals.goalWeight}} lbs.</div>
          <div slot="subtitle">Goal Weight</div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { mapGetters } from "vuex";
export default {
  name: "Goals",
  props: ["currentWeight"],
  data() {
    return {
      // daysUntil: null,
    };
  },
  components: {
    Card: require("components/Cards/InfoCard.vue").default,
  },
  computed: {
    ...mapGetters("weight", ["CurrentWeight", "GetGoals"]),

    // createCountdown() {
    //   this.daysUntil = moment().startOf("day").fromNow();
    // },
  },
  filters: {
    formatDate: function (value) {
      let data = moment(value).format("MMM Do, YYYY");
      return data;
    },
  },
};
</script>