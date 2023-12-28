import React from 'react';
import Menuitems from './MenuItems';
import MenuitemsAgent from './agentMenu';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const test = JSON.parse(localStorage.getItem('user'));

  return (
    <Box sx={{ px: 3 }}>
      {test['role'] === 'admin' ? (
        <List sx={{ pt: 0 }} className="sidebarNav">
          {Menuitems.map((item) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} key={item.subheader} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            }
          })}
        </List>
      ) : (
        <List sx={{ pt: 0 }} className="sidebarNav">
          {MenuitemsAgent.map((item) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} key={item.subheader} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else {
              return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
            }
          })}
        </List>
      )}
    </Box>
  );
};
export default SidebarItems;
