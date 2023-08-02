'use client';

import { QueryClient, QueryClientProvider, hydrate } from 'react-query';
import { PropsWithChildren, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
