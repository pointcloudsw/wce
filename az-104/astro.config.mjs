import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';


// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            components: {
                TableOfContents: './src/components/TableOfContents.astro'
            }
            , customCss: [
                './styles/custom.css'
            ]
            , logo: {
                src: './src/assets/MSCertifiedAssociate.png'
                , replacesTitle: true
            }
            , tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 3 }
            , title: 'AZ-104'
            , social: {
                github: 'https://github.com/withastro/starlight'
            }
        })
    ]
});