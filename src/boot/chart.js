// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
import Vue from 'vue'

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'


Vue.use(Chartkick.use(Chart))

