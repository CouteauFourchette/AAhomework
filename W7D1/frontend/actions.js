const selectCurrency = function selectCurrency(baseCurrency, rates) {
  return {
    type: 'SWITCH_CURRENCY',
    baseCurrency: baseCurrency,
    rates: rates,
  }
};

export { selectCurrency };