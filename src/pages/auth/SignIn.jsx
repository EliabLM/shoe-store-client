import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui material components
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';
import CustomPasswordInput from 'components/CustomPasswordInput/CustomPasswordInput';

// Authentication layout components
import SignInLayout from 'examples/LayoutContainers/SignInLayout/SignInLayout';

// Utils
import { sleep } from 'utils/sleep';

// Hooks
import { useAuth } from 'hooks/useAuth';
import { signInSchema } from './signIn.schema';

function SignIn() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'firstError',
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      await sleep(2);

      const user = {
        nombre: 'Eliab López',
        email: 'eliablopez@hotmail.com',
        rol: 'superadmin',
        local: 'LOCAL1',
        activo: true,
      };

      setUser({ user });

      navigate('/dashboards/ventas');
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboards/ventas');
    }
  }, [user]);

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
              <CustomPasswordInput
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
                fullWidth
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
