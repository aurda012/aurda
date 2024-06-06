import useSWR from 'swr';
import { fetcher } from '@/modules/blog-generator/lib/utils';
import {
  DomainResponse,
  DomainVerificationStatusProps,
} from '@/modules/blog-generator/lib/types';

export function useDomainStatus({ domain }: { domain: string }) {
  const { data, isValidating } = useSWR<{
    status: DomainVerificationStatusProps;
    domainJson: DomainResponse & { error: { code: string; message: string } };
  }>(`/api/domain/${domain}/verify`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 5000,
    keepPreviousData: true,
  });

  return {
    status: data?.status,
    domainJson: data?.domainJson,
    loading: isValidating,
  };
}
