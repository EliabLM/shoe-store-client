/* eslint-disable react/prop-types */
// react-router-dom components
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// @mui material components
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

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
import { format, parse } from 'date-fns';
import SaleActionCell from './components/SaleActionCell';
import { Grid } from '@mui/material';
import SoftInput from 'components/SoftInput';
import ProductDetail from './components/ProductDetail';
import { convertNumberToCurrency } from 'utils/formatNumber';

const SALE_STATUS = {
  CANCELADA: 'error',
  PAGADA: 'success',
  PENDIENTE: 'warning',
};

const columns = [
  // {
  //   Header: 'ID',
  //   accessor: 'id',
  // },
  {
    Header: 'Vendedor',
    accessor: 'user.names',
  },
  {
    Header: 'Local',
    accessor: 'sale_location.name',
  },
  {
    Header: 'Fecha',
    accessor: 'registration_date',
    Cell: ({ value }) => {
      // eslint-disable-next-line quotes
      const date = parse(value?.split('T')?.[0], 'yyyy-MM-dd', new Date());
      return format(date, 'dd/MM/yyyy');
    },
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: ({ value }) => convertNumberToCurrency(value),
  },
  {
    Header: 'No. productos',
    accessor: 'sale_detail',
    Cell: ({ value }) => {
      return value.map((item) => item.amount).reduce((a, b) => a + b, 0);
    },
  },
  {
    Header: 'Estado',
    accessor: 'sale_status',
    Cell: ({ value }) => (
      <SoftBadge badgeContent={value} color={SALE_STATUS[value]} variant="contained" />
    ),
  },
  {
    Header: 'Opciones',
    accessor: 'options',
  },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

function Sales() {
  const { data, isLoading } = useSales();

  const [dataTable, setDataTable] = useState({ columns, rows: [] });
  const [showSaleDetail, setShowSaleDetail] = useState(false);
  const [saleDetail, setSaleDetail] = useState(null);

  const toggleShowSaleDetail = () => setShowSaleDetail((prevState) => !prevState);

  const handleOpenShowSaleDetail = (saleItem) => {
    setSaleDetail(saleItem);
    toggleShowSaleDetail();
  };

  const handleCloseShowSaleDetail = () => {
    setSaleDetail(null);
    toggleShowSaleDetail();
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

    const sales = data?.data?.map((item) => ({
      ...item,
      options: <SaleActionCell toggle={() => handleOpenShowSaleDetail(item)} />,
    }));

    setDataTable((prevState) => ({ ...prevState, rows: sales || [] }));
  }, [data]);

  const numberOfProducts = useMemo(() => {
    if (!saleDetail) return 0;

    return saleDetail.sale_detail?.map((item) => item.amount).reduce((a, b) => a + b, 0);
  }, [saleDetail]);

  const registrationDate = useMemo(() => {
    if (!saleDetail) return null;

    // eslint-disable-next-line quotes
    const date = parse(saleDetail.registration_date, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date());
    return format(date, 'dd/MM/yyyy');
  }, [saleDetail]);

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

      {/* Sale detail modal */}
      <Modal
        open={showSaleDetail}
        onClose={handleCloseShowSaleDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={modalStyle}>
          <Grid container columnSpacing={3} rowSpacing={2}>
            <Grid item xs={12}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h4" fontWeight="medium">
                  Detalle
                </SoftTypography>
              </SoftBox>
            </Grid>

            <Grid item xs={12}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Id:{' '}
                    <SoftTypography
                      component="span"
                      variant="caption"
                      color="dark"
                      fontSize="1rem"
                      fontWeight="SemiBold"
                    >
                      {saleDetail?.id}
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Vendedor
                  </SoftTypography>
                </SoftBox>

                <SoftInput
                  value={`${saleDetail?.user?.code} - ${saleDetail?.user?.names}`}
                  readOnly
                />
              </SoftBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Local
                  </SoftTypography>
                </SoftBox>

                <SoftInput value={saleDetail?.sale_location?.name} readOnly />
              </SoftBox>
            </Grid>

            <Grid item container rowSpacing={2} columnSpacing={3} xs={12}>
              {saleDetail?.sale_detail?.map((item, index) => (
                <Grid item xs={12} md={6} lg={4} key={`${index} - ${item._id}`}>
                  <ProductDetail item={item} />
                </Grid>
              ))}
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Método de pago
                  </SoftTypography>
                </SoftBox>

                <SoftInput value={saleDetail?.payment_method?.name} readOnly />
              </SoftBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Estado
                  </SoftTypography>
                </SoftBox>

                <SoftInput value={saleDetail?.sale_status} readOnly />
              </SoftBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Fecha de registro
                  </SoftTypography>
                </SoftBox>

                <SoftInput value={registrationDate} readOnly />
              </SoftBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    No. de productos
                  </SoftTypography>
                </SoftBox>

                <SoftInput value={numberOfProducts} readOnly />
              </SoftBox>
            </Grid>

            <Grid item xs={12} md={6}>
              <SoftBox>
                <SoftBox display="flex" alignItems="center" mb={1}>
                  <SoftTypography
                    component="label"
                    variant="caption"
                    color="dark"
                    fontSize="1rem"
                    fontWeight="bold"
                  >
                    Total
                  </SoftTypography>
                </SoftBox>

                <SoftInput value={convertNumberToCurrency(saleDetail?.total)} readOnly />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}

export default Sales;
