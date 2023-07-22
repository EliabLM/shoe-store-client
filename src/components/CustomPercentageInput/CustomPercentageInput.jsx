import React from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';

const CustomPercentageInput = ({ control, name, label, tooltip, ...rest }) => {
  const handleInputChange = (value, onChange) => {
    let newValue = value.target.value;

    // Comprueba si se presionó la tecla "backspace"
    if (value.nativeEvent.inputType === 'deleteContentBackward') {
      // Verifica si el último carácter es el símbolo de porcentaje
      if (newValue.slice(-1) === '%') {
        newValue = newValue.slice(0, -1); // Elimina el último carácter
      }
    } else {
      newValue = newValue.replace(/[^0-9.]/g, '');

      newValue += '%';
    }

    value.target.value = newValue;
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
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
            error={Boolean(error)}
            value={value || ''}
            onChange={(val) => handleInputChange(val, onChange)}
            {...field}
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

export default CustomPercentageInput;

CustomPercentageInput.propTypes = {
  label: PropTypes.string,
  tooltip: PropTypes.string,
  control: PropTypes.any,
  name: PropTypes.string,
};
