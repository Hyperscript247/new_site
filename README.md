# Hyperscript Website

A modern Next.js website for Hyperscript Technologies, featuring services, learning resources, and community engagement.

## Features

- **Home**: Company overview and introduction
- **About**: Information about Hyperscript
- **Services**: Detailed service offerings
- **Community**: Join the tech community with comprehensive registration
- **Learning**: Educational resources and courses
- **Contact**: Get in touch with the team

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: PostgreSQL with Prisma ORM
- **Animation**: Framer Motion
- **Email**: Resend (optional for notifications)
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd new_site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/hyperscript_db?schema=public"
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Community Feature Setup

The community registration feature allows users to join the Hyperscript community and receive notifications.

### Database Schema

The `CommunityMember` model stores:
- Personal information (name, email, phone, date of birth, profession)
- Professional details (LinkedIn profile, areas of interest)
- Community engagement preferences
- Volunteer availability
- Agreement to terms

### Email Notifications

To enable email notifications when users register:

1. Install Resend:
```bash
npm install resend
```

2. Get a Resend API key from [resend.com](https://resend.com)

3. Add to your `.env`:
```
RESEND_API_KEY="your_api_key_here"
EMAIL_FROM="Hyperscript Community <onboarding@hyperscript.ng>"
```

**Note**: If Resend is not configured, the application will still work. Email notifications will be logged to the console instead of being sent.

### Form Fields

The community registration form includes:

**Personal Information:**
- Full Name
- Email Address
- WhatsApp Number
- Date of Birth
- Gender (optional)
- Profession
- LinkedIn Profile (optional)

**Community Engagement:**
- Areas of Interest (Backend, Frontend, Cloud, Security, etc.)
- Type of Support Seeking (Jobs, Mentorship, Networking, etc.)
- Preferred Event Type (Physical, Virtual, Hybrid)

**Availability & Participation:**
- Willing to Volunteer (Yes/No)
- Areas to Support (if volunteering)

**Additional:**
- How did you hear about us?

**Confirmation:**
- Agree to Terms of Engagement (required)
- Agree to receive communications

## Admin Dashboard

The admin dashboard provides a comprehensive interface for managing community members, courses, and registrations.

### Accessing the Admin Dashboard

1. **Navigate to**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. **Default credentials** (after seeding):
   - Username: `admin`
   - Password: `admin123`

**⚠️ IMPORTANT**: Change the default password immediately after first login!

### Setting Up Admin Access

#### Option 1: Seed the Database (Recommended for Development)

Run the seed script to create a default admin user and sample courses:

```bash
npm run seed
# or
npx prisma db seed
```

This will create:
- Default admin user (username: `admin`, password: `admin123`)
- 3 sample courses (Web Development, Data Science, Cloud Computing)

#### Option 2: Create Admin User Manually

Using Prisma Studio:

```bash
npx prisma studio
```

Then create an admin record in the `Admin` table:
- **id**: Any unique string (e.g., `admin-1`)
- **username**: Your desired username
- **password**: Your password (plain text for development, hashed for production)
- **createdAt**: Current timestamp
- **updatedAt**: Current timestamp

#### Option 3: Hash Password for Production

For production environments, use hashed passwords:

```typescript
import { hashPassword } from '@/lib/auth/session'

const hashedPassword = await hashPassword('your-secure-password')
// Use this hashed password in the database
```

### Admin Dashboard Features

#### 1. Dashboard Overview (`/admin`)
- **Statistics Cards**:
  - Total community members with pending count
  - Total active courses
  - Total course registrations with pending count
  - Pending actions requiring attention
- **Recent Activity**:
  - Latest 5 community member registrations
  - Latest 5 course registrations
  - Quick status overview

#### 2. Community Members Management (`/admin/community`)
- View all community member registrations in a data table
- Update member status: Pending → Approved/Rejected
- View detailed member profiles including:
  - Personal information (name, email, phone, DOB, profession)
  - Areas of interest and support seeking
  - Volunteer preferences
  - LinkedIn profile
- Delete members with confirmation
- Filter and search functionality

#### 3. Courses Management (`/admin/courses`)
- **Create**: Add new courses with title, description, and category
- **Read**: View all courses with registration counts
- **Update**: Edit course information inline
- **Delete**: Remove courses (with cascade warning for registrations)
- Modal-based editing for better UX

#### 4. Course Registrations (`/admin/registrations`)
- View all course registrations with student details
- Update registration status: Pending → Approved/Rejected/Completed
- Manage payment status: Unpaid → Paid/Partial
- Track course progress (percentage)
- View detailed registration information
- Filter by course, status, or payment status

### Security Features

- **Session-based authentication** using secure HTTP-only cookies
- **Password hashing** with bcrypt (10 rounds)
- **Backward compatibility** for plain-text passwords (development only)
- **Protected routes** with automatic redirect to login
- **7-day session expiry** with secure flags in production

### Admin Best Practices

1. **Change Default Password**: Immediately after first login
2. **Use Strong Passwords**: Minimum 12 characters, mix of letters, numbers, symbols
3. **Regular Audits**: Review pending members and registrations weekly
4. **Backup Database**: Before making bulk changes
5. **Production Security**:
   - Always use hashed passwords
   - Enable HTTPS
   - Use environment variables for secrets
   - Implement rate limiting on login

## Database Management

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create a migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (warning: deletes all data)
npx prisma migrate reset
```

## Build and Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Netlify:

The project is configured for Netlify deployment with the `@netlify/plugin-nextjs` plugin.

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `DATABASE_URL`
   - `RESEND_API_KEY` (optional)
   - `EMAIL_FROM` (optional)
4. Deploy!

## Project Structure

```
/app
  /actions          - Server actions for form submissions
    admin-actions.ts         - Admin dashboard operations
    community-actions.ts     - Community registration
    course-actions.ts        - Course queries
    registration-actions.ts  - Course registration
  /admin            - Admin dashboard
    layout.tsx               - Protected admin layout
    page.tsx                 - Dashboard overview
    /login                   - Admin login page
    /community               - Community members management
    /courses                 - Courses CRUD
    /registrations           - Course registrations
  /community        - Community page
  /contact          - Contact page
  /learning         - Learning/courses page
  /services         - Services page
  /about            - About page
/components
  /admin            - Admin dashboard components
    admin-sidebar.tsx        - Navigation sidebar
    community-members-table.tsx
    courses-table.tsx
    registrations-table.tsx
  /ui               - shadcn/ui components
  /layout           - Header, Footer
  /community        - Community page components
  /home             - Homepage components
  /contact          - Contact page components
  /services         - Services page components
/lib
  /auth             - Authentication utilities
    session.ts               - Login, logout, session management
  email.ts          - Email notification utilities
  prisma.ts         - Prisma client singleton
  utils.ts          - Utility functions
/prisma
  /migrations       - Database migrations
  schema.prisma     - Database schema
  seed.ts           - Database seed script
/public             - Static assets
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright © 2025 Hyperscript Technologies. All rights reserved.
