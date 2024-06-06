import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site';

export const metadata = {
  ...metaObject('Files'),
};

export default function File() {
  return <FileDashboard />;
}
