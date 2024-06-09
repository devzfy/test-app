import api from '@/service/api'
import {
  QueryFunctionContext,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query'

interface IQueryKeyArgs {
  url: string
}
interface IProps {
  name: string
  url: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryOptions?: UseQueryOptions<any, any, any, any>
}

async function fetch({
  queryKey,
}: QueryFunctionContext<[string, IQueryKeyArgs]>) {
  const { url } = queryKey[1]

  const res = await api.get(url)
  return res.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useGet(args: IProps): UseQueryResult<any> {
  const { name, queryOptions, url } = args

  const data = useQuery({
    queryKey: [`${name}`, { url }],
    queryFn: fetch,
    ...queryOptions,
  })

  return {
    ...data,
  }
}
export default useGet
