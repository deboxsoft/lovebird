import { MutationTuple, MutationHookOptions, QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

export type MutationHookFunction<DATA, VAR, OPT = {}> = (
  options?: MutationHookOptions<DATA, VAR> & OPT
) => MutationTuple<DATA, VAR>;

export type QueryHookFunction<DATA, VAR, OPT = {}> = (
  options?: QueryHookOptions<DATA, VAR> & OPT
) => QueryResult<DATA, Partial<VAR>>;
