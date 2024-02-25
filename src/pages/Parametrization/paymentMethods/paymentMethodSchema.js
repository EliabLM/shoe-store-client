import * as yup from 'yup';
export const PAYMENT_METHODS_ENUM_NAMES = {
  name: 'name',
  active: 'active',
};

const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(50, 'El nombre debe tener máximo 50 caracteres');
const active = yup.boolean().typeError('El estado debe ser un dato verdadero o falso');

export const createPaymentMethodSchema = yup.object().shape({
  [PAYMENT_METHODS_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
});

export const updatePaymentMethodSchema = yup.object().shape({
  [PAYMENT_METHODS_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [PAYMENT_METHODS_ENUM_NAMES.active]: active.required('El estado es obligatorio'),
});
