<template>
  <q-card bg-variant="light" class="shadow-1 q-pb-3">
    <q-item-label header>All Weight Loss</q-item-label>
    <div
      id="chart-1"
      style="height: 300px; background: white;"
      v-if="sortedEntriesChart.length != 0"
      class="1-pb-sm"
    >
      <line-chart
        :data="sortedEntriesChart"
        ytitle="pounds"
        :colors="['#f5881e', '#666']"
        class="q-pa-md"
        label="Weight"
      />
    </div>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["sortedEntriesChart"],
  data() {
    return {};
  },
  //   computed: {
  //     ...mapGetters(["sortedEntriesChart"]),
  //   },
};
</script>