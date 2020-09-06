<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row">
      <div class="col-8 q-pa-sm">
        <h5 class="subtitle text-weight-light">Welcome back to your log.</h5>
      </div>

      <div class="col q-pa-sm">
        <q-btn
          class="float-right"
          round
          color="secondary"
          icon="help"
          size="small"
          @click="showAboutModal = true"
        />
      </div>
    </div>
    <q-dialog v-model="showAboutModal">
      <AboutModal />
    </q-dialog>

    <template v-if="dataDownloaded">
      <div class="q-pb-md q-gutter-sm">
        <q-btn color="secondary" label="Make Entry" @click="showAddTask = true" />
      </div>
      <q-dialog v-model="showAddTask">
        <AddWeightModal />
      </q-dialog>
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated FadeOutDown"
      >
        <Goals :currentWeight="CurrentWeight" />
      </transition>
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated FadeOutDown"
      >
        <Chart :sortedEntriesChart="sortedEntriesChart" />
      </transition>
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated FadeOutDown"
      >
        <q-card class="my-card shadow-1 q-mt-lg" flat bordered>
          <q-list bordered separator>
            <q-item-label header>Weight Log</q-item-label>
            <q-scroll-area class="scroll-container">
              <WeightEntry
                clickable
                v-for="(entry, key) in entries"
                :entry="entry"
                :id="key"
                :key="key"
              />
            </q-scroll-area>
          </q-list>
        </q-card>
      </transition>
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em" />
      </span>
    </template>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  name: "PageIndex",
  data() {
    return {
      showAddTask: false,
      showChart: true,
      showAboutModal: false,
    };
  },
  components: {
    Goals: require("components/Goals.vue").default,
    WeightEntry: require("components/WeightEntry/WeightEntry.vue").default,
    AddWeightModal: require("components/Modals/AddWeightModal.vue").default,
    AboutModal: require("components/Modals/AboutModal.vue").default,
    Chart: require("components/Chart.vue").default,
  },
  computed: {
    ...mapState("weight", ["dataDownloaded"]),
    ...mapGetters("weight", ["entries", "sortedEntriesChart", "CurrentWeight"]),
  },
  filters: {
    createCountdown(value) {
      let eventdate = moment(value);
      let todaysdate = moment();
      return eventdate.diff(todaysdate, "days");
    },
  },
};
</script>

<style scoped lang="sass">
.scroll-container
  height: 300px
</style>
