// @mui material components
import Grid from '@mui/material/Grid';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';

// Soft UI Dashboard PRO React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard';
import Footer from 'examples/Footer';

// Overview page components
import Header from './Header';

// Hooks
import { useAuth } from 'hooks/useAuth';

function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Header names={user?.names} role={user?.role} />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="Información perfil"
              info={{
                ID: user?.id,
                Código: user?.code,
                Correo: user?.email,
                Local: user?.location?.name,
              }}
            />
          </Grid>
        </Grid>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
