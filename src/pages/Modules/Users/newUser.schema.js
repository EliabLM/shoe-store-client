import * as yup from 'yup';

export const ENUM_NAMES = {
  nombre: 'nombre',
  correo: 'correo',
  role: 'role',
  local: 'local',
  activo: 'activo',
};

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
  [ENUM_NAMES.nombre]: nombre.required('El nombre es obligatorio'),
  [ENUM_NAMES.correo]: correo.required('El correo es obligatorio'),
  [ENUM_NAMES.role]: role.required('El rol es obligatorio'),
  [ENUM_NAMES.local]: local.required('El local es obligatorio'),
});
