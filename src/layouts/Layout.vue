<template>
  <q-layout view="hHh lpR lff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <img src="../assets/lightenUP.svg" class="logo q-mt-md" />
        </q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          icon-right="account_circle"
          flat
          to="/auth"
          label="login"
          class="absolute-right"
        />
        <q-btn
          v-else
          @click="logoutUser"
          icon-right="account_circle"
          flat
          label="logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered content-class="bg-grey-3">
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item v-for="(nav, i) in navItems" :key="i" :to="nav.to" exact clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
    };
  },
};
</script>

<script>
import { mapState, mapActions } from "vuex";
import { openURL } from "quasar";
export default {
  data() {
    return {
      left: false,
      leftDrawerOpen: this.$q.platform.is.desktop,
      navItems: [
        {
          label: "Weight Log",
          icon: "list",
          to: "/",
        },
        {
          label: "Profile",
          icon: "account_box",
          to: "/settings",
        },
        {
          label: "Login/Register",
          icon: "login",
          to: "/auth",
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
  },
};
</script>

<style scoped lang="sass">
.logo
  width: 120px
</style>

   
