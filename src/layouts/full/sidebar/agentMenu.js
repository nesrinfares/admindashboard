import {
    IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
  } from '@tabler/icons';
  
  import { uniqueId } from 'lodash';
  const test = JSON.parse(localStorage.getItem("user"));
  
  const MenuitemsAgent = [
  
    {
      navlabel: true,
      subheader: 'Home '+test["role"],
    },
  
    {
      id: uniqueId(),
      title: 'Tableau de bord',
      icon: IconLayoutDashboard,
      href: '/dashboard',
    },
    {
      navlabel: true,
      subheader: 'Gestion',
    },
    {
      id: uniqueId(),
      title: 'Commandes',
      icon: IconTypography,
      href: '/ui/commande',
    },
   
    {
      navlabel: true,
      subheader: 'Auth',
    },
    {
      id: uniqueId(),
      title: 'Déconnexion',
      icon: IconLogin,
      href: '/auth/login',
    },
   /* {
      id: uniqueId(),
      title: 'Register',
      icon: IconUserPlus,
      href: '/auth/register',
    },
    
    {
      navlabel: true,
      subheader: 'Extra',
    },
    {
      id: uniqueId(),
      title: 'Icons',
      icon: IconMoodHappy,
      href: '/icons',
    },
    {
      id: uniqueId(),
      title: 'Sample Page',
      icon: IconAperture,
      href: '/sample-page',
    },*/
  ];
     
  export default MenuitemsAgent;
  