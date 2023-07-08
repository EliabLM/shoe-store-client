// @mui material components
import Grid from '@mui/material/Grid';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

function SignInFooter() {
  return (
    <SoftBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8} sx={{ textAlign: 'center' }}>
          <SoftTypography variant="body2" color="secondary">
            Copyright &copy; {new Date().getFullYear()} Eliab López.
          </SoftTypography>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default SignInFooter;
