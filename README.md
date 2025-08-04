# Regex Builder 🔧

A powerful and intuitive web application for building regular expressions through a visual interface. Create complex regex patterns by simply checking boxes - no need to memorize syntax!

![Regex Builder](https://img.shields.io/badge/built%20with-Next.js-black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- **Visual Regex Building**: Create regular expressions by toggling checkboxes instead of writing complex syntax
- **Real-time Preview**: See your regex pattern update instantly as you make selections
- **Pattern Testing**: Test your regex against sample text with detailed match results
- **Multi-language Export**: Generate code snippets for JavaScript, Python, Go, Java, C#, PHP, Ruby, Rust, and Swift
- **Conflict Detection**: Built-in validation to prevent incompatible pattern combinations
- **Category Organization**: Options grouped by type (Character Types, Quantifiers, Anchors, etc.)
- **Copy & Download**: Easy copying of patterns and downloading of code examples

## 🎯 How to Use

1. **Select Pattern Components**: Choose from various categories:

   - **Character Types**: Letters, digits, whitespace, word characters
   - **Quantifiers**: One or more, zero or more, optional, exact counts
   - **Anchors & Boundaries**: Start/end of string, word boundaries
   - **Common Patterns**: Email, phone, URL, date patterns
   - **Special Characters**: Punctuation, brackets, quotes, symbols

2. **Review Generated Pattern**: Your regex appears in real-time as you make selections

3. **Test Your Regex**: Enter test text to see matches highlighted with detailed results

4. **Export to Code**: Generate ready-to-use code snippets in your preferred programming language

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React useState/useMemo hooks

## 🎨 Key Components

### RegexGenerator

Core class that handles:

- Pattern generation from selected options
- Character class building
- Anchor and quantifier application
- Regex testing and validation

### RegexBuilder

Main UI component featuring:

- Option selection interface
- Real-time pattern preview
- Conflict detection and warnings
- Test functionality

### LanguageExporter

Generates code snippets for multiple programming languages with proper syntax and imports.

## 🔄 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)

- UI components from [Radix UI](https://www.radix-ui.com/)

- Styled with [Tailwind CSS](https://tailwindcss.com/)

- Icons by [Lucide](https://lucide.dev/)

---
