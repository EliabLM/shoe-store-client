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

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// hooks
import { useCategories } from 'hooks/useCategories';
import CategoriesActionCell from './components/CategoriesActionCell';

const columns = [
  {
    Header: 'Nombre',
    accessor: 'name',
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

function Categories() {
  const navigate = useNavigate();
  const { data, isLoading } = useCategories();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

  const editCategory = async (category) => {
    navigate('/parametrizacion/editar-categoria', { state: category });
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

    const categories = data?.data?.map((item) => ({
      ...item,
      options: <CategoriesActionCell item={item} editCategory={editCategory} />,
    }));

    setDataTable((prevState) => ({ ...prevState, rows: categories || [] }));
  }, [data]);

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
        <Card sx={{ overflow: 'visible' }}>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h4" fontWeight="medium">
                Categorías
              </SoftTypography>
              {/* <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography> */}
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/parametrizacion/nueva-categoria">
                <SoftButton variant="gradient" color="dark" size="small">
                  + Nueva categoría
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

export default Categories;
