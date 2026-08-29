# Portfolio App - Modern Editorial Design System

A professional React portfolio application built with a modern editorial design system featuring technical/futuristic styling, complete dark mode support, and responsive design.

## 🎨 Design System Overview

### Typography
- **Headings**: Chakra Petch (weights 500/600) - Large, bold, tight letter-spacing
- **Body**: Sora (weight 400/500) - Clean, readable at 16px with 1.6-1.7 line-height
- **Technical/Accent**: Space Mono (weight 400/700) - Monospace accents for tags, labels, timestamps

### Colors

**Light Mode:**
- Background: `#FAF9F6` (Off-white)
- Surface: `#FFFFFF` (Pure white)
- Text Primary: `#161316` (Dark gray)
- Text Secondary: `#6B6862` (Medium gray)
- Border: `#E5E2DA` (Light border)
- Accent: `#E8491D` (Orange)

**Dark Mode:**
- Background: `#161316` (Dark gray)
- Surface: `#211D1B` (Dark surface)
- Text Primary: `#F5F2EC` (Off-white)
- Text Secondary: `#BABABA` (Light gray)
- Border: `#3A342E` (Dark border)
- Accent: `#FF7A3D` (Light orange)

### Design Principles
- **Flat design** - No gradients, shadows, or neon effects
- **Generous whitespace** - Large margins and padding create breathing room
- **One accent color** - Single hue for all interactive elements
- **Hairline borders** - 0.5-1px borders instead of shadows
- **Monospace restraint** - Space Mono used sparingly as texture
- **Dark mode support** - All components work seamlessly in both themes

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button with variants (primary, secondary, ghost)
│   ├── Card.tsx        # Content card with border
│   ├── Container.tsx   # Layout wrapper with max-width
│   ├── Header.tsx      # Sticky navigation header
│   ├── Footer.tsx      # Footer with copyright info
│   ├── Typography.tsx  # Heading, Text, Badge components
│   └── index.ts        # Component exports
├── context/            # React context providers
│   └── ThemeContext.tsx # Light/dark mode management
├── pages/              # Page components
│   └── Home.tsx        # Main portfolio page
├── styles/             # Design tokens and global styles
│   ├── tokens.ts       # Design system tokens
│   └── global.css      # Global styles with CSS variables
├── App.tsx             # Root component
└── main.tsx            # App entry point
```

## 🎯 Components

### Button
```tsx
<Button variant="primary" size="md">Click Me</Button>
```
- Variants: `primary` | `secondary` | `ghost`
- Sizes: `sm` | `md` | `lg`

### Card
```tsx
<Card>
  <Heading level={3}>Title</Heading>
  <Text>Content</Text>
</Card>
```

### Typography
```tsx
<Heading level={1}>Main Heading</Heading>
<Heading level={2}>Section Heading</Heading>
<Heading level={3}>Subsection</Heading>

<Text variant="primary">Primary text</Text>
<Text variant="secondary">Secondary text</Text>
<Text variant="accent">Accent text</Text>

<Badge>Tag</Badge>
```

### Container
```tsx
<Container maxWidth="lg">
  Content with max-width and responsive padding
</Container>
```
- Max widths: `sm` | `md` | `lg` | `xl` | `full`

### Header
Sticky navigation with theme toggle and navigation links.

### Footer
Copyright and links footer.

## 🌙 Dark Mode

Dark mode is automatically applied based on user's system preference. Users can toggle it using the sun/moon icon in the header. The preference is saved to localStorage.

```tsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
```

## 🎨 CSS Variables

All design tokens are available as CSS variables:

```css
/* Colors */
--color-background
--color-surface
--color-text-primary
--color-text-secondary
--color-border
--color-accent

/* Typography */
--font-heading
--font-body
--font-mono
--font-size-base
--line-height-tight
--line-height-normal

/* Spacing */
--spacing-xs through --spacing-4xl

/* Borders */
--border-thin
--border-light
```

## 📱 Responsive Design

The design system includes breakpoints for:
- Mobile: < 480px
- Tablet: 640px - 768px
- Desktop: > 1024px

All components scale appropriately for different screen sizes with adaptive typography, spacing, and layouts.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd portfolio-app
npm install
```

### Development
```bash
npm run dev
```

Visit `http://localhost:5175/` (or the displayed port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `src/styles/global.css`:

```css
:root {
  --color-accent: #E8491D;
  /* ... other variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-accent: #FF7A3D;
    /* ... other dark mode variables */
  }
}
```

### Adding New Components
1. Create component in `src/components/`
2. Create corresponding `.module.css` file
3. Export from `src/components/index.ts`
4. Use CSS variables for consistent styling

### Modifying Typography
Edit `src/styles/tokens.ts` to update font families, sizes, and weights throughout the system.

## 📖 Pages

### Home Page (`src/pages/Home.tsx`)
- **Hero Section**: Eye-catching headline and CTA buttons
- **Featured Work**: Grid of project cards with badges and tags
- **About Section**: Description of the design system
- **Contact Section**: Call-to-action with social links

## 🎬 Features
- ✅ Responsive design (mobile-first)
- ✅ Dark mode with system preference detection
- ✅ TypeScript support
- ✅ CSS Modules for component styling
- ✅ Design tokens for consistency
- ✅ Accessible semantic HTML
- ✅ Fast development with Vite
- ✅ Hot Module Replacement (HMR)

## 📚 Font Imports
The design system uses Google Fonts:
- Chakra Petch (weights 500, 600)
- Sora (weights 400, 500)
- Space Mono (weights 400, 700)

These are imported via @import in `src/styles/global.css`.

## 🌐 Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📝 License
This project is open source and available for personal and commercial use.

---

**Built with React + TypeScript + Vite**
