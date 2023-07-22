import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CircularProgress, Grid, Stack } from '@mui/material';
import Swal from 'sweetalert2';

import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import CustomSoftSelect from 'components/CustomSoftSelect/CustomSoftSelect';
import CustomSoftDatePicker from 'components/CustomSoftDatePicker/CustomSoftDatePicker';
import CustomCurrencyInput from 'components/CustomCurrencyInput/CustomCurrencyInput';
import CustomPercentageInput from 'components/CustomPercentageInput/CustomPercentageInput';

import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

// Utils
import { validateResponse } from 'utils/validateResponse';
import { convertCurrencyToNumber, removePercentage } from 'utils/formatNumber';

import { ENUM_NAMES, newCreditSchema } from './newCredit.schema';
import { useCreditorsList } from '../hooks/useCreditorsList';

const NewCredit = () => {
  const navigate = useNavigate();
  const { data, isLoading: isLoadingCreditors } = useCreditorsList();

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(newCreditSchema),
  });

  const onSubmit = async (data) => {
    let newData = { ...data };

    newData.interest_rate = removePercentage(newData.interest_rate);
    newData.initial_value = convertCurrencyToNumber(newData.initial_value);
    newData.creation_date = newData.creation_date.toISOString();

    return;
    setIsLoading(true);

    const { name, contact } = data;

    const body = {
      name,
      contact: contact || '',
    };

    // const resCreateCreditor = await createCreditor({ body });

    setIsLoading((prevState) => !prevState);

    if (
      !validateResponse(
        // resCreateCreditor,
        'Ha ocurrido un error registrando el acreedor, por favor intente nuevamente.'
      )
    )
      return;

    Swal.fire({
      icon: 'success',
      // text: resCreateCreditor.message,
    }).then(() => {
      navigate('/acreedores/creditos/lista-creditos');
    });
  };

  const options = useMemo(() => {
    if (!data) return [];

    return (
      data.data
        ?.filter((item) => item.active)
        ?.map((item) => ({ value: item.id, label: item.name })) || []
    );
  }, [data]);

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
                    Nuevo crédito
                  </SoftTypography>
                </SoftBox>
              </SoftBox>

              <SoftBox p={3} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <CustomSoftSelect
                      label="Acreedor"
                      name={ENUM_NAMES.creditor}
                      placeholder="Seleccione"
                      control={control}
                      options={options}
                      isDisabled={isLoading}
                      isLoading={isLoadingCreditors}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomCurrencyInput
                      label="Valor inicial"
                      name={ENUM_NAMES.initial_value}
                      placeholder="$ 0.00"
                      control={control}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomSoftDatePicker
                      label="Fecha"
                      name={ENUM_NAMES.creation_date}
                      placeholder="Seleccionar fecha"
                      control={control}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomPercentageInput
                      label="Tasa de interés"
                      name={ENUM_NAMES.interest_rate}
                      placeholder="0% - 100%"
                      control={control}
                      disabled={isLoading}
                      required
                    />
                  </Grid>
                </Grid>

                <SoftBox mt={4} mb={1} gap={1} display="flex" justifyContent="flex-end">
                  <Stack spacing={1} direction="row">
                    <Link
                      to={
                        isLoading
                          ? '/acreedores/creditos/nuevo-credito'
                          : '/acreedores/creditos/lista-creditos'
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

export default NewCredit;
