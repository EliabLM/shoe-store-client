import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftDatePicker from 'components/SoftDatePicker';

const CustomSoftDatePicker = ({ control, name, label, tooltip, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
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

          <SoftDatePicker
            value={value || ''}
            onChange={onChange}
            input={{ ...rest }}
            // input={{ value, onChange, error, ...rest }}
            {...rest}
          />
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

export default CustomSoftDatePicker;

CustomSoftDatePicker.propTypes = {
  label: PropTypes.string,
  tooltip: PropTypes.string,
  control: PropTypes.any,
  name: PropTypes.string,
};
