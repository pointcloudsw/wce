import starlight from '@astrojs/starlight';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { defineConfig, sharpImageService } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from 'remark-smartypants';
import { sidebar } from './astro.sidebar';
import { devServerFileWatcher } from './config/integrations/dev-server-file-watcher';
import { sitemap } from './config/integrations/sitemap';
import { makeLocalesConfig } from './config/locales';
import { starlightPluginAutolinkHeadings } from './config/plugins/rehype-autolink';
import { rehypeTasklistEnhancer } from './config/plugins/rehype-tasklist-enhancer';
import { remarkFallbackLang } from './config/plugins/remark-fallback-lang';
import rehypeMermaid from 'rehype-mermaid';

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || 'https://docs.astro.build/';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		devServerFileWatcher([
			'./config/*', // Custom plugins and integrations
			'./astro.sidebar.ts', // Sidebar configuration file
			'./src/content/nav/*.ts', // Sidebar labels
		]),
		starlight({
			title: 'Docs',
			customCss: ['./src/util/custom.css'],
			expressiveCode: {
				plugins: [pluginCollapsibleSections()],
			},
			components: {
				EditLink: './src/components/starlight/EditLink.astro',
				Head: './src/components/starlight/Head.astro',
				Hero: './src/components/Hero.astro',
				MarkdownContent: './src/components/starlight/MarkdownContent.astro',
				MobileTableOfContents: './src/components/MobileTableOfContents.astro',
				PageSidebar: './src/components/PageSidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
				Pagination: './src/components/Pagination.astro',
				SiteTitle: './src/components/starlight/SiteTitle.astro',
				Search: './src/components/starlight/Search.astro',
				Sidebar: './src/components/Sidebar.astro',
				TableOfContents: './src/components/TableOfContents.astro'
			},
			editLink: {
				baseUrl: 'https://github.com/withastro/docs/edit/main',
			},
			defaultLocale: 'en',
			locales: makeLocalesConfig(),
			sidebar,
			social: {
				github: 'https://github.com/withastro/astro',
				discord: 'https://astro.build/chat',
			},
			tableOfContents: {
				minHeadingLevel: 1,
				maxHeadingLevel: 3
			},
			pagefind: false,
			head: [
				// Add ICO favicon fallback for Safari.
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.ico',
						sizes: '32x32',
					},
				},
			],
			disable404Route: true,
			plugins: [
				starlightPluginAutolinkHeadings()
			],
		}),
		sitemap(),
	],
	trailingSlash: 'always',
	scopedStyleStrategy: 'where',
	compressHTML: false,
	markdown: {
		// Override with our own config
		smartypants: false,
		remarkPlugins: [
			[remarkSmartypants, { dashes: false }],
			// Add our custom plugin that marks links to fallback language pages
			remarkFallbackLang(),
		],
		rehypePlugins: [
			rehypeSlug,
			// Tweak GFM task list syntax
			rehypeTasklistEnhancer(),
			rehypeMermaid
		],
	},
	image: {
		domains: ['avatars.githubusercontent.com'],
		service: sharpImageService(),
	},
});
