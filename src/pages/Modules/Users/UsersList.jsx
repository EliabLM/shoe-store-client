/* eslint-disable react/prop-types */
// react-router-dom components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import UsersActionsCell from './components/UsersActionCell';

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// hooks
import { useUsersList } from './hooks/useUsersList';
import { useUsersService } from 'services/useUsersService';
import { validateResponse } from 'utils/validateResponse';

const ENUM_ROLES = {
  superadmin: 'Super administrador',
  admin: 'Administrador',
  vendedor: 'Vendedor',
};

const columns = [
  {
    Header: 'Código',
    accessor: 'code',
  },
  {
    Header: 'Nombre',
    accessor: 'names',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Rol',
    accessor: 'role',
    Cell: ({ value }) => (
      <SoftTypography color="text" fontSize="0.9rem">
        {ENUM_ROLES[value]}
      </SoftTypography>
    ),
  },
  {
    Header: 'Local',
    accessor: 'location.name',
  },
  {
    Header: 'Estado',
    accessor: 'active',
    Cell: ({ value }) => (
      <SoftBadge
        badgeContent={value ? 'Activo' : 'Inactivo'}
        color={value ? 'success' : 'error'}
        variant="contained"
      />
    ),
  },
  {
    Header: 'Opciones',
    accessor: 'options',
  },
];

function UsersList() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useUsersList();
  const { updateUserState } = useUsersService();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

  const toggleUserState = async (item) => {
    const response = await updateUserState({ userId: item.id, active: !item.active });
    validateResponse(response, 'Ha ocurrido un error actualizando el estado del usuario');
    refetch();
  };

  const editUser = async (user) => {
    navigate('/usuarios/editar-usuario', { state: user });
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

    const users = data?.data?.map((item) => ({
      ...item,
      options: (
        <UsersActionsCell item={item} toggleUserState={toggleUserState} editUser={editUser} />
      ),
    }));

    setDataTable((prevState) => ({ ...prevState, rows: users || [] }));
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
                Usuarios
              </SoftTypography>
              {/* <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography> */}
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/usuarios/nuevo-usuario">
                <SoftButton variant="gradient" color="dark" size="small">
                  + Nuevo usuario
                </SoftButton>
              </Link>
              {/* <SoftButton variant="outlined" color="info" size="small">
                import
              </SoftButton>
              <SoftButton variant="outlined" color="info" size="small">
                export
              </SoftButton> */}
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

export default UsersList;
