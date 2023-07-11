import * as yup from 'yup';

const email = yup.string().email('Debe ingresar un correo válido');
const password = yup.string();

export const signInSchema = yup.object({
  email: email.required('El correo es obligatorio'),
  password: password.required('La contraseña es obligatoria'),
});
