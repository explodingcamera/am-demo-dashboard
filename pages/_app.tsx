import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
		},
	},
});

const App: React.FC = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default App;
