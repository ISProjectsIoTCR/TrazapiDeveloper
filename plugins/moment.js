import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

Vue.prototype.$moment = moment;
