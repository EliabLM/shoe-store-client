import * as yup from 'yup';

export const ENUM_NAMES = {
  name: 'name',
  contact: 'contact',
  active: 'active',
};

const name = yup
  .string()
  .min(3, 'Debe ingresar mínimo 3 caracteres')
  .max(30, 'Debe ingresar máximo 30 caracteres');
const contact = yup
  .string()
  .min(7, 'Debe ingresar mínimo 7 dígitos')
  .max(10, 'Debe ingresar máximo 10 dígitos');

const activo = yup.boolean();

export const newCreditorSchema = yup.object({
  [ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [ENUM_NAMES.contact]: contact,
});

export const updateCreditorSchema = yup.object({
  [ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [ENUM_NAMES.contact]: contact,
  [ENUM_NAMES.active]: activo.required('El estado es requerido'),
});
