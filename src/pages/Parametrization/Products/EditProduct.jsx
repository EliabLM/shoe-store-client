import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CircularProgress, Grid, Stack } from '@mui/material';
import Swal from 'sweetalert2';

import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import CustomSoftSelect from 'components/CustomSoftSelect/CustomSoftSelect';
import CustomCurrencyInput from 'components/CustomCurrencyInput/CustomCurrencyInput';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { validateResponse } from 'utils/validateResponse';
import { convertCurrencyToNumber } from 'utils/formatNumber';

import { useBrands } from 'hooks/useBrands';
import { useCategories } from 'hooks/useCategories';
import { useProductsService } from 'services/useProductsService';
import { createProductSchema, PRODUCT_ENUM_NAMES } from './productsSchema';
import { convertNumberToCurrency } from 'utils/formatNumber';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';

const EditProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data: responseBrands } = useBrands({ active: true });
  const { data: responseCategories } = useCategories({ active: true });
  const { updateProduct, deleteProduct } = useProductsService();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(createProductSchema),
    defaultValues: {
      name: state.name,
      stock: state.stock,
      description: state.description,
      price: convertNumberToCurrency(state.price),
      active: state.active,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const body = {
        id: state.id,
        name: data.name,
        description: data.description,
        brand: data.brand.value,
        categories: data.categories.map((item) => item.value),
        price: convertCurrencyToNumber(data.price),
        stock: state.stock,
        active: data.active,
      };

      const response = await updateProduct({ body });

      if (
        !validateResponse(
          response,
          'Ha ocurrido un error actualizando el producto, por favor intente nuevamente.'
        )
      )
        return;

      Swal.fire({
        icon: 'success',
        text: response.message,
      }).then(() => {
        navigate('/parametrizacion/productos');
      });
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      text: '¿Esta seguro de eliminar este producto?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      showCloseButton: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const response = await deleteProduct({ productId: state._id });
        validateResponse(response, 'Ha ocurrido un error eliminando el producto');
      },
    });

    if (!isConfirmed) return;

    Swal.fire({
      icon: 'success',
      text: 'Producto eliminado exitosamente',
    }).then(() => {
      navigate(-1);
    });
  };

  const categoriesList = useMemo(() => {
    if (!responseCategories) return [];

    return responseCategories.data.map((item) => ({ ...item, value: item.id, label: item.name }));
  }, [responseCategories]);

  const brandsList = useMemo(() => {
    if (!responseBrands?.data) return [];

    return responseBrands?.data.map((item) => ({ ...item, value: item.id, label: item.name }));
  }, [responseBrands]);

  useEffect(() => {
    if (!state) return navigate(-1);

    const brand = { label: state?.brand?.name, value: state?.brand?._id };
    const categories = state?.categories?.map((item) => ({ label: item.name, value: item._id }));

    setValue(PRODUCT_ENUM_NAMES.brand, brand);
    setValue(PRODUCT_ENUM_NAMES.categories, categories);
  }, [state]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container justifyContent={'center'} sx={{ height: '100%' }}>
          <Grid item xs={12}>
            <Card sx={{ overflow: 'visible' }}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h4" fontWeight="medium">
                    Editar producto
                  </SoftTypography>
                  {/* <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography> */}
                </SoftBox>
              </SoftBox>

              <SoftBox p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12} md={6} lg={4}>
                    <CustomSoftSelect
                      label="Marca"
                      name={PRODUCT_ENUM_NAMES.brand}
                      placeholder="Seleccione"
                      control={control}
                      options={brandsList}
                      isDisabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <CustomSoftInput
                      label="Nombre"
                      name={PRODUCT_ENUM_NAMES.name}
                      placeholder="Nombre"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CustomSoftSelect
                      label="Categorías"
                      name={PRODUCT_ENUM_NAMES.categories}
                      placeholder="Seleccione"
                      control={control}
                      options={categoriesList}
                      isDisabled={isLoading}
                      isMulti
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <CustomSoftInput
                      label="Cantidad"
                      type="number"
                      placeholder="Cantidad"
                      name={PRODUCT_ENUM_NAMES.stock}
                      register={register}
                      errors={errors}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CustomSoftInput
                      label="Descripción"
                      name={PRODUCT_ENUM_NAMES.description}
                      placeholder="Descripción..."
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      multiline
                      rows={5}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <CustomCurrencyInput
                      label="Precio"
                      name={PRODUCT_ENUM_NAMES.price}
                      placeholder="$ 0.00"
                      control={control}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSwitch
                      label="Estado"
                      name={PRODUCT_ENUM_NAMES.active}
                      control={control}
                      disabled={isLoading}
                    />
                  </Grid>
                </Grid>

                <SoftBox mt={4} mb={1} gap={1} display="flex" justifyContent="flex-end">
                  <SoftButton
                    type="button"
                    variant="gradient"
                    color="error"
                    sx={{ marginRight: 'auto' }}
                    disabled={isLoading}
                    onClick={handleDeleteProduct}
                  >
                    Eliminar
                  </SoftButton>
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
                  <SoftButton type="submit" variant="gradient" color="dark" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} color="white" />
                      </>
                    ) : (
                      'Editar'
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

export default EditProduct;
