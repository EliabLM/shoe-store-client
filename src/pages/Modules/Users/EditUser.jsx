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
import CustomSoftSelect from 'components/CustomSoftSelect/CustomSoftSelect';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { ENUM_NAMES, updateUserSchema } from './newUser.schema';
import { useUsersService } from 'services/useUsersService';
import { validateResponse } from 'utils/validateResponse';
import { ROLES, LOCALES } from 'data/enums';

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useUsersService();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(updateUserSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { nombre, correo, local, role, activo } = data;

    const body = {
      id: location.state.id,
      nombre,
      activo,
      email: correo,
      rol: role.value,
      local: local.value,
    };

    const resUpdateUser = await updateUser({ body });

    setIsLoading((prevState) => !prevState);

    if (
      !validateResponse(
        resUpdateUser,
        'Ha ocurrido un error actualizando el usuario, por favor intente nuevamente.'
      )
    )
      return;

    Swal.fire({
      icon: 'success',
      text: resUpdateUser.message,
    }).then(() => {
      navigate('/usuarios/lista-usuarios');
    });
  };

  useEffect(() => {
    if (!location.state) return navigate('/usuarios/lista-usuarios');

    const local = LOCALES.filter((item) => item.value === location.state.local)?.[0];
    const role = ROLES.filter((item) => item.value === location.state.rol)?.[0];

    setValue(ENUM_NAMES.nombre, location.state.nombre);
    setValue(ENUM_NAMES.correo, location.state.email);
    setValue(ENUM_NAMES.activo, location.state.activo);
    setValue(ENUM_NAMES.local, local);
    setValue(ENUM_NAMES.role, role);
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
                    Editar usuario
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
                      name={ENUM_NAMES.nombre}
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
                      name={ENUM_NAMES.correo}
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
                      name={ENUM_NAMES.role}
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
                      name={ENUM_NAMES.local}
                      placeholder="Seleccione"
                      control={control}
                      options={LOCALES}
                      isDisabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSwitch name={ENUM_NAMES.activo} control={control} disabled={isLoading} />
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

export default EditUser;