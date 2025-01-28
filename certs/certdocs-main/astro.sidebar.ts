import type { StarlightUserConfig } from '@astrojs/starlight/types';
import { group } from './config/sidebar';

/**
 * Starlight sidebar configuration object for the global site sidebar.
 *
 * - Top-level groups become tabs.
 * - Use the `group()` utility function to define groups. This uses labels from our
 *   `src/content/nav/*.ts` files instead of defining labels and translations inline.
 *
 */
export const sidebar = [
	// Start tab
	group('home', {
		items: [ 'getting-started' ]
	}),

	// AWS tab
	group('aws', {
		collapsed: true,
		items: [
			'aws/aws',
			group('aws.administration', {
				collapsed: true,
				autogenerate: { directory: 'aws/administration' }
			}),
			group('aws.compute', {
				collapsed: true,
				autogenerate: { directory: 'aws/compute' }
			}),
			group('aws.networking', {
				collapsed: true,
				autogenerate: { directory: 'aws/networking' }
			}),
			group('aws.storage', {
				collapsed: true,
				autogenerate: { directory: 'aws/storage' }
			}),
			group('aws.services', {
				collapsed: true,
				autogenerate: { directory: 'aws/services' }
			}),
			group('aws.other', {
				collapsed: true,
				autogenerate: { directory: 'aws/other' }
			}),
		]
	}),

	// Microsoft Azure (msa) tab
	group('msa', {
		collapsed: true,
		items: [
			'msa/msa',
			group('msa.administration', {
				collapsed: true,
				autogenerate: { directory: 'msa/administration' }
			}),
			group('msa.compute', {
				collapsed: true,
				autogenerate: { directory: 'msa/compute' }
			}),
			group('msa.networking', {
				collapsed: true,
				autogenerate: { directory: 'msa/networking' }
			}),
			group('msa.storage', {
				collapsed: true,
				autogenerate: { directory: 'msa/storage' }
			}),
			group('msa.services', {
				collapsed: true,
				autogenerate: { directory: 'msa/services' }
			}),
			group('msa.other', {
				collapsed: true,
				autogenerate: { directory: 'msa/other' }
			}),
		]
	}),
	
	group('resources', {
		items: [
			group('resources.commands', {
				collapsed: true,
				autogenerate: { directory: 'resources/commands' }
			}),
			group('resources.notes', {
				collapsed: true,
				autogenerate: { directory: 'resources/notes' }
			}),
			group('resources.starlight', {
				collapsed: true,
				autogenerate: { directory: 'resources/starlight' }
			}),
		],
	}),

] satisfies StarlightUserConfig['sidebar'];
