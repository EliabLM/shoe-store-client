/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui material components
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import CustomSoftInput from 'components/CustomSoftInput/CustomSoftInput';
import CustomPasswordInput from 'components/CustomPasswordInput/CustomPasswordInput';

// Authentication layout components
import SignInLayout from 'examples/LayoutContainers/SignInLayout/SignInLayout';

// Hooks
import { useAuth } from 'hooks/useAuth';
import { signInSchema } from './signIn.schema';

// Services
import { useUsersService } from 'services/useUsersService';

function SignIn() {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const { login } = useUsersService();

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

      const body = {
        code: data.code?.toUpperCase(),
        password: data.password,
      };

      const response = await login({ body });

      if (response.statusCode !== 200) {
        return Swal.fire({
          icon: 'error',
          text: response.message || 'Ha ocurrido un error en el ingreso, intente nuevamente.',
        });
      }

      setUser({ user: response.data });

      switch (user?.role) {
        case 'superadmin':
          navigate('/dashboards/ventas');
          break;

        case 'admin':
          navigate('/ventas/listado');
          break;

        case 'vendedor':
          navigate('/ventas/listado');
          break;

        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (user?.role) {
      case 'superadmin':
        navigate('/dashboards/ventas');
        break;

      case 'admin':
        navigate('/ventas/listado');
        break;

      case 'vendedor':
        navigate('/ventas/listado');
        break;

      default:
        navigate('/');
        break;
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

        <SoftBox px={3} pb={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <SoftBox mb={2}>
              <CustomSoftInput
                label="Código"
                name="code"
                placeholder="CÓDIGO"
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
          </SoftBox>
        </SoftBox>
      </Card>
    </SignInLayout>
  );
}

export default SignIn;
