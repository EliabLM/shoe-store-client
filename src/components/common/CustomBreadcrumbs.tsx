import Link from 'next/link';

import { Breadcrumbs, Box, Typography } from '@mui/material';

import { colors } from '@/assets/theme/base/colors';

interface Props {
  icon: React.ReactNode;
  title: string;
  route: string[];
  light?: boolean;
}

export const CustomBreadcrumbs = ({ icon, title, route, light }: Props) => {
  const { white } = colors;
  const routes = route.slice(0, -1);

  return (
    <Box mr={{ xs: 0, xl: 8 }}>
      <Breadcrumbs
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link href={'/'}>
          <Typography
            component={'span'}
            variant='body2'
            fontWeight={'regular'}
            color={light ? 'white' : 'darkgray'}
            mb={0}
            sx={{ opacity: light ? 0.8 : 0.5, lineHeight: 0 }}
          >
            {icon}
          </Typography>
        </Link>

        {routes.map((path) => (
          <Link href={`/${path}`} key={path}>
            <Typography
              component='span'
              variant='button'
              fontWeight='regular'
              textTransform='capitalize'
              color={light ? 'white' : 'darkgray'}
              sx={{ opacity: light ? 0.8 : 0.5, lineHeight: 0 }}
            >
              {path}
            </Typography>
          </Link>
        ))}

        <Typography
          variant='button'
          fontWeight='regular'
          textTransform='capitalize'
          color={light ? 'white' : 'darkgray'}
          sx={{ lineHeight: 0 }}
        >
          {title.replace('-', ' ')}
        </Typography>
      </Breadcrumbs>

      <Typography
        fontWeight='bold'
        textTransform='capitalize'
        variant='h6'
        color={light ? 'white' : 'dark'}
        noWrap
      >
        {title.replace('-', ' ')}
      </Typography>
    </Box>
  );
};
