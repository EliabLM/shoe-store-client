import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box } from '@mui/material';

import { useSoftUI } from '@/hooks/useSoftUI';
import { item, itemArrow, itemContent } from './styles/sidenavItemStyles';

interface Props {
  name: string;
  active: boolean;
  nested: boolean;
  children: React.ReactNode;
  open: boolean;
}

function SidenavItem({ name, active, nested, children, open, ...rest }: Props) {
  const { miniSidenav } = useSoftUI();

  return (
    <>
      <ListItem {...rest} component='li' sx={item}>
        <Box
          sx={(theme) =>
            itemContent(theme, { active, miniSidenav, name, nested })
          }
        >
          <ListItemText primary={name} />
          {children && (
            <ExpandLessIcon
              component='i'
              sx={(theme) => itemArrow(theme, { open, miniSidenav })}
            />
          )}
        </Box>
      </ListItem>
      {children && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

export default SidenavItem;
