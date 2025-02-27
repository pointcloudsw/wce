import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
    // const { entry } = context.locals.starlightRoute;
    console.log('jroll-',context);
});