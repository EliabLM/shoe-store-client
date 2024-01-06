import * as yup from 'yup';
export const CATEGORY_ENUM_NAMES = {
  name: 'name',
  active: 'active',
};

const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(50, 'El nombre debe tener máximo 50 caracteres');
const active = yup.boolean().typeError('El estado debe ser un dato verdadero o falso');

export const createCategorySchema = yup.object().shape({
  [CATEGORY_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
});

export const updateCategorySchema = yup.object().shape({
  [CATEGORY_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [CATEGORY_ENUM_NAMES.active]: active.required('El estado es obligatorio'),
});
