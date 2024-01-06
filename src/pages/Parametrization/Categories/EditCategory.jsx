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

import { CATEGORY_ENUM_NAMES, updateCategorySchema } from './categorySchema';
import { validateResponse } from 'utils/validateResponse';

import { useCategoriesService } from 'services/useCategoriesService';

const EditCategory = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { updateCategory, deleteCategory } = useCategoriesService();
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
    resolver: yupResolver(updateCategorySchema),
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

      const response = await updateCategory({ body });

      if (
        !validateResponse(
          response,
          'Ha ocurrido un error actualizando la categoría, por favor intente nuevamente.'
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

  const handleDeleteCategory = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      text: '¿Esta seguro de eliminar esta categoría?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      showCloseButton: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const response = await deleteCategory({ categoryId: state.id });
        validateResponse(response, 'Ha ocurrido un error eliminando la categoría');
      },
    });

    if (!isConfirmed) return;

    Swal.fire({
      icon: 'success',
      text: 'Categoría eliminada exitosamente',
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
                    Editar categoría
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12}>
                    <CustomSoftInput
                      label="Nombre"
                      name={CATEGORY_ENUM_NAMES.name}
                      placeholder="Nombre de la categoría"
                      register={register}
                      errors={errors}
                      disabled={isLoading}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CustomSwitch
                      label="Estado"
                      name={CATEGORY_ENUM_NAMES.active}
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
                    onClick={handleDeleteCategory}
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

export default EditCategory;
