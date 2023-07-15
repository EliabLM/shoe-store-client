import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

import { ENUM_NAMES, updateCreditorSchema } from './newCreditor.schema';
import { useCreditorsService } from 'services/useCreditorsService';
import { validateResponse } from 'utils/validateResponse';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';

const EditCreditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCreditor } = useCreditorsService();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(updateCreditorSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { name, contact, active } = data;

    const body = {
      id: location.state.id,
      name,
      contact: contact || '',
      active,
    };

    const resUpdateCreditor = await updateCreditor({ body });

    setIsLoading((prevState) => !prevState);

    if (
      !validateResponse(
        resUpdateCreditor,
        'Ha ocurrido un error actualizando el acreedor, por favor intente nuevamente.'
      )
    )
      return;

    Swal.fire({
      icon: 'success',
      text: resUpdateCreditor.message,
    }).then(() => {
      navigate('/acreedores/lista-acreedores');
    });
  };

  useEffect(() => {
    if (!location.state) return navigate('/acreedores/lista-acreedores');

    setValue(ENUM_NAMES.name, location.state.name);
    setValue(ENUM_NAMES.contact, location.state.contact);
    setValue(ENUM_NAMES.active, location.state.active);
  }, [location.state]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={30}>
        <Grid container justifyContent={'center'} sx={{ height: '100%' }}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: 'visible' }}>
              <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h4" fontWeight="medium">
                    Editar acreedor
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomSoftInput
                      label="Nombre"
                      name={ENUM_NAMES.name}
                      placeholder="Nombre"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftInput
                      label="Número de contacto"
                      name={ENUM_NAMES.contact}
                      placeholder="3001234567"
                      type="number"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSwitch name={ENUM_NAMES.active} control={control} disabled={isLoading} />
                  </Grid>
                </Grid>

                <SoftBox mt={4} mb={1} gap={1} display="flex" justifyContent="flex-end">
                  <Stack spacing={1} direction="row">
                    <Link
                      to={
                        isLoading ? '/acreedores/editar-acreedor' : '/acreedores/lista-acreedores'
                      }
                    >
                      <SoftButton
                        type="button"
                        variant="gradient"
                        color="secondary"
                        disabled={isLoading}
                      >
                        Volver
                      </SoftButton>
                    </Link>
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

export default EditCreditor;
