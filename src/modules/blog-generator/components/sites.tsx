import SiteCard from './site-card';
import Image from 'next/image';
import { getSites } from '../actions/site.actions';

export default async function Sites({ limit }: { limit?: number }) {
  const sites = await getSites(limit);

  return sites.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sites.map((site) => (
        <SiteCard key={site._id} data={site} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Sites Yet</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any sites yet. Create one to get started.
      </p>
    </div>
  );
}
