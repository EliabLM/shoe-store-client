/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CircularProgress, Grid, Stack } from '@mui/material';
import Swal from 'sweetalert2';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import CustomSoftSelect from 'components/CustomSoftSelect/CustomSoftSelect';
import SoftInput from 'components/SoftInput';
import CustomDateInput from 'components/CustomDateInput/CustomDateInput';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { convertCurrencyToNumber } from 'utils/formatNumber';
import { convertNumberToCurrency } from 'utils/formatNumber';

import { useSalesService } from 'services/useSalesService';

import { useAuth } from 'hooks/useAuth';
import { useProducts } from 'hooks/useProducts';
import { useUsers } from 'hooks/useUsers';
import { usePaymentMethods } from 'hooks/usePaymentMethods';
import { useLocations } from 'hooks/useLocations';

import ProductItem from './components/ProductItem';
import { createSaleSchema } from './saleSchema';

const SALE_STATUS = [
  {
    value: 'PAGADA',
    label: 'Pagada',
  },
  {
    value: 'PENDIENTE',
    label: 'Pendiente',
  },
];

const today = format(new Date(), 'yyyy-MM-dd');

const NewSale = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: responseProducts } = useProducts({ active: true });
  const { data: responseUsers } = useUsers({ active: true });
  const { data: responsePaymentMethods } = usePaymentMethods({ active: true });
  const { data: responseLocations } = useLocations({ active: true });

  const productItems = useMemo(() => {
    if (!responseProducts) return [];

    return responseProducts.data.map((item) => ({
      ...item,
      productName: item.name,
      name: `${item.product_id} - ${item.brand.name} - ${item.name}`,
      id: item._id,
    }));
  }, [responseProducts]);

  const { createSale } = useSalesService();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPayment, setTotalPayment] = useState('$ 0.0');

  const { handleSubmit, control, setValue, reset } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(createSaleSchema),
    defaultValues: {
      registrationDate: today,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (selectedProducts.length === 0) return;

      setIsLoading(true);

      const { seller, paymentMethod, registrationDate, saleState } = data;

      // Validate if some products don't have stock available
      const validateProductStock = selectedProducts.map((product) => {
        if (product.stock === 0) {
          Swal.fire({
            icon: 'info',
            html: `El producto  <b>${product.name?.toUpperCase()}</b> no tiene stock disponible`,
          });

          return true;
        } else {
          return false;
        }
      });

      if (validateProductStock.includes(true)) return;

      const saleDetail = selectedProducts.map((product) => {
        const categories = product.categories.map((category) => ({
          category_id: category._id,
          name: category.name,
        }));

        return {
          product: {
            product_id: product.product_id,
            product_mongo_id: product._id,
            brand: {
              brand_id: product.brand._id,
              name: product.brand.name,
            },
            categories,
            name: product.name,
            description: product.description || '',
            stock: product.stock,
            initial_price: product.initial_price,
          },
          price: convertCurrencyToNumber(product.price),
          amount: product.amount,
          subtotal: convertCurrencyToNumber(product.subtotal),
        };
      });

      const saleBody = {
        user: {
          user_id: seller.id,
          code: seller.code,
          names: seller.names,
          email: seller.email,
          role: seller.role,
        },
        customer: null,
        sale_location: {
          sale_location_id: user.location._id,
          name: user.location.name,
          description: user.location.description || '',
        },
        total: convertCurrencyToNumber(totalPayment),
        payment_method: {
          payment_method_id: paymentMethod.id,
          name: paymentMethod.name,
        },
        sale_status: saleState.value,
        registration_date: `${registrationDate}T00:00:00.000Z`,
        sale_detail: saleDetail,
      };

      const response = await createSale({ body: saleBody });

      if (response.statusCode !== 201) {
        return Swal.fire({
          icon: 'error',
          text:
            response.message ||
            'Ha ocurrido un error registrando la venta, por favor intenta más tarde',
        });
      }

      Swal.fire({
        icon: 'success',
        text: response.message,
      }).then(() => {
        reset();
        navigate('/ventas/listado');
      });
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);

      Swal.fire({
        icon: 'error',
        text:
          error.response?.data?.message ||
          'Ha ocurrido un error registrando la venta, por favor intenta más tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSelect = async (item) => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Precio',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      reverseButtons: true,
      input: 'number',
      inputValidator: (value) => {
        if (!value) return 'Debe ingresar el precio';

        if (isNaN(Number(value))) return 'Solo puede ingresar un número';

        if (Number(value) < 10000) return 'El precio debe ser mayor o igual a $10.000';

        if (value % 1 !== 0) return 'Solo puede ingresar números enteros sin decimales';
      },
    });

    if (!result.isConfirmed) return;

    const price = Number(result.value);
    if (typeof price !== 'number') return;

    const productInfo = {
      ...item,
      id: uuidv4(),
      productId: item._id,
      name: `${item?.brand?.name} ${item.productName}`,
      amount: 1,
      initial_price: item.price,
      price: convertNumberToCurrency(price),
      subtotal: convertNumberToCurrency(price),
    };

    setSelectedProducts((prevState) => [...prevState, productInfo]);
  };

  const sellerList = useMemo(() => {
    if (!responseUsers) return [];

    return responseUsers.data.map((item) => ({
      ...item,
      value: item.id,
      label: `${item.code} - ${item.names}`,
    }));
  }, [responseUsers]);

  const paymentMethodsList = useMemo(() => {
    if (!responsePaymentMethods) return [];

    return responsePaymentMethods.data.map((item) => ({
      ...item,
      value: item.id,
      label: item.name,
    }));
  }, [responsePaymentMethods]);

  const locationsList = useMemo(() => {
    if (!responseLocations) return [];

    return responseLocations.data.map((item) => ({
      ...item,
      value: item.id,
      label: item.name,
    }));
  }, [responseLocations]);

  useEffect(() => {
    setValue('saleState', {
      value: 'PAGADA',
      label: 'Pagada',
    });

    if (!responseUsers) return;

    let seller = responseUsers.data.find((item) => item.id === user.id);
    seller = { ...seller, value: seller.id, label: `${seller.code} - ${seller.names}` };

    setValue('seller', seller);

    if (!responseLocations) return;

    let location = responseLocations.data.find((item) => item.id === user?.location?._id);

    if (user?.role === 'superadmin' && !location) return;

    if (!location) {
      Swal.fire({
        icon: 'info',
        text: 'No es posible generar una venta porque el local del usuario aparece como inactivo',
      }).then(() => {
        navigate(-1);
      });

      return;
    }

    location = { ...location, value: location?.id, label: location?.name };

    setValue('location', location);
  }, [responseUsers]);

  useEffect(() => {
    if (selectedProducts.length <= 0) return;

    const numberOfProducts = selectedProducts.map((item) => item.amount).reduce((a, b) => a + b, 0);
    setTotalProducts(numberOfProducts);

    const totalPayment = selectedProducts
      .map((item) => convertCurrencyToNumber(item.subtotal))
      .reduce((a, b) => a + b, 0);

    setTotalPayment(convertNumberToCurrency(totalPayment));
  }, [selectedProducts]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container justifyContent={'center'} sx={{ height: '100%' }}>
          <Grid item xs={12}>
            <Card sx={{ overflow: 'visible' }}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                px={3}
                py={1}
              >
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h4" fontWeight="medium">
                    Nueva venta
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox px={3} py={1} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  {/* User and location data */}
                  <Grid container item columnSpacing={3} rowSpacing={2} xs={12}>
                    <Grid item xs={12} md={6} lg={4} sx={{ zIndex: 3 }}>
                      <CustomSoftSelect
                        label="Vendedor"
                        name={'seller'}
                        placeholder="Seleccione vendedor"
                        control={control}
                        options={sellerList}
                        isDisabled={isLoading}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} sx={{ zIndex: 3 }}>
                      <CustomSoftSelect
                        label="Local"
                        name={'location'}
                        placeholder="Seleccione local"
                        control={control}
                        options={locationsList}
                        isDisabled={isLoading || user?.role !== 'superadmin'}
                        required
                      />
                    </Grid>
                  </Grid>

                  {/* Product search */}
                  <Grid item xs={12}>
                    <ReactSearchAutocomplete
                      items={productItems}
                      placeholder="Ingrese código ó nombre"
                      onSelect={handleOnSelect}
                      autoFocus
                      styling={{
                        height: '44px',
                        border: '1px solid #dfe1e5',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        boxShadow: 'rgba(32, 33, 36, 0.28) 0px 1px 6px 0px',
                        hoverBackgroundColor: '#eee',
                        color: '#212121',
                        fontSize: '16px',
                        fontFamily: 'Arial',
                        iconColor: 'grey',
                        lineColor: 'rgb(232, 234, 237)',
                        placeholderColor: 'grey',
                        clearIconMargin: '3px 14px 0 0',
                        searchIconMargin: '0 0 0 16px',
                        zIndex: 2,
                      }}
                    />
                  </Grid>

                  <Grid container rowSpacing={1} columnSpacing={2} item xs={12}>
                    {selectedProducts.map((item) => (
                      <Grid key={item.id} item xs={12} md={6} lg={4}>
                        <ProductItem item={item} setSelectedProducts={setSelectedProducts} />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Payment method and registration date */}
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={3}
                    item
                    xs={12}
                    sx={{ display: selectedProducts.length > 0 ? '' : 'none' }}
                  >
                    <Grid item xs={12} md={6} lg={4}>
                      <CustomSoftSelect
                        label="Método de pago"
                        name={'paymentMethod'}
                        placeholder="Seleccione"
                        control={control}
                        options={paymentMethodsList}
                        isDisabled={isLoading}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <CustomSoftSelect
                        label="Estado"
                        name={'saleState'}
                        placeholder="Seleccione"
                        control={control}
                        options={SALE_STATUS}
                        isDisabled={isLoading}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Controller
                        name={'registrationDate'}
                        control={control}
                        render={({
                          field: { value, onChange, onBlur },
                          fieldState: { isDirty, error },
                        }) => (
                          <CustomDateInput
                            label="Fecha de registro"
                            disabled={isLoading}
                            value={value || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            isDirty={isDirty}
                            error={error}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  {/* Number of product and total */}
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={3}
                    item
                    xs={12}
                    sx={{ display: selectedProducts.length > 0 ? '' : 'none' }}
                  >
                    <Grid item xs={12} md={6} lg={4}>
                      <SoftBox>
                        <SoftBox display="flex" alignItems="center" mb={1}>
                          <SoftTypography
                            component="label"
                            variant="caption"
                            color="dark"
                            fontSize="1rem"
                            fontWeight="bold"
                          >
                            No. de productos
                          </SoftTypography>
                        </SoftBox>

                        <SoftInput value={totalProducts} disabled />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftBox>
                        <SoftBox display="flex" alignItems="center" mb={1}>
                          <SoftTypography
                            component="label"
                            variant="caption"
                            color="dark"
                            fontSize="1rem"
                            fontWeight="bold"
                          >
                            Total a pagar
                          </SoftTypography>
                        </SoftBox>

                        <SoftInput value={totalPayment} disabled />
                      </SoftBox>
                    </Grid>
                  </Grid>
                </Grid>

                <SoftBox mt={4} mb={1} gap={1} display="flex" justifyContent="flex-end">
                  <Stack spacing={1} direction="row">
                    <SoftButton
                      type="button"
                      variant="gradient"
                      color="secondary"
                      disabled={isLoading}
                      onClick={() => navigate(-1)}
                    >
                      Volver
                    </SoftButton>
                  </Stack>
                  <SoftButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    disabled={isLoading || selectedProducts.length === 0}
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} color="white" />
                      </>
                    ) : (
                      'Crear'
                    )}
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
};

export default NewSale;
