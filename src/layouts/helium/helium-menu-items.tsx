import { routes } from '@/config/routes';
import {
  PiBriefcaseDuotone,
  PiAirplaneTiltDuotone,
  PiKanban,
  PiFilmReel,
  PiMagnifyingGlass,
  PiFire,
  PiNewspaper,
  PiPerson,
  PiArticle,
  PiFileText,
} from 'react-icons/pi';
import { MdOutlineWeb } from 'react-icons/md';
import { BiHome, BiMailSend } from 'react-icons/bi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Home',
    href: '/',
    icon: <BiHome />,
  },
  {
    name: 'About',
    href: '/about',
    icon: <PiPerson />,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: <PiBriefcaseDuotone />,
  },
  {
    name: 'Articles',
    href: '/articles',
    icon: <PiArticle />,
  },
  {
    name: 'Resume',
    href: '/resume',
    icon: <PiFileText />,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: <BiMailSend />,
  },
  // label start
  {
    name: 'Live Demos',
  },
  // label end
  {
    name: 'Movies',
    href: routes.movies.dashboard,
    icon: <PiFilmReel />,
  },
  {
    name: 'AI Search',
    href: '/ai-search',
    icon: <PiMagnifyingGlass />,
    badge: 'NEW',
  },
  {
    name: 'Awesome UI',
    href: '/awesome-ui',
    icon: <PiFire />,
  },
  {
    name: 'Blog Platform',
    href: '/blog-generator',
    icon: <PiNewspaper />,
  },
  {
    name: 'Kanban',
    href: routes.kanban.dashboard,
    icon: <PiKanban />,
  },
  {
    name: 'Flight Booking',
    href: routes.searchAndFilter.flight,
    icon: <PiAirplaneTiltDuotone />,
  },
  {
    name: 'Dashboards',
    href: '#',
    icon: <MdOutlineWeb />,
    dropdownItems: [
      {
        name: 'File Manager',
        href: '/file',
      },
      {
        name: 'Appointment',
        href: routes.appointment.dashboard,
      },
      {
        name: 'Executive',
        href: routes.executive.dashboard,
      },
      {
        name: 'Job Board',
        href: routes.jobBoard.dashboard,
      },
      {
        name: 'Financial',
        href: routes.financial.dashboard,
      },
      {
        name: 'Logistics',
        href: routes.logistics.dashboard,
      },
      {
        name: 'Analytics',
        href: routes.analytics,
      },
    ],
  },
];
