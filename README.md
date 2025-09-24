# Advanced Developer Resume Builder

A modern, feature-rich resume builder built with React, TypeScript, TanStack Router, React Query, and React PDF. Create professional resumes with real-time preview and PDF export capabilities.

## Features

### 🚀 Core Functionality
- **Real-time Resume Building**: Create and edit resumes with instant preview
- **PDF Export**: Generate professional PDF resumes using React PDF
- **Data Persistence**: Automatic saving to localStorage with React Query
- **Multiple Templates**: Choose from modern, classic, creative, and minimal designs
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 📝 Resume Sections
- **Personal Information**: Contact details, professional summary, social links
- **Work Experience**: Detailed job history with achievements and technologies
- **Education**: Academic background with degrees and certifications
- **Skills**: Categorized skills with proficiency levels
- **Projects**: Portfolio projects with descriptions and technologies
- **Certifications**: Professional certifications and credentials

### 🛠️ Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data management and caching
- **Form Validation**: Comprehensive form validation with react-hook-form
- **Modern UI**: Beautiful interface built with Tailwind CSS
- **Component Architecture**: Modular, reusable components
- **Error Handling**: Robust error handling and user feedback

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: TanStack Router
- **State Management**: React Query (@tanstack/react-query)
- **PDF Generation**: React PDF (@react-pdf/renderer)
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd router-queries
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Start Building**: Fill out your personal information in the Personal Info tab
2. **Add Experience**: Add your work experience with detailed descriptions
3. **Include Education**: Add your educational background
4. **List Skills**: Categorize your skills by type and proficiency level
5. **Showcase Projects**: Add portfolio projects with technologies used
6. **Add Certifications**: Include professional certifications
7. **Choose Template**: Select from multiple professional templates
8. **Preview & Export**: Review your resume and download as PDF

## Project Structure

```
src/
├── components/
│   ├── resume/
│   │   ├── ResumeBuilder.tsx      # Main resume builder component
│   │   ├── PersonalInfoForm.tsx   # Personal information form
│   │   ├── ExperienceForm.tsx     # Work experience form
│   │   ├── EducationForm.tsx      # Education form
│   │   ├── SkillsForm.tsx         # Skills management
│   │   ├── ProjectsForm.tsx       # Projects form
│   │   ├── CertificationsForm.tsx # Certifications form
│   │   ├── ResumePreview.tsx      # PDF preview and export
│   │   └── TemplateSelector.tsx   # Template selection
│   └── Header.tsx                 # Application header
├── lib/
│   ├── query-client.ts           # React Query configuration
│   └── resume-storage.ts         # Local storage utilities
├── types/
│   └── resume.ts                 # TypeScript type definitions
└── routes/
    ├── __root.tsx               # Root route with providers
    └── index.tsx                # Main application route
```

## Key Features Explained

### React Query Integration
- Automatic data caching and synchronization
- Optimistic updates for better user experience
- Background refetching and stale data management
- Error handling and retry logic

### PDF Generation
- Professional PDF templates using React PDF
- Responsive design that works in PDF format
- Customizable styling and layout
- High-quality output suitable for printing

### Form Management
- Comprehensive form validation
- Real-time error feedback
- Efficient form state management
- User-friendly interface

### Data Persistence
- Automatic saving to localStorage
- Data recovery on page refresh
- Optimistic updates with React Query
- Error handling for storage operations

## Customization

### Adding New Resume Sections
1. Create a new form component in `src/components/resume/`
2. Add the corresponding TypeScript interface in `src/types/resume.ts`
3. Update the ResumeBuilder component to include the new section
4. Add the section to the PDF template in ResumePreview.tsx

### Creating New Templates
1. Add template configuration to the templates array in TemplateSelector.tsx
2. Update the PDF styles in ResumePreview.tsx
3. Add template-specific styling

### Styling Customization
The application uses Tailwind CSS for styling. You can customize:
- Colors in the Tailwind configuration
- Component-specific styles in individual components
- PDF template styles in ResumePreview.tsx

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
