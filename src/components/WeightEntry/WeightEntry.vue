<template>
  <div>
    <q-item>
      <q-item-section avatar>
        <q-icon color="primary" name="today" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{entry.weight}} lbs</q-item-label>
        <q-item-label caption lines="2">{{entry.date}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <!-- <q-icon name="style" /> -->
        <div class="row">
          <q-btn
            @click="promptToDelete(id)"
            round
            dense
            color="orange-6"
            text-color="white"
            icon="delete"
            size="12px"
            class="q-ma-xs"
          />
          <q-btn
            @click="showEditTask = true"
            round
            dense
            color="secondary"
            text-color="white"
            icon="edit"
            size="12px"
            class="q-ma-xs"
          />
        </div>
      </q-item-section>
    </q-item>

    <q-dialog v-model="showEditTask">
      <EditWeightModal :id="id" :date="entry.date" :weight="entry.weight" />
    </q-dialog>

    <q-separator />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["entry", "id"],
  data() {
    return {
      showEditTask: false,
    };
  },

  methods: {
    ...mapActions("weight", ["deleteTask"]),
    promptToDelete(id) {
      console.log("DELETE ME");
      this.deleteTask(id);
    },
  },
  components: {
    EditWeightModal: require("components/Modals/EditWeightModal.vue").default,
  },
};
</script>

<style>
</style>
