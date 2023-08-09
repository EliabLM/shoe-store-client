import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

function CreditsActionsCell({ item, updateCredit }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: 'pointer', lineHeight: 0 }}>
        <Tooltip title="Ver detalle" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </SoftTypography>
      <SoftBox mx={2}>
        <SoftTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: 'pointer', lineHeight: 0 }}
          onClick={() => updateCredit(item)}
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
        onClick={() => {}}
      >
        <Tooltip title="Deshabilitar" placement="left">
          <Icon>not_interested</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

export default CreditsActionsCell;

CreditsActionsCell.propTypes = {
  item: PropTypes.object,
  updateCredit: PropTypes.func,
};
