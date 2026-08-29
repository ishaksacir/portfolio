# Portfolio App - Modern Editorial Design System

A professional React portfolio built with a cutting-edge design system featuring:
- 🎨 Modern editorial design with technical/futuristic edge
- 🌙 Full dark mode support with system preference detection
- 📱 Responsive design that works on all devices
- ⚡ Built with Vite for blazing-fast development
- 🎯 TypeScript for type-safe code
- 🎭 Accessible semantic components

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:5175](http://localhost:5175) to view it in the browser.

### Build
```bash
npm run build
```

## 📖 Documentation

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation of the design system, components, and customization guide.

## 🎨 Design System Highlights

### Typography
- **Chakra Petch** - Bold, modern headings
- **Sora** - Clean, accessible body text
- **Space Mono** - Technical accents and labels

### Color Palette
- Single accent color (#E8491D light / #FF7A3D dark)
- Carefully balanced neutral colors
- Full light and dark mode support

### Principles
- Flat design (no gradients, shadows, or neon)
- Generous whitespace
- Hairline borders for separation
- Purposeful use of monospace typography

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **CSS Modules** - Component-scoped styling
- **CSS Variables** - Design token system

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── context/         # React context (theme)
├── pages/           # Page components
├── styles/          # Global styles & tokens
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

## 🎯 Features

- ✅ Responsive grid layouts
- ✅ Dark/light mode toggle
- ✅ Accessible button variants
- ✅ Card-based content layout
- ✅ Hero section
- ✅ Project showcase grid
- ✅ Contact section
- ✅ Sticky header navigation
- ✅ Mobile-optimized

## 📱 Pages

### Home
- Hero section with headline and CTA
- Featured work/projects grid
- About section
- Contact call-to-action
- Footer with social links

## 🎮 Usage Example

```tsx
import { Container, Heading, Text, Button, Card, Badge } from './components';

export function MyComponent() {
  return (
    <Container maxWidth="lg">
      <Heading level={1}>Welcome</Heading>
      <Text variant="secondary">Subtitle text</Text>
      
      <Card>
        <Badge>Featured</Badge>
        <Heading level={3}>Project Title</Heading>
        <Text>Project description...</Text>
        <Button variant="primary">Learn More</Button>
      </Card>
    </Container>
  );
}
```

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences and can be toggled using the theme switcher in the header. User preference is saved to localStorage.

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## 🤝 Component API

### Button
```tsx
<Button 
  variant="primary" | "secondary" | "ghost"
  size="sm" | "md" | "lg"
  onClick={handler}
>
  Click me
</Button>
```

### Heading
```tsx
<Heading level={1 | 2 | 3 | 4}>Title</Heading>
```

### Text
```tsx
<Text variant="primary" | "secondary" | "accent">
  Text content
</Text>
```

### Badge
```tsx
<Badge>Label</Badge>
```

### Card
```tsx
<Card>Content</Card>
```

### Container
```tsx
<Container maxWidth="sm" | "md" | "lg" | "xl" | "full">
  Content
</Container>
```

## 📝 License

This project is open source.
