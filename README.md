# BookNook – A Small Online Library

**Live Site URL:** [https://booknook-library.vercel.app](https://booknook-library.vercel.app)

BookNook is a community-driven online library platform where readers can share their personal book collections, explore diverse categories, borrow available titles, and track their borrowed books seamlessly.

## Key Features
- **Secure Authentication with BetterAuth & JWT:** Simple email/password registration (name, email, password), Google OAuth social login, persistent sessions across reloads, and JWT-protected Express API endpoints.
- **Interactive Book Catalog & New Arrivals:** Dynamic homepage slider built with Swiper.js, real-time latest 6 book arrivals sorted directly from MongoDB, and a responsive 3-column book directory.
- **Complete Book CRUD & Image Hosting:** Authenticated users can publish new books with cover images uploaded via ImgBB, edit existing listings via pre-filled modals, and delete entries with custom confirmation dialogs.
- **Smart Borrowing & Inventory Tracking:** Automated copy management using MongoDB `$inc` operators that decrement stock on borrow, prevent duplicate borrowing of the same title, and restock upon return.
- **Responsive Design & Theme Switcher:** Built with Next.js App Router, Tailwind CSS, and DaisyUI featuring light/dark mode toggling, consistent typography, and custom loading/404 states.
