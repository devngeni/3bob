import Vue from "vue";
import moment from 'moment';
import VueCurrencyFilter from "vue-currency-filter";

Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  // symbolPosition: "front",
  symbolSpacing: true
});

Vue.filter('formatDate', value => {
  if (!value) return '';
  return moment(value).format('lll');
});
