# Luxury Hotel Booking — Demo

A polished, responsive hotel booking landing page and booking form built with plain HTML, CSS, and JavaScript. Designed to look premium and convert visitors by showcasing room types, amenities, testimonials, and a live price calculator.

## Features

- Modern, premium UI with gold accents and glassmorphism styling
- Responsive layout (desktop and mobile)
- Live price calculator: room rate, number of nights, total amount
- Form validation (dates, email, required fields)
- Loading state and booking confirmation with generated reference ID
- Sections: Hero, Booking form, Amenities, Room types, Testimonials, Trust & Security
- Smooth CSS animations and interactive hover effects

## Files

- [index.html](index.html) — main page and booking form
- [style.css](style.css) — all styles and animations
- [script.js](script.js) — client-side logic: validation, pricing, booking flow

## How to run

1. Open the project folder in your file explorer.
2. Double-click `index.html` to open it in your default browser, or serve it with a simple static server if you prefer:

   - Using Python 3 (from project folder):

     ```bash
     python -m http.server 8000
     ```

     Then open http://localhost:8000 in your browser.

   - Or using Node.js `http-server` (if installed):

     ```bash
     npx http-server -c-1
     ```

## Customization

- Change room prices in `script.js` (the `roomPrices` mapping).
- Edit room descriptions and images in `index.html` to match your brand.
- Adjust colors and typography in `style.css` (gold accent: `#d4af37`).

## Notes & Next Steps

- This is a static demo — integrate a backend API to persist bookings and send confirmation emails.
- Add accessible labels and ARIA attributes for improved accessibility.
- Replace emoji icons with SVGs or images for a more polished brand look.
- Add image galleries and booking calendar availability checks.

## License

This project is demo code — adapt freely for prototypes and learning.
