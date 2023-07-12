import * as yup from 'yup';

const nombre = yup
  .string()
  .min(3, 'Debe ingresar mínimo 3 caracteres')
  .max(30, 'Debe ingresar máximo 30 caracteres');
const correo = yup.string().email('Debe ingresar un correo válido');
const role = yup.object({
  value: yup.string().required('El rol es obligatorio'),
  label: yup.string().required('El rol es obligatorio'),
});
const local = yup.object({
  value: yup.string().required('El local es obligatorio'),
  label: yup.string().required('El local es obligatorio'),
});

export const newUserSchema = yup.object({
  nombre: nombre.required('El nombre es obligatorio'),
  correo: correo.required('El correo es obligatorio'),
  role: role.required('El rol es obligatorio'),
  local: local.required('El local es obligatorio'),
});
