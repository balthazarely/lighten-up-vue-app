<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label>Nutrition</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <div class="row">
        <div class="col-6 q-pa-sm">
          <q-item-label caption>Daily Calorie Goal:</q-item-label>
          <q-card-section>
            <div class="text-h5 ellipsis text-primary text-weight-bolder">2000</div>
          </q-card-section>
        </div>
        <q-separator />
        <div class="col-4 q-pa-sm">
          <q-item-label caption>Maintenance Calories:</q-item-label>
          <q-card-section>
            <div class="text-h5 ellipsis text-primary text-weight-bolder">2500</div>
          </q-card-section>
        </div>
        <div class="col-4 q-pa-sm">
          <q-item-label caption>Caloric Deficit</q-item-label>
          <q-card-section>
            <div class="text-h5 ellipsis text-primary text-weight-bolder">- 500</div>
          </q-card-section>
        </div>
        <div class="col-4 q-pa-sm">
          <q-item-label caption>Weight Loss Rate:</q-item-label>
          <q-card-section>
            <div class="text-h6 ellipsis text-primary text-weight-bolder">Average</div>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>


<style scoped lang="sass">
.my-card
  width: 600px
</style>

