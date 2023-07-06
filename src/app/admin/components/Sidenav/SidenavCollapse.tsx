import { MouseEventHandler } from 'react';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box } from '@mui/material';
import { colors } from '@/assets/theme/base/colors';

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
} from './styles/sidenavCollapseStyles';
import { useSoftUI } from '@/hooks/useSoftUI';

interface Props {
  icon: string;
  name: string;
  children?: React.ReactNode;
  active: boolean;
  open: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function SidenavCollapse({
  icon,
  name,
  children,
  active,
  open,
  onClick,
  ...rest
}: Props) {
  const { miniSidenav, transparentSidenav, sidenavColor } = useSoftUI();

  return (
    <>
      <ListItem component='li'>
        <Box
          onClick={onClick}
          {...rest}
          sx={(theme) => collapseItem(theme, { active, transparentSidenav })}
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, {
                active,
                transparentSidenav,
                sidenavColor,
              })
            }
          >
            {typeof icon === 'string' ? (
              <Icon sx={() => collapseIcon({ colors }, { active })}>
                {icon}
              </Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, { miniSidenav, transparentSidenav, active })
            }
          />

          <ExpandLessIcon sx={(theme) => collapseArrow(theme, { open })} />
        </Box>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

export default SidenavCollapse;
