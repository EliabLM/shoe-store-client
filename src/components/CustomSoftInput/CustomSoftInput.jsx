import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';

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

const CustomSoftInput = ({ register, name, label, errors, tooltip, ...rest }) => {
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

      <SoftInput fullWidth error={errors && !!errors[name]} {...register(name)} {...rest} />
      {errors && formValidation(errors, name)}
    </SoftBox>
  );
};

export default CustomSoftInput;

CustomSoftInput.propTypes = {
  register: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.any,
  tooltip: PropTypes.string,
};
