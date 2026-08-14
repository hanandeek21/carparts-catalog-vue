# AutoParts Catalog Microfrontend

Catalog & Discovery microfrontend for the Group 14 **Car Parts & Accessories** e-commerce project.

## Owner

- **Member:** Hanan
- **Role:** Catalog & Discovery
- **Framework:** Vue 3
- **Material Design library:** Vuetify

## Live Links

- **Live application:** https://carparts-catalog-vue.vercel.app/
- **Repository:** https://github.com/hanandeek21/carparts-catalog-vue

## Features

- Home hero section and service guarantees
- Product catalog with 12 car parts and accessories
- Real-time product search
- Category filtering
- Product sorting by price and rating
- Reusable product cards
- Product details dialog with image, description, rating, price, and stock information
- Add-to-cart and wishlist actions prepared for Shell integration

## Microfrontend Responsibilities

This application owns product discovery only:

- Browse products
- Search, filter, and sort products
- View product details
- Request adding a product to the cart
- Request adding or removing a product from the wishlist

Cart and checkout belong to the Lit microfrontend.  
Account, orders, wishlist management, and reviews belong to the React microfrontend.

## Shell Events

When this app is loaded inside the Shell through an iframe, it sends these messages with `window.postMessage`:

| Event | Purpose |
|---|---|
| `catalog:add-to-cart` | Sends the selected product to the Cart & Checkout microfrontend |
| `catalog:toggle-wishlist` | Requests adding or removing a product from the Account & Orders wishlist |


## Run Locally
npm install
npm run dev

# Build
npm run build

