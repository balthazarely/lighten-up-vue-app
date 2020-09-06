<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access the app.
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        outlined
        v-model="formData.email"
        label="email"
        stack-label
        :rules="[ val => isValidEmailAddress(val) || 'Please enter valid email address']"
        lazy-rules
        ref="email"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        outlined
        v-model="formData.password"
        label="password"
        type="password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
        lazy-rules
        stack-label
        ref="password"
      />
    </div>
    <div class="row q-mb-md">
      <q-space />
      <q-btn color="secondary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),

    submitForm() {
      this.$refs.email.validate(), this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },

    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  filters: {
    titleCase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  },
};
</script>