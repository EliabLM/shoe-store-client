import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CircularProgress, Grid, Stack } from '@mui/material';
import Swal from 'sweetalert2';

import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { PAYMENT_METHODS_ENUM_NAMES, createPaymentMethodSchema } from './paymentMethodSchema';
import { validateResponse } from 'utils/validateResponse';

import { usePaymentMethodsService } from 'services/usePaymentMethodsService';

const NewPaymentMethod = () => {
  const navigate = useNavigate();
  const { createPaymentMethod } = usePaymentMethodsService();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(createPaymentMethodSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const body = {
        name: data.name,
      };

      const response = await createPaymentMethod({ body });

      if (
        !validateResponse(
          response,
          'Ha ocurrido un error registrando el método de pago, por favor intente nuevamente.'
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
                    Nuevo método de pago
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
                  <SoftButton type="submit" variant="gradient" color="dark" disabled={isLoading}>
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

export default NewPaymentMethod;
