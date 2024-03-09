import * as yup from 'yup';

const registration_date = yup
  .string()
  .typeError('Debe ingresar una cadena de texto')
  .test('es-formato-iso', 'La fecha de registro debe tener un formato válido', (value) => {
    return /^(\d{4}-\d{2}-\d{2})$/.test(value || '');
  });

export const createSaleSchema = yup.object().shape({
  seller: yup
    .object()
    .shape({
      label: yup.string().required('El vendedor es obligatorio'),
      value: yup.string().required('El vendedor es obligatorio'),
    })
    .required('El vendedor es obligatorio'),
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
