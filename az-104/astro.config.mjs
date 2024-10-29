import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';


import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          components: {
              TableOfContents: './src/components/TableOfContents.astro'
              , MobileTableOfContents: './src/components/MobileTableOfContents.astro'
          }
          , customCss: [
              './styles/custom.css'
          ]
          , favicon: '/images/favicon.svg'
          , head: [
              {
                  tag: 'link'
                  , attrs: {
                      rel: 'icon'
                      , href: '/images/favicon.ico'
                      , sizes: '32x32'
                  }
              }
          ]
          , logo: {
              src: './src/assets/MSCertifiedAssociate.png'
              , replacesTitle: true
          }
          , tableOfContents: {
              minHeadingLevel: 1
              , maxHeadingLevel: 5
          }
          , prerender: false
          , title: 'AZ-104'
          , titleDelimiter: ' — '
          , social: {
              github: 'https://github.com/withastro/starlight'
          }
      })
  ],

  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});