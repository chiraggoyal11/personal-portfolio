# Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion.

## 🎨 Features

- ✅ Modern, eye-catching design with smooth animations
- ✅ Dark/Light mode toggle with persistent preference
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scrolling between sections
- ✅ Progress indicator dots
- ✅ Back to top button
- ✅ Loading animation
- ✅ Print-friendly styles
- ✅ Social share buttons
- ✅ Copy email to clipboard
- ✅ Resume view/download functionality

## 📦 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🛠️ Customization

### Update Your Information

All content is stored in one file for easy editing:

**`src/data.js`** - Edit this file to update:
- Personal information (name, email, socials)
- Professional summary
- Skills (organized by category)
- Projects (with descriptions, tech stack, GitHub links)
- Education details
- Certificates
- Extra-curricular activities

### Add Your Photo

Replace the placeholder circle with your actual photo:

1. Add your image to `public/` folder (e.g., `public/profile.jpg`)
2. Edit `src/components/Hero.jsx`
3. Replace the initials div with:
```jsx
<img 
  src="/profile.jpg" 
  alt="Your Name"
  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl glow-effect"
/>
```

### Add Your Resume

1. Replace `public/resume.pdf` with your actual resume PDF
2. The buttons in Hero section will automatically use it

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  'light-accent': '#10B981',  // Light mode highlight (green)
  'dark-accent': '#A855F7',   // Dark mode highlight (purple)
}
```

### Modify Sections

All components are in `src/components/`:
- `Header.jsx` - Navigation and dark mode toggle
- `Hero.jsx` - Landing section with photo and intro
- `Skills.jsx` - Skills organized by category
- `Projects.jsx` - Project cards with links
- `Education.jsx` - Education timeline and certificates
- `Activities.jsx` - Extra-curricular activities
- `Contact.jsx` - Contact information and social links

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 768px (1 column layout, no navigation)
- Tablet: 768px - 1023px (2 column layout)
- Desktop: 1024px+ (3 column project grid, full navigation)

## 🎭 Animations

Built with Framer Motion for smooth, professional animations:
- Page load sequence
- Scroll-triggered reveals
- Hover effects on cards and buttons
- Staggered list animations
- Smooth transitions

## 📤 Build for Production

Build the optimized production version:

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

That's it! Vercel will auto-deploy on every push.

### Deploy to Netlify

1. Build the project: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist/` folder
4. Or connect your GitHub repo for auto-deployment

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Update `vite.config.js`:
```js
export default {
  base: '/repository-name/',
}
```
4. Run: `npm run deploy`

## 🖨️ Print Version

The portfolio includes print-friendly styles. Just press Ctrl+P (Cmd+P on Mac) to print a clean version without navigation and extra UI elements.

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📧 Support

If you have questions or need help customizing, feel free to reach out!

---

**Built with ❤️ using React and Tailwind CSS**
