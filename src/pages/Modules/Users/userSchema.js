import * as yup from 'yup';
export const USER_ENUM_NAMES = {
  names: 'names',
  code: 'code',
  email: 'email',
  role: 'role',
  location: 'location',
  active: 'active',
};

const names = yup
  .string()
  .min(3, 'Los nombres deben tener mínimo 3 caracteres')
  .max(30, 'Los nombres deben tener máximo 30 caracteres');
const code = yup
  .string()
  .matches(
    /^[A-Z0-9]{6}$/,
    'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números'
  );
const email = yup.string().email('Debe ingresar un correo válido');
const role = yup.object().shape({
  value: yup
    .string()
    .oneOf(['superadmin', 'admin', 'vendedor'], 'El rol no es válido')
    .required('El rol es obligatorio'),
  label: yup.string().required('El rol es obligatorio'),
});
const active = yup.boolean().typeError('El estado debe ser un dato verdadero o falso');
// const password = yup.string().min(6, 'La contraseña debe tener mínimo 6 caracteres');
const location = yup.object().shape({
  label: yup.string().required('El local es obligatorio'),
  value: yup.string().required('El local es obligatorio'),
});

export const createUserSchema = yup.object().shape({
  [USER_ENUM_NAMES.names]: names.required('Los nombres son obligatorios'),
  [USER_ENUM_NAMES.code]: code.required('El código es obligatorio'),
  // password: password.required('La contraseña es obligatoria'),
  [USER_ENUM_NAMES.email]: email.required('El correo electrónico es obligatorio'),
  [USER_ENUM_NAMES.role]: role,
  [USER_ENUM_NAMES.location]: location,
});

export const updateUserSchema = yup.object().shape({
  [USER_ENUM_NAMES.names]: names.required('Los nombres son obligatorios'),
  [USER_ENUM_NAMES.email]: email.required('El correo electrónico es obligatorio'),
  [USER_ENUM_NAMES.role]: role,
  [USER_ENUM_NAMES.location]: location,
  [USER_ENUM_NAMES.active]: active.required('El estado es obligatorio'),
});
