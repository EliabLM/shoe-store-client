import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';

const CustomCurrencyInput = ({ control, name, label, tooltip, ...rest }) => {
  const handleChange = (value, onChange) => {
    let newValue = `${value.target.value}`;
    newValue = newValue.replace(/\D/g, '');
    newValue = newValue.replace(/(\d)(\d{3})$/, '$1.$2');
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.');
    newValue = newValue.replace('', '$ ');

    if (newValue === '$ ') newValue = '';
    value.target.value = newValue;
    onChange(value);
  };

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

          <SoftInput
            fullWidth
            value={value || ''}
            onChange={(val) => handleChange(val, onChange)}
            error={error}
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

export default CustomCurrencyInput;

CustomCurrencyInput.propTypes = {
  label: PropTypes.string,
  tooltip: PropTypes.string,
  control: PropTypes.any,
  name: PropTypes.string,
};
