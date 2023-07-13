import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

function UsersActionsCell({ item, deleteUser, editUser }) {
  return (
    <SoftBox display="flex" alignItems="center">
      {/* <SoftTypography variant="body1" color="secondary" sx={{ cursor: 'pointer', lineHeight: 0 }}>
        <Tooltip title="Preview product" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </SoftTypography> */}
      <SoftBox mx={2}>
        <SoftTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: 'pointer', lineHeight: 0 }}
          onClick={() => editUser(item)}
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
        onClick={() => deleteUser(item)}
      >
        <Tooltip title="Deshabilitar" placement="left">
          <Icon>not_interested</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

export default UsersActionsCell;

UsersActionsCell.propTypes = {
  item: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
};
