import { SnowstormConfig } from '@snowstorm/core';
import { VitePluginFonts } from 'vite-plugin-fonts';

export const Config: SnowstormConfig = {
	site: {
		build: {
			plugins: [
				VitePluginFonts({
					google: {
						families: ['Montserrat', 'Source Serif Pro'],
					},
				}),
			],
		},
	},
};
