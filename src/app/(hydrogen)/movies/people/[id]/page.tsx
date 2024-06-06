import { Language } from '@/modules/movies/types/languages';
import { PersonDetailsComp } from '@/modules/movies/components/people-details/person-details';

export type PersonParams = { id: string; lang: Language };

const PersonPage = ({ params: { id, lang } }: { params: PersonParams }) => {
  return <PersonDetailsComp id={Number(id)} language={lang} />;
};

export default PersonPage;
