/* eslint-disable react/prop-types */
// react-router-dom components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// @mui material components
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';
import CreditorsActionCell from './components/CreditorsActionCell';

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// hooks
import { useCreditorsList } from './hooks/useCreditorsList';
import { useCreditorsService } from 'services/useCreditorsService';
import { validateResponse } from 'utils/validateResponse';

const columns = [
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Contacto',
    accessor: 'contact',
  },
  {
    Header: 'Opciones',
    accessor: 'options',
  },
];

function CreditorsList() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useCreditorsList();
  const { deleteCreditor: deleteCreditorService } = useCreditorsService();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

  const deleteCreditor = async (item) => {
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
        const response = await deleteCreditorService({ user_id: item.id });
        validateResponse(response, 'Ha ocurrido un error eliminando el acreedor.');
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

    const creditors = data?.data?.map((item) => ({
      ...item,
      options: (
        <CreditorsActionCell
          item={item}
          deleteCreditor={deleteCreditor}
          editCreditor={editCreditor}
        />
      ),
    }));

    setDataTable((prevState) => ({ ...prevState, rows: creditors || [] }));
  }, [data, isLoading]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h4" fontWeight="medium">
                Acreedores
              </SoftTypography>
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/acreedores/nuevo-acreedor">
                <SoftButton variant="gradient" color="dark" size="small">
                  + Nuevo acreedor
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

export default CreditorsList;
