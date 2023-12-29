import PropTypes from 'prop-types';

// @mui material components
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { useState } from 'react';

function UsersActionsCell({ item, toggleUserState, editUser }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUserState = async () => {
    try {
      setIsLoading(true);
      await toggleUserState(item);
    } catch (error) {
      console.error('🚀 ~ handleUserState ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        onClick={isLoading ? undefined : handleUserState}
      >
        <Tooltip title={item?.active ? 'Deshabilitar' : 'Habilitar'} placement="left">
          {isLoading ? (
            <CircularProgress color="dark" size={18} />
          ) : (
            <Icon>{item?.active ? 'not_interested' : 'done'}</Icon>
          )}
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

export default UsersActionsCell;

UsersActionsCell.propTypes = {
  item: PropTypes.object,
  toggleUserState: PropTypes.func,
  editUser: PropTypes.func,
  isLoading: PropTypes.bool,
};
