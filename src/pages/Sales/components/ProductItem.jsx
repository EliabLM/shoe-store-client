/* eslint-disable react/prop-types */

// @mui material components
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';

// Utils
import { convertCurrencyToNumber } from 'utils/formatNumber';
import { convertNumberToCurrency } from 'utils/formatNumber';

function ProductItem({ item, setSelectedProducts }) {
  const addOne = () => {
    setSelectedProducts((prevState) => {
      const newProducts = [...prevState];

      const product = newProducts.find((option) => option.id === item.id);

      if (product) {
        product.amount += 1;

        const subtotal = convertCurrencyToNumber(product.price) * product.amount;
        product.subtotal = convertNumberToCurrency(subtotal);

        return newProducts;
      } else {
        return prevState;
      }
    });
  };

  const removeOne = () => {
    setSelectedProducts((prevState) => {
      const newProducts = [...prevState];

      const product = newProducts.find((option) => option.id === item.id);

      if (product && product.amount > 1) {
        product.amount -= 1;

        const subtotal = convertCurrencyToNumber(product.price) * product.amount;
        product.subtotal = convertNumberToCurrency(subtotal);

        return newProducts;
      } else {
        return prevState;
      }
    });
  };

  const handleDelete = () => {
    setSelectedProducts((prevState) => prevState.filter((product) => product.id !== item.id));
  };

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
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
            {item?.name}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
              <SoftButton variant="text" color="error" onClick={handleDelete}>
                <Icon>delete</Icon>&nbsp;Eliminar
              </SoftButton>
            </SoftBox>
          </SoftBox>
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
              <SoftButton variant="text" color="dark" onClick={removeOne}>
                <Icon>remove_icon</Icon>
              </SoftButton>
              {item?.amount}{' '}
              <SoftButton variant="text" color="dark" onClick={addOne}>
                <Icon>add_icon</Icon>
              </SoftButton>
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Subtotal:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {item?.subtotal}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="caption" color="text">
          Código:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {item?.product_id}
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

export default ProductItem;
