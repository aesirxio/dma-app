import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';

const contentSubMenu = [
  {
    name: 'group management',
    text: 'txt_submenu_group_management',
    link: '/group-management',

  },
];


const mainMenu = [
  {
    name: 'home',
    text: 'txt_menu_calendar',
    link: '/',
    icons: '/assets/images/icon_calendar.svg',
    icons_color: '/assets/images/Calendar.svg',
  },
  {
    name: 'projects',
    text: 'txt_menu_projects',
    link: '/projects',
    icons: '/assets/images/Projects.svg',
    icons_color: '/assets/images/Projects.svg',
  },
  {
    name: 'campaigns',
    text: 'txt_menu_campaigns',
    link: '/campaigns',
    icons: '/assets/images/Campaigns.svg',
    icons_color: '/assets/images/Campaigns.svg',
  },
  {
    name: 'content',
    text: 'txt_menu_content',
    link: '/content',
    icons: '/assets/images/Content.svg',
    icons_color: '/assets/images/Content.svg',
    submenu: contentSubMenu,
  },
  {
    name: 'channels',
    text: 'txt_menu_channels',
    link: '/channels',
    icons: '/assets/images/Channels.svg',
    icons_color: '/assets/images/Channels.svg',
  },
  {
    name: 'digital',
    text: 'txt_menu_digital_assets',
    link: '/digital-assets',
    icons: '/assets/images/Digital-Assets.svg',
    icons_color: '/assets/images/Digital-Assets.svg',
  },
];

const settingMenu = [
  {
    name: 'profile',
    text: 'txt_menu_profile',
    link: '/profile',
    icons_fa: faUser,
  },
];
const settupMenu = [
  {
    name: 'settings',
    text: 'txt_settings',
    link: '/settings',
    icons_fa: faGear,
  },
];
const profileMenu = [
  {
    key: 1,
    text: 'txt_profile',
    link: '/profile',
  },
];

const integrationMenu = () =>
  mainMenu
  settupMenu
    .filter((item) => item.name !== 'digital')
    .map((item) => {
      item.link = '/dma' + item.link;
      return item;
    });
export { profileMenu, mainMenu, settingMenu,settupMenu ,integrationMenu };
