import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CircularProgress, Grid, Stack } from '@mui/material';

import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import CustomSoftSelect from 'components/CustomSoftSelect/CustomSoftSelect';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { newUserSchema } from './newUser.schema';
import { useUsersService } from 'services/useUsersService';
import { validateResponse } from 'utils/validateResponse';
import Swal from 'sweetalert2';

const ROLES = [
  {
    value: 'superadmin',
    label: 'Super administrador',
  },
  {
    value: 'admin',
    label: 'Administrador',
  },
  {
    value: 'vendedor',
    label: 'Vendedor',
  },
];

const LOCALES = [
  {
    value: 'LOCAL1',
    label: 'Local #1',
  },
  {
    value: 'LOCAL2',
    label: 'Local #2',
  },
  {
    value: 'LOCAL3',
    label: 'Local #3',
  },
  {
    value: 'LOCAL4',
    label: 'Local #4',
  },
];

const NewUser = () => {
  const navigate = useNavigate();
  const { createUser } = useUsersService();
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
    resolver: yupResolver(newUserSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { nombre, correo, local, role } = data;

    const body = {
      nombre,
      email: correo,
      rol: role.value,
      local: local.value,
    };

    const resCreateUser = await createUser({ body });
    console.log('🚀 ~ onSubmit ~ resCreateUser:', resCreateUser);

    setIsLoading((prevState) => !prevState);

    if (
      !validateResponse(
        resCreateUser,
        'Ha ocurrido un error registrando el usuario, por favor intente nuevamente.'
      )
    )
      return;

    Swal.fire({
      icon: 'success',
      text: resCreateUser.message,
    }).then(() => {
      navigate('/usuarios/lista-usuarios');
    });
  };

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
                    Nuevo usuario
                  </SoftTypography>
                  {/* <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography> */}
                </SoftBox>
              </SoftBox>

              <SoftBox p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomSoftInput
                      label="Nombre"
                      name="nombre"
                      placeholder="Nombre"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftInput
                      label="Correo"
                      name="correo"
                      placeholder="ejemplo@gmail.com"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftSelect
                      label="Rol"
                      name="role"
                      placeholder="Seleccione"
                      control={control}
                      options={ROLES}
                      isDisabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftSelect
                      label="Local"
                      name="local"
                      placeholder="Seleccione"
                      control={control}
                      options={LOCALES}
                      isDisabled={isLoading}
                      required
                    />
                  </Grid>
                </Grid>

                <SoftBox mt={4} mb={1} gap={1} display="flex" justifyContent="flex-end">
                  <Stack spacing={1} direction="row">
                    <Link to={isLoading ? '/usuarios/nuevo-usuario' : '/usuarios/lista-usuarios'}>
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

export default NewUser;
