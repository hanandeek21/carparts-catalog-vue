# Catalog & Discovery Component

Part of the **Car Parts & Accessories** e-commerce microfrontend project (Group 14).

## Overview
This component handles product browsing and discovery for the store — including the home hero banner, catalog item listings, search/filters, product detail modals, customer ratings/reviews, wishlist management, shopping cart, and order history tracking.

## Owner
- **Name:** Hanan
- **Role:** Catalog & discovery
- **Framework:** Vue 3 (Composition API)
- **UI Library:** Vuetify 3 (Material Design)

## Features
- **Hero & Guarantees Section**: Highlighted promo banner and service commitments (Fast Delivery, Genuine Parts, Support, Easy Returns).
- **Product Catalog Listing**: Displaying 12 original car parts and accessories.
- **Search & Advanced Filtering**: Real-time text search, category filters (`Car Parts`, `Car Accessories`), and sorting (Price Low/High, Rating High).
- **Product Details & Customer Reviews**: Interactive modal with full product specs, pricing, and a custom rating/review submission system.
- **Shopping Cart & Wishlist**: Dynamic cart drawer with quantity adjustments, free shipping badges, and interactive wishlist management.
- **Order History & Local Storage Persistence**: Complete checkout flow storing past orders locally in `localStorage`.

## Status
✅ Completed — Full UI/UX catalog flow implemented with reactive state management.

## Project Structure
- `src/components/ProductCard.vue` — Reusable product display card component.
- `src/components/ShopDrawers.vue` — Drawer components for Cart, Wishlist, Order History, and Checkout Modal.
- `src/composables/useShop.js` — Centralized Vue composable managing reactive application state and `localStorage` sync.
- `src/data/products.js` — Static dataset containing 12 items with local image references.

## Tech Stack
- [Vue 3](https://vuejs.org/) (Composition API `<script setup>`)
- [Vuetify 3](https://vuetifyjs.com/) (Material Design Components & MDI Icons)
- [Vite](https://vitejs.dev/) (Build tool)

## Local Setup
1. Install dependencies:
   ```bash
   npm install

   #Run development server:
   
   npm run dev