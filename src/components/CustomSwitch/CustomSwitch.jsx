import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';
import { Switch } from '@mui/material';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

const CustomSwitch = ({ control, name, label, tooltip, labelOptions, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <SoftBox>
          {label && (
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
          )}

          <SoftBox display="flex" alignItems="center" gap={1}>
            <Switch checked={value || false} onChange={onChange} {...rest} />
            <SoftTypography variant="button">
              {value ? labelOptions.active : labelOptions.inactive}
            </SoftTypography>
          </SoftBox>
          {error && (
            <SoftBox mt={0.75}>
              <SoftTypography component="div" variant="caption" color="error">
                {error?.message || error?.label?.message || error?.value?.message}
              </SoftTypography>
            </SoftBox>
          )}
        </SoftBox>
      )}
    />
  );
};

export default CustomSwitch;

CustomSwitch.defaultProps = {
  labelOptions: {
    active: 'Activo',
    inactive: 'Inactivo',
  },
};

CustomSwitch.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.any,
  tooltip: PropTypes.string,
  control: PropTypes.any,
  name: PropTypes.string,
  labelOptions: PropTypes.object,
};
