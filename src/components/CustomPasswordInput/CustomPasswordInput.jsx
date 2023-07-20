import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import { Icon, IconButton } from '@mui/material';

const formValidation = (errors, errorKey) => {
  return errors[errorKey] ? (
    <SoftBox mt={0.75}>
      <SoftTypography component="div" variant="caption" color="error">
        {errors[errorKey]?.message}
      </SoftTypography>
    </SoftBox>
  ) : (
    ''
  );
};

const CustomPasswordInput = ({ register, name, label, errors, tooltip, type, ...rest }) => {
  const [visibilityIcon, setVisibilityIcon] = useState(false);
  const toggleVisibilityIcon = () => setVisibilityIcon((prevState) => !prevState);

  return (
    <SoftBox>
      <SoftBox display="flex" alignItems="center" gap={1} mb={1}>
        <SoftTypography
          component="label"
          variant="caption"
          color="dark"
          fontSize="1rem"
          fontWeight="bold"
        >
          {label}{' '}
          {tooltip && (
            <Tooltip title={tooltip} arrow>
              <HelpIcon fontSize="small" />
            </Tooltip>
          )}
        </SoftTypography>
      </SoftBox>

      <SoftInput
        type={visibilityIcon ? 'text' : 'password'}
        fullWidth
        {...register(name)}
        error={errors && !!errors[name]}
        icon={
          type === 'password' && {
            component: (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: errors && !!errors[name] ? '57%' : '60%',
                  right: { xs: '8%', xxl: '6%' },
                  cursor: 'pointer',
                  color: errors && !!errors[name] ? 'rgba(234,6,6,0.7)' : '#344767',
                  opacity: '0.6',
                }}
                onClick={toggleVisibilityIcon}
              >
                <Icon>{visibilityIcon ? 'visibility_icon' : 'visibility_off_icon'}</Icon>
              </IconButton>
            ),
            direction: 'right',
          }
        }
        {...rest}
      />
      {errors && formValidation(errors, name)}
    </SoftBox>
  );
};

export default CustomPasswordInput;

CustomPasswordInput.propTypes = {
  register: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.any,
  tooltip: PropTypes.string,
  type: PropTypes.string,
};
