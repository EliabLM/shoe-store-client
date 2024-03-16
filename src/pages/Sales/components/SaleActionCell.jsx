/* eslint-disable react/prop-types */

// @mui material components
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

function SaleActionCell({ toggle }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: 'pointer', lineHeight: 0 }}
        onClick={toggle}
      >
        <Tooltip title="Detalle" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

export default SaleActionCell;
