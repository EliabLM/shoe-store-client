import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

function CreditorsActionsCell({ item, deleteCreditor, editCreditor }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mx={2}>
        <SoftTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: 'pointer', lineHeight: 0 }}
          onClick={() => editCreditor(item)}
        >
          <Tooltip title="Editar" placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftTypography
        variant="body1"
        color="secondary"
        sx={{ cursor: 'pointer', lineHeight: 0 }}
        onClick={() => deleteCreditor(item)}
      >
        <Tooltip title="Deshabilitar" placement="left">
          <Icon>not_interested</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

export default CreditorsActionsCell;

CreditorsActionsCell.propTypes = {
  item: PropTypes.object,
  deleteCreditor: PropTypes.func,
  editCreditor: PropTypes.func,
};
