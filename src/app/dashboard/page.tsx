'use client';

import { useSoftUI } from '@/hooks/useSoftUI';
import { Box, Button, Typography } from '@mui/material';

const Dashboard = () => {
  const { fixedNavbar, setFixedNavbar } = useSoftUI();

  return (
    <Box>
      <Typography>Dashboard: {fixedNavbar ? 'Fixed' : 'No Fixed'}</Typography>
      <Button onClick={() => setFixedNavbar(!fixedNavbar)}>Set</Button>
    </Box>
  );
};

export default Dashboard;
