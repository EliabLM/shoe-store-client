import * as yup from 'yup';
export const LOCATION_ENUM_NAMES = {
  name: 'name',
  description: 'description',
  active: 'active',
};

const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(50, 'El nombre debe tener máximo 50 caracteres');
const description = yup.string().min(3, 'La descripción debe tener mínimo 3 caracteres');
const active = yup.boolean().typeError('El estado debe ser un dato verdadero o falso');

export const createLocationSchema = yup.object().shape({
  [LOCATION_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [LOCATION_ENUM_NAMES.description]: description.required('La descripción es obligatoria'),
});

export const updateLocationSchema = yup.object().shape({
  [LOCATION_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [LOCATION_ENUM_NAMES.description]: description.required('La descripción es obligatoria'),
  [LOCATION_ENUM_NAMES.active]: active.required('El estado es obligatorio'),
});
