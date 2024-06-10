import api from '@/service/api';
import {
  QueryFunctionContext,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

interface IQueryKeyArgs {
  url: string;
}

interface IProps<TData> {
  name: string;
  url: string;
  queryOptions?: UseQueryOptions<TData, unknown, TData, [string, IQueryKeyArgs]>;
}

async function fetch<TData>({ queryKey }: QueryFunctionContext<[string, IQueryKeyArgs]>): Promise<TData> {
  const { url } = queryKey[1];
  const res = await api.get(url);
  return res.data;
}

function useGet<TData>({ name, url, queryOptions }: IProps<TData>): UseQueryResult<TData, unknown> {
  return useQuery({
    queryKey: [name, { url }],
    queryFn: fetch,
    ...queryOptions,
  });
}

export default useGet;
