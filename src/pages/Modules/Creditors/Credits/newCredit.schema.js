import * as yup from 'yup';

export const ENUM_NAMES = {
  creditor: 'creditor',
  initial_value: 'initial_value',
  creation_date: 'creation_date',
  interest_rate: 'interest_rate',
  active: 'active',
};

const creditor = yup.object({
  label: yup.string().required('El acreedor es obligatorio'),
  value: yup.string().required('El acreedor es obligatorio'),
});
const initial_value = yup.string();
const date = yup.date();
const interest_rate = yup.string();

export const newCreditSchema = yup.object({
  [ENUM_NAMES.creditor]: creditor.required('El acreedor es obligatorio'),
  [ENUM_NAMES.initial_value]: initial_value.required('El valor inicial es obligatorio'),
  [ENUM_NAMES.creation_date]: date.required('La fecha es obligatoria'),
  [ENUM_NAMES.interest_rate]: interest_rate.required('La tasa de interés es obligatoria'),
});
