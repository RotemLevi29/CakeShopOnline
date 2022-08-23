// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    ordersUrl: "http://localhost:3030/api/orders/",
    cartUrl: "http://localhost:3030/api/shopping_carts/",
    productsUrl: "http://localhost:3030/api/products/",
    categoriesUrl: "http://localhost:3030/api/categories/",
    markersUrl: "http://localhost:3030/api/markers/",
    productsUrlDelayed: "http://localhost:3030/api/products/delayed/",
    productImagesUrl: "http://localhost:3030/api/products/images/",
    registerUrl: "http://localhost:3030/api/auth/register",
    loginUrl: "http://localhost:3030/api/auth/login",
    socketServer: "http://localhost:3030"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
