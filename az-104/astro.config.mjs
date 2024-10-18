import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'My Docs'
            , customCss: [
                './src/styles/custom.css'
            ]
            , social: {
                github: 'https://github.com/withastro/starlight'
            }
        })
    ]
});