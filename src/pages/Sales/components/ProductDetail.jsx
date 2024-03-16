/* eslint-disable react/prop-types */
import { useMemo } from 'react';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Utils
import { convertNumberToCurrency } from 'utils/formatNumber';

function ProductDetail({ item }) {
  const productName = useMemo(() => {
    return `${item?.product?.brand?.name} ${item?.product?.name}`.toUpperCase();
  }, [item]);

  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      height="100%"
      p={3}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
            {productName}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Cantidad:&nbsp;&nbsp;&nbsp;
            <SoftTypography
              alignItems="center"
              variant="caption"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {item?.amount}{' '}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Unidad:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {convertNumberToCurrency(item?.price)}
            </SoftTypography>
          </SoftTypography>
        </SoftBox> */}
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Subtotal:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {convertNumberToCurrency(item?.subtotal)}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="caption" color="text">
          Código:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {item?.product?.product_id}
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export default ProductDetail;
