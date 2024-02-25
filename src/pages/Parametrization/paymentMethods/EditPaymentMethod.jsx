import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CircularProgress, Grid, Stack } from '@mui/material';
import Swal from 'sweetalert2';

import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { PAYMENT_METHODS_ENUM_NAMES, updatePaymentMethodSchema } from './paymentMethodSchema';
import { validateResponse } from 'utils/validateResponse';

import { usePaymentMethodsService } from 'services/usePaymentMethodsService';

const EditPaymentMethod = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { updatePaymentMethod, deletePaymentMethod } = usePaymentMethodsService();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(updatePaymentMethodSchema),
    defaultValues: {
      name: state.name,
      active: state.active,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const body = {
        id: state.id,
        name: data.name,
        active: data.active,
      };

      const response = await updatePaymentMethod({ body });

      if (
        !validateResponse(
          response,
          'Ha ocurrido un error actualizando el método de pago, por favor intente nuevamente.'
        )
      )
        return;

      Swal.fire({
        icon: 'success',
        text: response.message,
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBrand = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      text: '¿Esta seguro de eliminar este método de pago?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      showCloseButton: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const response = await deletePaymentMethod({ paymentMethodId: state.id });
        validateResponse(response, 'Ha ocurrido un error eliminando el método de pago');
      },
    });

    if (!isConfirmed) return;

    Swal.fire({
      icon: 'success',
      text: 'Método de pago eliminado exitosamente',
    }).then(() => {
      navigate(-1);
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container justifyContent={'center'} sx={{ height: '100%' }}>
          <Grid item xs={12} lg={6}>
            <Card sx={{ overflow: 'visible' }}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h4" fontWeight="medium">
                    Editar método de pago
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12}>
                    <CustomSoftInput
                      label="Nombre"
                      name={PAYMENT_METHODS_ENUM_NAMES.name}
                      placeholder="Nombre del método de pago"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomSwitch
                      label="Estado"
                      name={PAYMENT_METHODS_ENUM_NAMES.active}
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
                    onClick={handleDeleteBrand}
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

export default EditPaymentMethod;
