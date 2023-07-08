import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// react-router-dom components
// import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
// import Switch from '@mui/material/Switch';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';

// Authentication layout components
// import Socials from 'layouts/authentication/components/Socials';
import SignInLayout from 'examples/LayoutContainers/SignInLayout/SignInLayout';

// Utils
import { sleep } from 'utils/sleep';

function SignIn() {
  const navigate = useNavigate();
  //   const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    // resolver: yupResolver
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      await sleep(2);
      console.log('🚀 ~ onSubmit ~ data:', data);
      navigate('/dashboards/default');
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignInLayout>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="bold" color="dark">
            Iniciar sesión
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
        <SoftBox px={3} pb={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <SoftBox mb={2}>
              <CustomSoftInput
                label="Usuario"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                register={register}
                errors={errors}
                disabled={isLoading}
                required
              />
            </SoftBox>
            <SoftBox mb={2}>
              <CustomSoftInput
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Contraseña"
                register={register}
                errors={errors}
                disabled={isLoading}
                required
              />
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
            <SoftBox mt={4} mb={1} display="flex" justifyContent="center">
              <SoftButton
                type="submit"
                variant="gradient"
                color="dark"
                disabled={isLoading}
                fullWidth={!isLoading}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="white" />
                  </>
                ) : (
                  'Ingresar'
                )}
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
