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
  /community        - Community page
  /contact          - Contact page
  /learning         - Learning/courses page
  /services         - Services page
  /about            - About page
/components
  /ui               - shadcn/ui components
  /layout           - Header, Footer
  /community        - Community page components
  /home             - Homepage components
  /contact          - Contact page components
  /services         - Services page components
/lib                - Utilities and helpers
/prisma             - Database schema and migrations
/public             - Static assets
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright © 2025 Hyperscript Technologies. All rights reserved.
