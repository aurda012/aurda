import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  component: {
    name: string;
    description: string;
    path: string;
    image: string;
  };
}

const Card = ({ component }: CardProps) => {
  return (
    <Link href={component.path} className="group">
      <div className="relative overflow-hidden rounded-lg transition duration-200 group-hover:shadow-xl dark:border dark:border-white/[0.1]">
        <Image
          width={720}
          height={1024}
          src={component.image}
          alt={component.name}
          className="rounded-md blur-0 transition duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mb-2 mt-4 text-xl font-bold text-neutral-700 dark:text-neutral-100">
        {component.name}
      </p>
      <p className="mt-2 text-sm font-normal text-neutral-500 dark:text-neutral-300">
        {component.description}
      </p>
    </Link>
  );
};
export default Card;
