'use client';

import { useSoftUI } from '@/hooks/useSoftUI';
import { Box, Button, Typography } from '@mui/material';

const Prueba = () => {
  const { fixedNavbar, setFixedNavbar } = useSoftUI();

  return (
    <Box>
      <Typography>
        Shoe store app2: {fixedNavbar ? 'Fixed' : 'No Fixed'}
      </Typography>
      <Button onClick={() => setFixedNavbar(!fixedNavbar)}>Set</Button>
    </Box>
  );
};

export default Prueba;
