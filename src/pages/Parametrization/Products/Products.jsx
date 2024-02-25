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
import ProductActionCell from './components/ProductActionCell';

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// hooks
import { useProducts } from 'hooks/useProducts';
import { useProductsService } from 'services/useProductsService';
import { validateResponse } from 'utils/validateResponse';

const columns = [
  {
    Header: 'Código',
    accessor: 'product_id',
  },
  {
    Header: 'Marca',
    accessor: 'brand.name',
  },
  {
    Header: 'Nombre',
    accessor: 'name',
  },
  {
    Header: 'Cantidad',
    accessor: 'stock',
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

function Products() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useProducts();
  const { updateProductState } = useProductsService();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

  const editProduct = async (product) => {
    navigate('/parametrizacion/editar-producto', { state: product });
  };

  const toggleProductState = async (item) => {
    const response = await updateProductState({ productId: item._id, active: !item.active });
    validateResponse(response, 'Ha ocurrido un error actualizando el estado del producto');
    refetch();
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

    const products = data?.data?.map((item) => ({
      ...item,
      options: (
        <ProductActionCell
          item={item}
          editProduct={editProduct}
          toggleProductState={toggleProductState}
        />
      ),
    }));

    setDataTable((prevState) => ({ ...prevState, rows: products || [] }));
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
                Productos
              </SoftTypography>
              {/* <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography> */}
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/parametrizacion/nuevo-producto">
                <SoftButton variant="gradient" color="dark" size="small">
                  + Nuevo producto
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

export default Products;
