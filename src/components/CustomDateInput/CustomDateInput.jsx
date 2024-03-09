import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import styled from '@emotion/styled';
import HelpIcon from '@mui/icons-material/Help';

// Components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

const BORDER_COLOR = {
  error: '#fd5c70',
  success: '#66d432',
  default: '#d2d6da',
};

const CustomDateInput = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  isDirty,
  readOnly,
  tooltip,
  min,
  max,
  ...rest
}) => {
  const [inputStatus, setInputStatus] = useState('default');

  useEffect(() => {
    if (error) return setInputStatus('error');
    if (isDirty && !error) return setInputStatus('success');

    setInputStatus('default');
  }, [isDirty, error]);

  return (
    <SoftBox>
      <SoftBox display="flex" alignItems="center" mb={1}>
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

      <Input
        border={BORDER_COLOR[inputStatus]}
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        onBlur={onBlur}
        disabled={disabled}
        min={min}
        max={max}
        pattern="\d{4}-\d{2}-\d{2}"
        {...rest}
      />

      {error && (
        <SoftBox mt={0.75}>
          <SoftTypography component="div" variant="caption" color="error">
            {error?.message}
          </SoftTypography>
        </SoftBox>
      )}
    </SoftBox>
  );
};

export default CustomDateInput;

CustomDateInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.date]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  isDirty: PropTypes.bool,
  readOnly: PropTypes.bool,
  tooltip: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
};

const Input = styled.input`
  min-height: 2.5rem;
  width: 100%;
  padding: 0 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  margin: 0;
  flex: 1;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: ${(props) => (props.disabled ? '#ECECEC' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#BEBEBE' : '#495057')};
  border: 0.0625rem solid ${(props) => props.border};

  &:focus {
    box-shadow: 0rem 0rem 0rem 0.125rem ${(props) => props.border};
    outline: 0;
  }

  @media (max-width: 375px) {
    padding: 0 0.5rem;
  }

  ::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
