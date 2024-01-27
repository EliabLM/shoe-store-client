export const convertNumberToCurrency = (number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(number);

export const convertCurrencyToNumber = (currency) => {
  if (!currency) return 0;

  let number = currency.replaceAll('$', '');
  number = number.replaceAll(' ', '');
  number = number.replaceAll('.', '');
  number = number.replaceAll(',', '');

  return Number(number);
};

export const addPercentage = (number) => {
  return `${number}%`;
};

export const removePercentage = (percentage) => {
  return percentage.replaceAll('%', '');
};
