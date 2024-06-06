import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

export const appointmentTypes = {
  'Routine Checkup': 'Routine Checkup',
  'Pregnant Yoga': 'Pregnant Yoga',
  Consultant: 'Consultant',
  Training: 'Training',
};
export const appointmentStatuses = {
  Scheduled: 'Scheduled',
  Waiting: 'Waiting',
};

export type Type = keyof typeof appointmentTypes;
export type StatusType = keyof typeof appointmentStatuses;

export const appointmentData = [
  {
    id: '3416',
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Routine Checkup',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Scheduled',
    amount: 45.54,
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3417',
    patient: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
    },
    doctor: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Consultant',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 120,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3418',
    patient: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
    },
    doctor: {
      name: 'Dr. Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Training',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3419',
    patient: {
      name: 'Omar Haag',
      email: 'omar@example.com',
    },
    doctor: {
      name: 'Dr. Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Pregnant Yoga',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Scheduled',
    amount: 45.54,
    duration: 10,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3420',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Training',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3421',
    patient: {
      name: 'Kristie Ziemann',
      email: 'kristie@example.com',
    },
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Pregnant Yoga',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 30,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3422',
    patient: {
      name: 'Omar Haag',
      email: 'omar@example.com',
    },
    doctor: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Routine Checkup',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Scheduled',
    amount: 45.0,
    duration: 60,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3423',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Routine Checkup',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3424',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Routine Checkup',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Waiting',
    amount: 55.54,
    duration: 120,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3425',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Pregnant Yoga',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 10,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3426',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Training',
    date: '2022-11-10T06:22:01.621Z',
    status: 'Waiting',
    amount: 35.0,
    duration: 35,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3527',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Marcos McGlynn',
      email: 'marcos@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Training',
    date: '2023-02-06T17:46:26.713Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 15,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3428',
    patient: {
      name: 'Susie Beatty',
      email: 'susie@example.com',
    },
    doctor: {
      name: 'Dr. Omar Haag',
      email: 'omar@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Training',
    date: '2022-03-06T05:10:57.625Z',
    status: 'Scheduled',
    amount: 45.54,
    duration: 25,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3429',
    patient: {
      name: 'Marcos McGlynn',
      email: 'marcos@example.com',
    },
    doctor: {
      name: 'Dr. Susie Beatty',
      email: 'susie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Training',
    date: '2021-09-27T21:47:53.304Z',
    status: 'Scheduled',
    amount: 50.54,
    duration: 90,
    address: '1250 E Apache Blvd, Arkansas, USA'
  },
  {
    id: '3430',
    patient: {
      name: 'Johnnie Kassulke',
      email: 'johnnie.kassulke@example.com',
    },
    doctor: {
      name: 'Dr. Kristie Ziemann',
      email: 'kristie@example.com',
      avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-${getRandomArrayElement(
        avatarIds
      )}.webp`,
    },
    type: 'Consultant',
    date: '2021-11-26T06:34:48.311Z',
    status: 'Waiting',
    amount: 45.54,
    duration: 120,
    address: '1200 E Apache Blvd, Arkansas, USA'
  },
];
