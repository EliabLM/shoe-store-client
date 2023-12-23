import * as yup from 'yup';

const code = yup
  .string()
  .matches(
    /^[A-Z0-9]{6}$/,
    'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números'
  );
const password = yup.string();

export const signInSchema = yup.object({
  code: code.required('El código es obligatorio'),
  password: password.required('La contraseña es obligatoria'),
});
