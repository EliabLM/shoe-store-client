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
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { USER_ENUM_NAMES, updateUserSchema } from './userSchema';
import { validateResponse } from 'utils/validateResponse';
import { ROLES } from 'data/enums';

import { useUsersService } from 'services/useUsersService';
import { useLocations } from 'hooks/useLocations';

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useUsersService();
  const { data: dataLocations } = useLocations();
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
    defaultValues: {
      code: location.state.code,
      names: location.state.names,
      email: location.state.email,
      active: location.state.active,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const body = {
        id: location.state.id,
        code: location.state.code,
        names: data.names,
        email: data.email,
        role: data.role.value,
        location: data.location.value,
        active: data.active,
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
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state) return navigate('/usuarios/lista-usuarios');

    const role = ROLES.filter((item) => item.value === location.state.role)[0];
    const userLocation = dataLocations?.data
      ?.filter((item) => item.id === location.state.location._id)
      ?.map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))[0];

    setValue(USER_ENUM_NAMES.role, role);
    setValue(USER_ENUM_NAMES.location, userLocation);
  }, [location]);

  const locationsList = useMemo(() => {
    if (!dataLocations) return [];

    return dataLocations.data.map((item) => ({ ...item, value: item.id, label: item.name }));
  }, [dataLocations]);

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
                      label="Código"
                      name={USER_ENUM_NAMES.code}
                      placeholder="CÓDIGO"
                      register={register}
                      errors={errors}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftInput
                      label="Nombre completo"
                      name={USER_ENUM_NAMES.names}
                      placeholder="Nombre completo"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftInput
                      label="Correo electrónico"
                      name={USER_ENUM_NAMES.email}
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
                      name={USER_ENUM_NAMES.role}
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
                      name={USER_ENUM_NAMES.location}
                      placeholder="Seleccione"
                      control={control}
                      options={locationsList}
                      isDisabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSwitch
                      label="Estado"
                      name={USER_ENUM_NAMES.active}
                      control={control}
                      disabled={isLoading}
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
