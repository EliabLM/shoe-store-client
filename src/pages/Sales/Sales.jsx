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
import { useSales } from 'hooks/useSales';

const SALE_STATUS = {
  CANCELADA: 'error',
  PAGADA: 'success',
  PENDIENTE: 'warning',
};

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    flex: 1,
  },
  {
    Header: 'Vendedor',
    accessor: 'user.names',
    flex: 2,
  },
  {
    Header: 'Local',
    accessor: 'sale_location.name',
    flex: 2,
  },
  {
    Header: 'Fecha',
    accessor: 'registration_date',
    flex: 2,
    Cell: ({ value }) => value?.split('T')?.[0],
  },
  {
    Header: 'Estado',
    accessor: 'sale_status',
    Cell: ({ value }) => (
      <SoftBadge badgeContent={value} color={SALE_STATUS[value]} variant="contained" />
    ),
    flex: 1,
  },
  {
    Header: 'Opciones',
    accessor: 'options',
    flex: 1,
  },
];

function Sales() {
  const navigate = useNavigate();
  const { data, isLoading } = useSales();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });

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

    const sales = data?.data?.map((item) => ({
      ...item,
      //   options: (
      //     <ProductActionCell
      //       item={item}
      //       editProduct={editProduct}
      //       toggleProductState={toggleProductState}
      //     />
      //   ),
    }));

    setDataTable((prevState) => ({ ...prevState, rows: sales || [] }));
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
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            p={3}
            gap={2}
          >
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h4" fontWeight="medium">
                Ventas
              </SoftTypography>
              {/* <SoftTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </SoftTypography> */}
            </SoftBox>
            <Stack spacing={1} direction="row">
              <Link to="/ventas/nueva-venta">
                <SoftButton variant="gradient" color="dark" size="small">
                  + Nueva venta
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

export default Sales;
