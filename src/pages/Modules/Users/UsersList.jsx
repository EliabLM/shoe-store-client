/* eslint-disable react/prop-types */
// react-router-dom components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// Utils
import { sleep } from 'utils/sleep';
import UsersActionsCell from './components/UsersActionCell';

const ENUM_ROLES = {
  superadmin: 'Super administrador',
  admin: 'Administrador',
  vendedor: 'Vendedor',
};

const USERS = [
  {
    id: 1,
    nombre: 'Eliab López',
    email: 'eliablopez@hotmail.com',
    rol: 'superadmin',
    local: 'LOCAL1',
  },
  {
    id: 2,
    nombre: 'Ismael López',
    email: 'lopezmurillo@hotmail.com',
    rol: 'superadmin',
    local: 'LOCAL1',
  },
  {
    id: 3,
    nombre: 'Alexander López',
    email: 'alexanderlopez@hotmail.com',
    rol: 'admin',
    local: 'LOCAL3',
  },
  {
    id: 4,
    nombre: 'Vendedores 1',
    email: 'vendedor@hotmail.com',
    rol: 'vendedor',
    local: 'LOCAL2',
  },
];

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
    Header: 'Opciones',
    accessor: 'options',
  },
];

function UsersList() {
  const [dataTable, setDataTable] = useState({ columns, rows: [] });
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (item) => {
    console.log('🚀 ~ deleteUser ~ item:', item);
  };

  const getData = async () => {
    try {
      setIsLoading(true);

      await sleep(2);

      const users = USERS.map((item) => ({
        ...item,
        options: <UsersActionsCell item={item} deleteUser={deleteUser} />,
      }));

      setDataTable((prevState) => ({ ...prevState, rows: users }));
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                Usuarios
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography>
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
