import Link from 'next/link';
import { PiArrowCircleUpFill } from 'react-icons/pi';

import UpStorageImg from '@public/upgrade-plan.webp';
import { routes } from '@/config/routes';
import { Title } from 'rizzui';
import Image from 'next/image';

export default function JobUpgradeStorage({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-5 @xl:p-7">
        <div className="shrink-0">
          <Title as="h2" className="text-lg font-semibold text-gray-900">
            Upgrade Your Plan
          </Title>
          <span className="mb-4 mt-2 block text-gray-500">
            Your storage is almost <br /> full, please upgrade
          </span>
          <Link
            href={routes.jobBoard.dashboard}
            className="flex items-center gap-2 font-bold uppercase text-primary"
          >
            <PiArrowCircleUpFill className="size-6" /> Upgrade Now
          </Link>
        </div>
        <div>
          <Image
            width={150}
            height={150}
            src={UpStorageImg}
            alt="Upgrade Storage"
            sizes="(max-width: 768px) 100vw"
          />
        </div>
      </div>
    </div>
  );
}
