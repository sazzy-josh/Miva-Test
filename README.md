# Student Management System

A comprehensive web application for managing student data, course enrollments, and academic records. Built with Next.js 15.3.1, React 19, and Chakra UI with a dark mode interface.

## User Interface

### Login Screen
The application features a clean, dark-themed login interface with:
- Email and password input fields
- Remember me option
- Forgot password link
- Demo credentials displayed for easy access
- MIVA University branding

### Dashboard
The dashboard provides an overview of the student management system with:
- Key metrics (Total Students, Total Courses, Average GPA, Active Semesters)
- Recent students list with search functionality
- Student information including name, registration number, major, GPA, and courses
- Navigation sidebar for accessing different sections of the application

## Features

- **User Authentication**: Secure login system with NextAuth.js
- **Student Management**: Complete CRUD operations for student records
- **Course Management**: View and manage course information
- **Dashboard**: Overview of key metrics and student data
- **Dark Mode UI**: Modern dark-themed interface built with Chakra UI and Tailwind CSS
- **Responsive Design**: Fully responsive layout for all device sizes
- **Data Persistence**: In-memory database with localStorage persistence
- **Pagination**: Reusable pagination component for large data sets
- **Search & Filtering**: Advanced search functionality for student records

## Tech Stack

- **Framework**: Next.js 15.3.1
- **UI Libraries**: Chakra UI, Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Hooks
- **Icons**: React Icons
- **Form Validation**: Zod
- **Data Storage**: In-memory with localStorage persistence

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Authentication

The system includes a mock authentication system with the following credentials:

- **Email**: admin@example.com
- **Password**: password@123

![Login Screen](./public/screenshots/login-screen.png)

## Project Structure

```
student-management-system/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # Authentication routes
│   │   │   └── login/    # Login page
│   │   ├── (default)/    # Protected routes
│   │   │   ├── dashboard/# Dashboard page
│   │   │   └── students/ # Student management pages
│   │   └── api/         # API routes
│   ├── components/       # Reusable components
│   │   ├── PageLayouts/  # Layout components
│   │   └── Tables/       # Table components
│   ├── lib/              # Utility functions
│   │   ├── auth.ts       # Authentication configuration
│   │   └── db.ts         # Mock database implementation
│   └── types/            # TypeScript type definitions
```

## API Routes

- **Authentication**: `/api/auth/[...nextauth]`
- **Students**: 
  - GET, POST: `/api/students`
  - GET, PUT, DELETE: `/api/students/[id]`

## Database

The application uses an in-memory database with localStorage persistence. The database includes:

- **Students**: Student records with personal and academic information
- **Courses**: Course information including instructors and schedules

## Features in Detail

### Student Management

- Create, read, update, and delete student records
- View detailed student information
- Manage course enrollments
- Filter and search students by various criteria

### Dashboard

- Overview of key metrics
- Quick access to student and course information
- Visual representation of data

### Pagination

- Custom pagination component for handling large datasets
- Configurable items per page
- Navigation controls for moving between pages

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Chakra UI for the component library
- All contributors who have helped shape this project
