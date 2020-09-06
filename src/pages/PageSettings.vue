<template>
  <q-page class="q-pa-md bg-grey-2">
    <h5 class="subtitle text-weight-light">My Profile</h5>
    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated FadeOutDown"
    >
      <ProfileCard
        :userDetails="loginStatus"
        :currentWeight="CurrentWeight"
        :startWeight="StartWeight"
        :weightLost="WeightLost"
      />
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated FadeOutDown"
    >
      <!-- <Macros /> -->
    </transition>
    <!-- {{GetGoals.goalWeight}} -->
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    ProfileCard: require("components/Cards/ProfileCard.vue").default,
    Macros: require("components/Macros.vue").default,
  },
  computed: {
    ...mapGetters("weight", ["CurrentWeight", "StartWeight", "WeightLost"]),
    // ...mapState("weight", ["goals"]),
    ...mapGetters("auth", ["loginStatus"]),
  },
  methods: {},
  filters: {
    createCountdown(value) {
      let eventdate = moment(value);
      let todaysdate = moment();
      return eventdate.diff(todaysdate, "days");
    },
  },
};
</script>

<style>
</style>

