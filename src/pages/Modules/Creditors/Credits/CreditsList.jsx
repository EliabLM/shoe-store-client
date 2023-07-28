/* eslint-disable react/prop-types */
// react-router-dom components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

// @mui material components
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';
import SoftBadge from 'components/SoftBadge';
import CreditsActionCell from '../components/CreditsActionCell';

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// hooks
import { useCreditsList } from '../hooks/useCreditsList';
import { useCreditorsService } from 'services/useCreditorsService';

// Utils
import { validateResponse } from 'utils/validateResponse';
import { convertNumberToCurrency } from 'utils/formatNumber';
import { addPercentage } from 'utils/formatNumber';

const columns = [
  {
    Header: 'Acreedor',
    accessor: 'creditor_name',
  },
  {
    Header: 'Valor inicial',
    accessor: 'initialValue',
  },
  {
    Header: 'Fecha',
    accessor: 'creationDate',
  },
  {
    Header: 'Tasa de interés',
    accessor: 'interestRate',
  },
  {
    Header: 'Estado',
    accessor: 'active',
    Cell: ({ value }) => (
      <SoftBadge badgeContent={value ? 'Activo' : 'Inactivo'} color={value ? 'success' : 'error'} />
    ),
  },
  {
    Header: 'Opciones',
    accessor: 'options',
  },
];

function CreditsList() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useCreditsList();
  const { disableCreditor: disableCreditorService } = useCreditorsService();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

  const disableCreditor = async (item) => {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      text: '¿Esta seguro de eliminar este acreedor?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      showCloseButton: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const response = await disableCreditorService({ creditor_id: item.id });
        validateResponse(response, 'Ha ocurrido un error deshabilitando el acreedor.');
      },
    });

    if (!isConfirmed) return;
    refetch();
  };

  const editCreditor = async (acreedor) => {
    navigate('/acreedores/editar-acreedor', { state: acreedor });
  };

  useEffect(() => {
    if (!data) return;

    if (!data.data) {
      toast.error(data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      return;
    }

    const credits = data?.data?.map((item) => ({
      ...item,
      creditor_name: item.creditor.name,
      initialValue: convertNumberToCurrency(item.initialValue),
      creationDate: item.creationDate?.split('T')?.[0],
      interestRate: addPercentage(item.interestRate),
      options: <CreditsActionCell item={item} />,
    }));

    setDataTable((prevState) => ({ ...prevState, rows: credits || [] }));
  }, [data, isLoading]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SoftBox my={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h4" fontWeight="medium">
                Créditos
              </SoftTypography>
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/acreedores/creditos/nuevo-credito">
                <SoftButton variant="gradient" color="dark" size="small">
                  + Nuevo crédito
                </SoftButton>
              </Link>
            </Stack>
          </SoftBox>
          {isLoading ? (
            <SoftBox display="flex" justifyContent="center">
              <CustomLoader />
            </SoftBox>
          ) : (
            <DataTable
              table={dataTable}
              entriesPerPage={{
                defaultValue: 10,
                entries: [5, 7, 10, 15, 20, 25],
              }}
              canSearch
            />
          )}
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreditsList;
