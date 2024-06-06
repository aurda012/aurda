import { components } from '@/modules/awesome-ui/components';
import Card from '@/modules/awesome-ui/components/card';

const AllUI = () => {
  return (
    <div className="mx-auto flex h-full max-w-7xl px-4">
      <div className="relative z-40 grid h-full grid-cols-1 items-start gap-20 pb-12 pt-4 md:grid-cols-2 lg:grid-cols-2">
        {components.map((comp) => (
          <Card key={comp.name} component={comp} />
        ))}
      </div>
    </div>
  );
};
export default AllUI;
