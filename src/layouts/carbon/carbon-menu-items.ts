import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { IconType } from 'react-icons/lib';
import {
  PiAirplaneTiltDuotone,
  PiAppStoreLogoDuotone,
  PiBellSimpleRingingDuotone,
  PiBinocularsDuotone,
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiCardsDuotone,
  PiCaretCircleUpDownDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiChatCenteredDotsDuotone,
  PiCreditCardDuotone,
  PiCurrencyCircleDollarDuotone,
  PiCurrencyDollarDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiFeatherDuotone,
  PiFileImageDuotone,
  PiFolderLockDuotone,
  PiFolderDuotone,
  PiGridFourDuotone,
  PiHammerDuotone,
  PiHeadsetDuotone,
  PiHourglassSimpleDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiLockKeyDuotone,
  PiMagicWandDuotone,
  PiMapPinLineDuotone,
  PiNoteBlankDuotone,
  PiNotePencilDuotone,
  PiPackageDuotone,
  PiPokerChipDuotone,
  PiRocketLaunchDuotone,
  PiShieldCheckeredDuotone,
  PiShootingStarDuotone,
  PiShoppingCartDuotone,
  PiSquaresFourDuotone,
  PiStepsDuotone,
  PiTableDuotone,
  PiUserCircleDuotone,
  PiUserGearDuotone,
  PiUserPlusDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
  PiKanban,
  PiFilmReel,
} from 'react-icons/pi';
import { atom } from 'jotai';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const carbonMenuItems: MenuItemsType[] = [
  {
    id: '1',
    name: 'Dashboard',
    title: 'Overview',
    icon: PiBrowserDuotone,
    menuItems: [
      {
        name: 'File Manager',
        href: '/',
        icon: PiFolderDuotone,
      },
      {
        name: 'Appointment',
        href: routes.appointment.dashboard,
        icon: PiCalendarDuotone,
      },
      {
        name: 'Executive',
        href: routes.executive.dashboard,
        icon: PiBriefcaseDuotone,
      },
      {
        name: 'Job Board',
        href: routes.jobBoard.dashboard,
        icon: PiShapesDuotone,
        badge: 'NEW',
      },
      {
        name: 'Financial',
        href: routes.financial.dashboard,
        icon: PiCurrencyCircleDollarDuotone,
      },
      {
        name: 'Logistics',
        href: routes.logistics.dashboard,
        icon: PiPackageDuotone,
      },
      {
        name: 'E-Commerce',
        href: routes.eCommerce.dashboard,
        icon: PiShoppingCartDuotone,
      },
      {
        name: 'Analytics',
        href: routes.analytics,
        icon: PiChartBarDuotone,
      },
      {
        name: 'Support',
        href: routes.support.dashboard,
        icon: PiHeadsetDuotone,
      },
    ],
  },
  {
    id: '2',
    name: 'Apps Kit',
    title: 'Apps Kit',
    icon: PiAppStoreLogoDuotone,
    menuItems: [
      {
        name: 'E-Commerce',
        description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
        href: '#',
        icon: PiShoppingCartDuotone,
        subMenuItems: [
          {
            name: 'Products',
            href: routes.eCommerce.products,
            badge: '',
          },
          {
            name: 'Product Details',
            href: routes.eCommerce.productDetails(DUMMY_ID),
            badge: '',
          },
          {
            name: 'Create Product',
            href: routes.eCommerce.createProduct,
          },
          {
            name: 'Edit Product',
            href: routes.eCommerce.ediProduct(DUMMY_ID),
          },
          {
            name: 'Categories',
            href: routes.eCommerce.categories,
          },
          {
            name: 'Create Category',
            href: routes.eCommerce.createCategory,
          },
          {
            name: 'Edit Category',
            href: routes.eCommerce.editCategory(DUMMY_ID),
          },
          {
            name: 'Orders',
            href: routes.eCommerce.orders,
          },
          {
            name: 'Order Details',
            href: routes.eCommerce.orderDetails(DUMMY_ID),
          },
          {
            name: 'Create Order',
            href: routes.eCommerce.createOrder,
          },
          {
            name: 'Edit Order',
            href: routes.eCommerce.editOrder(DUMMY_ID),
          },
          {
            name: 'Reviews',
            href: routes.eCommerce.reviews,
          },
          {
            name: 'Shop',
            href: routes.eCommerce.shop,
          },
          {
            name: 'Cart',
            href: routes.eCommerce.cart,
          },
          {
            name: 'Checkout & Payment',
            href: routes.eCommerce.checkout,
          },
        ],
      },
      {
        name: 'Support',
        description: '"Effortless Assistance at your Fingertips!"',
        href: '#',
        icon: PiHeadsetDuotone,
        subMenuItems: [
          {
            name: 'Inbox',
            href: routes.support.inbox,
          },
          {
            name: 'Snippets',
            href: routes.support.snippets,
          },
          {
            name: 'Templates',
            href: routes.support.templates,
          },
        ],
      },
      {
        name: 'Invoice',
        description: 'Professional-looking invoices for each customer order',
        href: '#',
        icon: PiCurrencyDollarDuotone,
        subMenuItems: [
          {
            name: 'List',
            href: routes.invoice.home,
          },
          {
            name: 'Details',
            href: routes.invoice.details(DUMMY_ID),
          },
          {
            name: 'Create',
            href: routes.invoice.create,
          },
          {
            name: 'Edit',
            href: routes.invoice.edit(DUMMY_ID),
          },
        ],
      },
      {
        name: 'Logistics',
        description:
          '"Streamline Shipments: Discover Efficiency with our Logistics!"',
        href: '#',
        icon: PiPackageDuotone,
        subMenuItems: [
          {
            name: 'Shipment List',
            href: routes.logistics.shipmentList,
          },
          {
            name: 'Shipment Details',
            href: routes.logistics.shipmentDetails(DUMMY_ID),
          },
          {
            name: 'Create Shipment',
            href: routes.logistics.createShipment,
          },
          {
            name: 'Edit Shipment',
            href: routes.logistics.editShipment(DUMMY_ID),
          },
          {
            name: 'Customer Profile',
            href: routes.logistics.customerProfile,
          },
          {
            name: 'Tracking',
            href: routes.logistics.tracking(DUMMY_ID),
          },
        ],
      },
      {
        name: 'Appointment',
        href: routes.appointment.appointmentList,
        icon: PiCalendarDuotone,
      },
      {
        name: 'File Manager',
        description:
          '"Organize, Access, and Share: Simplify your Digital World with us!"',
        href: routes.file.manager,
        icon: PiFileImageDuotone,
      },
      {
        name: 'Event Calendar',
        href: routes.eventCalendar,
        icon: PiCalendarPlusDuotone,
      },
      {
        name: 'Roles & Permissions',
        href: routes.rolesPermissions,
        icon: PiFolderLockDuotone,
      },
      {
        name: 'Point of Sale',
        href: routes.pos.index,
        icon: PiCreditCardDuotone,
      },
      {
        name: 'Invoice Builder',
        href: routes.invoice.builder,
        icon: PiNewspaperClippingDuotone,
      },
      {
        name: 'Kanban',
        href: routes.kanban.dashboard,
        icon: PiKanban,
        badge: 'NEW',
      },
      {
        name: 'Movies',
        href: routes.movies.dashboard,
        icon: PiFilmReel,
        badge: 'NEW',
      },
    ],
  },
  {
    id: '3',
    name: 'Search',
    title: 'Search & Filter',
    icon: PiUserCircleDuotone,
    menuItems: [
      {
        name: 'Real Estate',
        href: routes.searchAndFilter.realEstate,
        icon: PiHouseLineDuotone,
        badge: '',
      },
      {
        name: 'Flight Booking',
        href: routes.searchAndFilter.flight,
        icon: PiAirplaneTiltDuotone,
      },
      {
        name: 'NFT',
        href: routes.searchAndFilter.nft,
        icon: PiPokerChipDuotone,
        badge: '',
      },
    ],
  },
  {
    id: '4',
    name: 'Widgets',
    title: 'Widgets',
    icon: PiPackageDuotone,
    menuItems: [
      {
        name: 'Cards',
        href: routes.widgets.cards,
        icon: PiSquaresFourDuotone,
      },
      {
        name: 'Icons',
        href: routes.widgets.icons,
        icon: PiFeatherDuotone,
      },
      {
        name: 'Charts',
        href: routes.widgets.charts,
        icon: PiChartLineUpDuotone,
      },
      {
        name: 'Maps',
        href: routes.widgets.maps,
        icon: PiMapPinLineDuotone,
      },
    ],
  },
  {
    id: '5',
    name: 'Forms',
    title: 'Forms',
    icon: PiNotePencilDuotone,
    menuItems: [
      {
        name: 'Account Settings',
        href: routes.forms.profileSettings,
        icon: PiUserGearDuotone,
      },
      {
        name: 'Notification Preference',
        href: routes.forms.notificationPreference,
        icon: PiBellSimpleRingingDuotone,
        badge: '',
      },
      {
        name: 'Personal Information',
        href: routes.forms.personalInformation,
        icon: PiUserCircleDuotone,
      },
      {
        name: 'Newsletter',
        href: routes.forms.newsletter,
        icon: PiEnvelopeSimpleOpenDuotone,
      },
      {
        name: 'Multi Step',
        href: routes.multiStep,
        icon: PiStepsDuotone,
      },
      {
        name: 'Payment Checkout',
        href: routes.eCommerce.checkout,
        icon: PiCreditCardDuotone,
      },
    ],
  },
  {
    id: '6',
    name: 'Tables',
    title: 'Tables',
    icon: PiTableDuotone,
    menuItems: [
      {
        name: 'Basic',
        href: routes.tables.basic,
        icon: PiGridFourDuotone,
      },
      {
        name: 'Collapsible',
        href: routes.tables.collapsible,
        icon: PiCaretCircleUpDownDuotone,
      },
      {
        name: 'Enhanced',
        href: routes.tables.enhanced,
        icon: PiTableDuotone,
      },
      {
        name: 'Sticky Header',
        href: routes.tables.stickyHeader,
        icon: PiBrowserDuotone,
      },
      {
        name: 'Pagination',
        href: routes.tables.pagination,
        icon: PiListNumbersDuotone,
      },
      {
        name: 'Search',
        href: routes.tables.search,
        icon: PiHourglassSimpleDuotone,
      },
    ],
  },
  {
    id: '7',
    name: 'Pages',
    title: 'Pages',
    icon: PiCardsDuotone,
    menuItems: [
      {
        name: 'Profile',
        href: routes.profile,
        icon: PiMagicWandDuotone,
      },
      {
        name: 'Welcome',
        href: routes.welcome,
        icon: PiShootingStarDuotone,
      },
      {
        name: 'Coming Soon',
        href: routes.comingSoon,
        icon: PiRocketLaunchDuotone,
      },
      {
        name: 'Access Denied',
        href: routes.accessDenied,
        icon: PiFolderLockDuotone,
      },
      {
        name: 'Not Found',
        href: routes.notFound,
        icon: PiBinocularsDuotone,
      },
      {
        name: 'Maintenance',
        href: routes.maintenance,
        icon: PiHammerDuotone,
      },
      {
        name: 'Blank',
        href: routes.blank,
        icon: PiNoteBlankDuotone,
      },
    ],
  },
  {
    id: '8',
    name: 'Authentication',
    title: 'Authentication',
    icon: PiShieldCheckeredDuotone,
    menuItems: [
      {
        name: 'Sign Up',
        icon: PiUserPlusDuotone,
        description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
        href: '#',
        subMenuItems: [
          {
            name: 'Modern Sign Up',
            href: routes.auth.signUp1,
          },
          {
            name: 'Vintage Sign Up',
            href: routes.auth.signUp2,
          },
          {
            name: 'Trendy Sign Up',
            href: routes.auth.signUp3,
          },
          {
            name: 'Elegant Sign Up',
            href: routes.auth.signUp4,
          },
          {
            name: 'Classic Sign Up',
            href: routes.auth.signUp5,
          },
        ],
      },
      {
        name: 'Sign In',
        icon: PiShieldCheckeredDuotone,
        description: '"Effortless Assistance at your Fingertips!"',
        href: '#',
        subMenuItems: [
          {
            name: 'Modern Sign In',
            href: routes.auth.signIn1,
          },
          {
            name: 'Vintage Sign In',
            href: routes.auth.signIn2,
          },
          {
            name: 'Trendy Sign In',
            href: routes.auth.signIn3,
          },
          {
            name: 'Elegant Sign In',
            href: routes.auth.signIn4,
          },
          {
            name: 'Classic Sign In',
            href: routes.auth.signIn5,
          },
        ],
      },
      {
        name: 'Forgot Password',
        icon: PiLockKeyDuotone,
        description:
          '"Streamline Shipments: Discover Efficiency with our Logistics!"',
        href: '#',
        subMenuItems: [
          {
            name: 'Modern Forgot Password',
            href: routes.auth.forgotPassword1,
          },
          {
            name: 'Vintage Forgot Password',
            href: routes.auth.forgotPassword2,
          },
          {
            name: 'Trendy Forgot Password',
            href: routes.auth.forgotPassword3,
          },
          {
            name: 'Elegant Forgot Password',
            href: routes.auth.forgotPassword4,
          },
          {
            name: 'Classic Forgot Password',
            href: routes.auth.forgotPassword5,
          },
        ],
      },
      {
        name: 'OTP Pages',
        icon: PiChatCenteredDotsDuotone,
        description:
          '"Organize, Access, and Share: Simplify your Digital World with us!"',
        href: '#',
        subMenuItems: [
          {
            name: 'Modern OTP Page',
            href: routes.auth.otp1,
          },
          {
            name: 'Vintage OTP Page',
            href: routes.auth.otp2,
          },
          {
            name: 'Trendy OTP Page',
            href: routes.auth.otp3,
          },
          {
            name: 'Elegant OTP Page',
            href: routes.auth.otp4,
          },
          {
            name: 'Classic OTP Page',
            href: routes.auth.otp5,
          },
        ],
      },
    ],
  },
];

export const carbonMenuItemAtom = atom(carbonMenuItems[0]);
