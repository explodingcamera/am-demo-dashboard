import React from 'react';
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
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</Layout>
);

export default App;
