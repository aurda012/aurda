import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiHouseLineDuotone,
  PiAirplaneTiltDuotone,
  PiFolderDuotone,
  PiCaretCircleUpDownDuotone,
  PiListNumbersDuotone,
  PiCoinDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
  PiKanban,
  PiFilmReel,
  PiNewspaper,
  PiFire,
  PiMagnifyingGlass,
  PiPerson,
  PiArticle,
  PiFileText,
} from 'react-icons/pi';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { MdOutlineWeb } from 'react-icons/md';
import { BiHome, BiMailSend } from 'react-icons/bi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Home',
    href: '/',
    icon: BiHome,
    shortcut: {
      modifiers: 'alt',
      key: '1',
    },
  },
  {
    name: 'About',
    href: '/about',
    icon: PiPerson,
    shortcut: {
      modifiers: 'alt',
      key: '2',
    },
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: PiBriefcaseDuotone,
    shortcut: {
      modifiers: 'alt',
      key: '3',
    },
  },
  {
    name: 'Articles',
    href: routes.logistics.dashboard,
    icon: PiArticle,
    shortcut: {
      modifiers: 'alt',
      key: '4',
    },
  },
  {
    name: 'Resume',
    href: routes.eCommerce.dashboard,
    icon: PiFileText,
    shortcut: {
      modifiers: 'alt',
      key: '5',
    },
  },
  {
    name: 'Contact',
    href: routes.analytics,
    icon: BiMailSend,
    shortcut: {
      modifiers: 'alt',
      key: '6',
    },
  },
  // label start
  {
    name: 'Live Demos',
  },
  // label end
  {
    name: 'Movies',
    href: routes.movies.dashboard,
    icon: PiFilmReel,
  },
  {
    name: 'AI Search',
    href: '/ai-search',
    icon: PiMagnifyingGlass,
    badge: 'NEW',
  },
  {
    name: 'Awesome UI',
    href: '/awesome-ui',
    icon: PiFire,
  },
  {
    name: 'Blog Platform',
    href: '/blog-generator',
    icon: PiNewspaper,
  },
  {
    name: 'Kanban',
    href: routes.kanban.dashboard,
    icon: PiKanban,
  },
  {
    name: 'Flight Booking',
    href: routes.searchAndFilter.flight,
    icon: PiAirplaneTiltDuotone,
  },
  {
    name: 'Dashboards',
    href: '#',
    icon: MdOutlineWeb,
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
