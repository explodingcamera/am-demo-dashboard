import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from '../components/layout/layout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
		},
	},
});

const App: React.FC = ({ children }) => (
	<Layout>
		<Suspense fallback="Loading...">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Suspense>
	</Layout>
);

export default App;
