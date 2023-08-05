import { cache } from 'react';
import { QueryClient } from 'react-query';

// singleton QueryClient
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
