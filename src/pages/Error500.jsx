// react-router-dom components
import { useNavigate } from 'react-router-dom';

// @mui material components
import Grid from '@mui/material/Grid';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';

// Soft UI Dashboard PRO React example components
import PageLayout from 'examples/LayoutContainers/PageLayout';

// Soft UI Dashboard PRO React base styles
import typography from 'assets/theme/base/typography';

// Authentication layout components
import SignInFooter from 'examples/Footer/SignInFooter';

// Images
import error500 from 'assets/images/illustrations/error-500.png';

// Hooks
import { useAuth } from 'hooks/useAuth';

function Error500() {
  const { d1, d3, d4, d5 } = typography;

  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <PageLayout white>
      <SoftBox>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item xs={11} sm={9} container alignItems="center">
            <Grid item xs={12} lg={5}>
              <SoftBox
                fontSize={{ xs: d5.fontSize, sm: d4.fontSize, md: d3.fontSize, lg: d1.fontSize }}
                lineHeight={1.2}
              >
                <SoftTypography variant="inherit" color="warning" textGradient fontWeight="bold">
                  Error 500
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h2" color="text" fontWeight="bold">
                Algo anda mal con esta ruta
              </SoftTypography>
              <SoftBox mt={1} mb={2}>
                <SoftTypography variant="body1" color="text" opacity={0.6}>
                  Te sugerimos volver a la página anterior
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={4} mb={2}>
                <SoftButton
                  onClick={() => {
                    navigate(-1);
                    logout();
                  }}
                  variant="gradient"
                  color="warning"
                >
                  Volver
                </SoftButton>
              </SoftBox>
            </Grid>
            <Grid item xs={12} lg={7}>
              <SoftBox component="img" src={error500} alt="error-404" width="100%" />
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
      <SignInFooter />
    </PageLayout>
  );
}

export default Error500;
