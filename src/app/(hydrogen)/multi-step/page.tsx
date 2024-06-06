import MultiStepFormOne from '@/app/shared/multi-step/multi-step-1';
import { metaObject } from '@/config/site';

export const metadata = {
  ...metaObject('Multi Step'),
};

export default function MultiStepFormPage() {
  return <MultiStepFormOne />;
}
