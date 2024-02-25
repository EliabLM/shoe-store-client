import * as yup from 'yup';
export const PRODUCT_ENUM_NAMES = {
  brand: 'brand',
  name: 'name',
  categories: 'categories',
  stock: 'stock',
  description: 'description',
  price: 'price',
  active: 'active',
};

const brand = yup.object().shape({
  label: yup.string().required('La marca es obligatoria'),
  value: yup.string().required('La marca es obligatoria'),
});
const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const categories = yup
  .array()
  .of(
    yup.object().shape({
      label: yup.string().required('Debe incluir al menos una categoría'),
      value: yup.string().required('Debe incluir al menos una categoría'),
    })
  )
  .min(1);
const stock = yup
  .number()
  .typeError('Debe ingresar un número')
  .positive('Debe ingresar un número positivo')
  .integer('Debe ingresar un número entero');
const description = yup.string().nullable(true);
const price = yup.string();
const active = yup.boolean().typeError('El estado debe ser un dato verdadero o falso');

export const createProductSchema = yup.object().shape({
  [PRODUCT_ENUM_NAMES.brand]: brand.required('La marca es obligatoria'),
  [PRODUCT_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [PRODUCT_ENUM_NAMES.categories]: categories.required('Debe incluir al menos una categoría'),
  [PRODUCT_ENUM_NAMES.stock]: stock.required('Debe ingresar el stock actual del producto'),
  [PRODUCT_ENUM_NAMES.description]: description,
  [PRODUCT_ENUM_NAMES.price]: price.required('Debe ingresar el precio del producto'),
});

export const updateProductSchema = yup.object().shape({
  [PRODUCT_ENUM_NAMES.brand]: brand.required('La marca es obligatoria'),
  [PRODUCT_ENUM_NAMES.name]: name.required('El nombre es obligatorio'),
  [PRODUCT_ENUM_NAMES.categories]: categories.required('Debe incluir al menos una categoría'),
  [PRODUCT_ENUM_NAMES.description]: description,
  [PRODUCT_ENUM_NAMES.price]: price.required('Debe ingresar el precio del producto'),
  [PRODUCT_ENUM_NAMES.active]: active.required('El estado es obligatorio'),
});
