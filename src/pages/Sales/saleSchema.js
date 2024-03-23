import * as yup from 'yup';
import { isAfter, parseISO } from 'date-fns';

const registration_date = yup
  .string()
  .typeError('Debe ingresar una cadena de texto')
  .test('es-formato-iso', 'La fecha de registro debe tener un formato válido', (value) => {
    return /^(\d{4}-\d{2}-\d{2})$/.test(value || '');
  })
  .test('is-before-today', 'La fecha no puede ser posterior a hoy', function (value) {
    const today = new Date();
    const providedDate = parseISO(value);
    return isAfter(today, providedDate);
  });

export const createSaleSchema = yup.object().shape({
  seller: yup
    .object()
    .shape({
      label: yup.string().required('El vendedor es obligatorio'),
      value: yup.string().required('El vendedor es obligatorio'),
    })
    .required('El vendedor es obligatorio'),
  location: yup
    .object()
    .shape({
      label: yup.string().required('El local es obligatorio'),
      value: yup.string().required('El local es obligatorio'),
    })
    .required('El local es obligatorio'),
  paymentMethod: yup.object().shape({
    label: yup.string().required('El método de pago es obligatorio'),
    value: yup.string().required('El método de pago es obligatorio'),
  }),
  saleState: yup.object().shape({
    label: yup.string().required('El estado de la venta es obligatorio'),
    value: yup.string().required('El estado de la venta obligatorio'),
  }),
  registrationDate: registration_date.required('La fecha de registro es obligatoria'),
});
