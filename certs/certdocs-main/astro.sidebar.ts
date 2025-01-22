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
	group('General', {
		items: [
			'getting-started',
			group('General.overview', {
				items: ['concepts/why-astro', 'concepts/islands', 'tutorial/0-introduction'],
			}),
			group('General.migrate', {
				collapsed: true,
				autogenerate: { directory: 'guides/migrate-to-astro' },
			}),
		],
	}),

	// Guides tab
	group('guides', {
		items: [
			group('guides.routing', {
				items: [
					'basics/astro-pages',
				],
			}),
			group('guides.upgrade', {
				items: [
					'upgrade-astro',
					group('guides.upgrade.major', {
						collapsed: true,
						items: [
							'guides/upgrade-to/v5',
							'guides/upgrade-to/v4',
							'guides/upgrade-to/v3',
							'guides/upgrade-to/v2',
							'guides/upgrade-to/v1',
						],
					}),
				],
			}),
			'guides/troubleshooting',
			group('guides.recipes', { collapsed: true, autogenerate: { directory: 'recipes' } }),
			'contribute',
		],
	}),

	// Reference tab
	group('reference', {
		items: [
			group('reference.syntax', {
				items: ['reference/astro-syntax', 'reference/directives-reference'],
			}),
			'reference/configuration-reference',
			'reference/cli-reference',
			'guides/imports',
			'reference/routing-reference',
			group('reference.runtime', {
				items: [
					'reference/api-reference',
					'reference/modules/astro-actions',
					'reference/modules/astro-assets',
					'reference/modules/astro-content',
					'reference/modules/astro-env',
					'reference/modules/astro-i18n',
					'reference/modules/astro-middleware',
					'reference/modules/astro-transitions',
				],
			}),
			group('reference.other', {
				items: [
					'reference/integrations-reference',
					'reference/adapter-reference',
					'reference/content-loader-reference',
					'reference/image-service-reference',
					'reference/dev-toolbar-app-reference',
					'reference/container-reference',
					'reference/programmatic-reference',
				],
			}),
			group('reference.experimental', {
				items: [
					'reference/experimental-flags',
					'reference/experimental-flags/responsive-images',
					'reference/experimental-flags/svg',
					'reference/experimental-flags/client-prerender',
					'reference/experimental-flags/content-intellisense',
					'reference/experimental-flags/sessions',
				],
			}),
			'reference/legacy-flags',
			'reference/error-reference',
		],
	}),
] satisfies StarlightUserConfig['sidebar'];
