// import { useState } from 'react';

// react-router-dom components
// import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
// import Switch from '@mui/material/Switch';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';

// Authentication layout components
// import Socials from 'layouts/authentication/components/Socials';
import SignInLayout from 'examples/LayoutContainers/SignInLayout/SignInLayout';

function SignIn() {
  //   const [rememberMe, setRememberMe] = useState(false);

  //   const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <SignInLayout>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Iniciar sesión
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        <SoftBox px={3} pb={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" />
            </SoftBox>
            {/* <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none' }}
              >
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox> */}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth>
                Ingresar
              </SoftButton>
            </SoftBox>
            {/* <Separator /> */}
            {/* <SoftBox mt={1} mb={3}>
              <SoftButton
                component={Link}
                to="/authentication/sign-up/basic"
                variant="gradient"
                color="dark"
                fullWidth
              >
                sign up
              </SoftButton>
            </SoftBox> */}
          </SoftBox>
        </SoftBox>
      </Card>
    </SignInLayout>
  );
}

export default SignIn;
