/* eslint-disable react/prop-types */
// react-router-dom components
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
    Header: 'Nombre',
    accessor: 'nombre',
  },
  {
    Header: 'Correo',
    accessor: 'email',
  },
  {
    Header: 'Rol',
    accessor: 'rol',
    Cell: ({ value }) => (
      <SoftTypography color="text" fontSize="1rem">
        {ENUM_ROLES[value]}
      </SoftTypography>
    ),
  },
  {
    Header: 'Local',
    accessor: 'local',
  },
  {
    Header: 'Estado',
    accessor: 'activo',
    Cell: ({ value }) => (
      <SoftBadge badgeContent={value ? 'Activo' : 'Inactivo'} color={value ? 'success' : 'error'} />
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
  const { deleteUser: deleteUserService } = useUsersService();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

  const deleteUser = async (item) => {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      text: '¿Esta seguro de eliminar este usuario?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      showCloseButton: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const response = await deleteUserService({ user_id: item.id });
        validateResponse(response, 'Ha ocurrido un error eliminando el usuario.');
      },
    });

    if (!isConfirmed) return;
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
      options: <UsersActionsCell item={item} deleteUser={deleteUser} editUser={editUser} />,
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
