import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const roadmapData = {
  'Web Development': {
    milestones: [
      {
        title: 'HTML Fundamentals',
        description: 'Learn the building blocks of web pages including semantic HTML, forms, and accessibility best practices.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'CSS Styling & Layout',
        description: 'Master CSS for styling, Flexbox and Grid for layouts, and responsive design principles.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Build Your First Website',
        description: 'Create a complete responsive landing page using HTML and CSS.',
        type: 'project',
        durationWeeks: 1,
      },
      {
        title: 'JavaScript Basics',
        description: 'Learn JavaScript fundamentals including variables, functions, DOM manipulation, and events.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Interactive Web Components',
        description: 'Build interactive UI components like carousels, modals, and form validation.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Modern JavaScript (ES6+)',
        description: 'Explore modern JavaScript features like arrow functions, async/await, and modules.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Final Project: Portfolio Website',
        description: 'Build a complete portfolio website showcasing your skills with HTML, CSS, and JavaScript.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Skills Assessment',
        description: 'Demonstrate your web development skills through a comprehensive coding assessment.',
        type: 'assessment',
        durationWeeks: 1,
      },
      {
        title: 'Web Development Certificate',
        description: 'Receive your certificate of completion and join our alumni network.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Python Programming': {
    milestones: [
      {
        title: 'Python Basics',
        description: 'Learn Python syntax, variables, data types, and basic operations.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Control Flow & Functions',
        description: 'Master conditionals, loops, and writing reusable functions.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Calculator & Games Project',
        description: 'Build a calculator and simple text-based games to practice fundamentals.',
        type: 'project',
        durationWeeks: 1,
      },
      {
        title: 'Data Structures',
        description: 'Work with lists, dictionaries, sets, and tuples effectively.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Learn classes, objects, inheritance, and OOP principles.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'File Handling & APIs',
        description: 'Read/write files and interact with web APIs using Python.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Data Analysis Project',
        description: 'Build a data analysis tool using pandas and create visualizations.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Final Assessment',
        description: 'Complete a comprehensive Python programming assessment.',
        type: 'assessment',
        durationWeeks: 1,
      },
      {
        title: 'Python Programming Certificate',
        description: 'Earn your certificate and access to advanced Python courses.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Data Science': {
    milestones: [
      {
        title: 'Introduction to Data Science',
        description: 'Understand data science workflow, tools, and career paths.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Python for Data Science',
        description: 'Master NumPy, Pandas, and data manipulation techniques.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Data Visualization',
        description: 'Create compelling visualizations with Matplotlib, Seaborn, and Plotly.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Exploratory Data Analysis Project',
        description: 'Analyze a real-world dataset and present insights through visualizations.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Statistics & Probability',
        description: 'Learn statistical methods essential for data analysis.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to ML algorithms, supervised and unsupervised learning.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Predictive Modeling Project',
        description: 'Build and evaluate machine learning models for real-world predictions.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Capstone Project',
        description: 'Complete end-to-end data science project from data collection to deployment.',
        type: 'assessment',
        durationWeeks: 3,
      },
      {
        title: 'Data Science Certificate',
        description: 'Receive your professional certificate and portfolio review.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Digital Marketing': {
    milestones: [
      {
        title: 'Digital Marketing Fundamentals',
        description: 'Overview of digital marketing channels, strategies, and metrics.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Social Media Marketing',
        description: 'Master Facebook, Instagram, LinkedIn, and Twitter marketing strategies.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Content Marketing & SEO',
        description: 'Learn content creation, SEO optimization, and organic traffic growth.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Campaign Planning Project',
        description: 'Create a comprehensive marketing campaign for a brand or product.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Email Marketing & Automation',
        description: 'Build effective email campaigns and marketing automation workflows.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Paid Advertising (Google & Social)',
        description: 'Master Google Ads, Facebook Ads, and paid marketing strategies.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Analytics & Reporting',
        description: 'Use Google Analytics and other tools to measure and optimize campaigns.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Final Marketing Campaign',
        description: 'Execute and present a complete multi-channel marketing campaign.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'Digital Marketing Certificate',
        description: 'Earn your certification and access to marketing community.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Frontend Development': {
    milestones: [
      {
        title: 'Modern JavaScript & ES6+',
        description: 'Master JavaScript fundamentals and modern ES6+ features.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'React Fundamentals',
        description: 'Learn React components, state management, and hooks.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Build a React App',
        description: 'Create an interactive single-page application with React.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Advanced CSS & Styling',
        description: 'Master CSS-in-JS, Tailwind CSS, and modern styling approaches.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'State Management',
        description: 'Learn Redux, Context API, and modern state management patterns.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Performance Optimization',
        description: 'Optimize React apps for speed and user experience.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Full-Featured Web App',
        description: 'Build a complete production-ready frontend application.',
        type: 'project',
        durationWeeks: 3,
      },
      {
        title: 'Final Assessment',
        description: 'Demonstrate your frontend development expertise.',
        type: 'assessment',
        durationWeeks: 1,
      },
      {
        title: 'Frontend Developer Certificate',
        description: 'Receive your certificate and access to job opportunities.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Backend Development': {
    milestones: [
      {
        title: 'Server-Side Programming',
        description: 'Learn Node.js and Express.js for building backend services.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Database Design',
        description: 'Master SQL, PostgreSQL, and database design principles.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'RESTful API Development',
        description: 'Build and document RESTful APIs following best practices.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'API Project',
        description: 'Create a complete CRUD API with authentication.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Authentication & Security',
        description: 'Implement JWT, OAuth, and security best practices.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Testing & Documentation',
        description: 'Write tests and create comprehensive API documentation.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Microservices Architecture',
        description: 'Build scalable microservices and learn deployment strategies.',
        type: 'project',
        durationWeeks: 3,
      },
      {
        title: 'Backend Assessment',
        description: 'Complete a comprehensive backend development assessment.',
        type: 'assessment',
        durationWeeks: 1,
      },
      {
        title: 'Backend Developer Certificate',
        description: 'Earn your certificate and professional recommendations.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Mobile App Development': {
    milestones: [
      {
        title: 'Mobile Development Basics',
        description: 'Introduction to mobile platforms and development approaches.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'React Native Fundamentals',
        description: 'Learn React Native for cross-platform mobile development.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'UI/UX for Mobile',
        description: 'Design mobile interfaces and implement native components.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'First Mobile App',
        description: 'Build and deploy your first mobile application.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Native Features & APIs',
        description: 'Access device features like camera, location, and storage.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'State Management & Navigation',
        description: 'Implement navigation and state management in mobile apps.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Full Mobile Application',
        description: 'Build a complete mobile app with backend integration.',
        type: 'project',
        durationWeeks: 3,
      },
      {
        title: 'App Store Deployment',
        description: 'Publish your app to Google Play and Apple App Store.',
        type: 'assessment',
        durationWeeks: 1,
      },
      {
        title: 'Mobile Developer Certificate',
        description: 'Complete your certification with published apps portfolio.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'DevOps': {
    milestones: [
      {
        title: 'DevOps Fundamentals',
        description: 'Understanding DevOps culture, principles, and practices.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Linux & Shell Scripting',
        description: 'Master Linux commands and bash scripting for automation.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Version Control & Git',
        description: 'Advanced Git workflows, branching strategies, and collaboration.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'CI/CD Pipeline',
        description: 'Build automated CI/CD pipelines with GitHub Actions and Jenkins.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Docker & Containerization',
        description: 'Containerize applications with Docker and Docker Compose.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Kubernetes Orchestration',
        description: 'Deploy and manage containers at scale with Kubernetes.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Infrastructure as Code',
        description: 'Use Terraform and Ansible for infrastructure automation.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Complete DevOps Pipeline',
        description: 'Build end-to-end automated deployment infrastructure.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'DevOps Engineer Certificate',
        description: 'Earn your DevOps certification with industry recognition.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Product Management': {
    milestones: [
      {
        title: 'Product Management Foundations',
        description: 'Learn product lifecycle, strategy, and PM responsibilities.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Market Research & Analysis',
        description: 'Conduct user research and competitive analysis.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Product Strategy',
        description: 'Define product vision, roadmap, and prioritization frameworks.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Product Roadmap Project',
        description: 'Create a comprehensive product roadmap for a real product.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Agile & Scrum Methodologies',
        description: 'Master agile practices and lead product development teams.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Product Metrics & Analytics',
        description: 'Define KPIs and use data to drive product decisions.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Stakeholder Management',
        description: 'Communicate with stakeholders and manage expectations.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Product Launch Simulation',
        description: 'Plan and execute a complete product launch from start to finish.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'Product Manager Certificate',
        description: 'Receive certification and access to PM community.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Cloud Computing': {
    milestones: [
      {
        title: 'Cloud Computing Fundamentals',
        description: 'Introduction to cloud services, models (IaaS, PaaS, SaaS).',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'AWS Core Services',
        description: 'Master EC2, S3, RDS, and other essential AWS services.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Cloud Architecture Design',
        description: 'Design scalable, reliable cloud infrastructure.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Deploy Cloud Application',
        description: 'Deploy a complete web application on AWS.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Cloud Security',
        description: 'Implement security best practices and IAM policies.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Serverless Computing',
        description: 'Build serverless applications with AWS Lambda.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Multi-Cloud Strategy',
        description: 'Compare AWS, Azure, and Google Cloud platforms.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Cloud Solutions Architecture',
        description: 'Design and implement a complete cloud solution.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'Cloud Architect Certificate',
        description: 'Earn your cloud certification and AWS preparation.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Software Testing': {
    milestones: [
      {
        title: 'Testing Fundamentals',
        description: 'Learn testing types, principles, and QA methodologies.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Manual Testing',
        description: 'Master test case design, execution, and bug reporting.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Test Automation Basics',
        description: 'Introduction to test automation tools and frameworks.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Selenium WebDriver',
        description: 'Build automated web testing with Selenium.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'API Testing',
        description: 'Test REST APIs with Postman and automated frameworks.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Performance Testing',
        description: 'Load testing and performance analysis with JMeter.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'CI/CD for Testing',
        description: 'Integrate tests into CI/CD pipelines.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Complete Test Suite',
        description: 'Build a comprehensive test automation suite.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'QA Engineer Certificate',
        description: 'Earn your QA certification with testing portfolio.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Data Analytics': {
    milestones: [
      {
        title: 'Introduction to Data Analytics',
        description: 'Understanding data analytics role and business impact.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Excel for Data Analysis',
        description: 'Master Excel functions, pivot tables, and data visualization.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'SQL for Analytics',
        description: 'Query databases and join tables for analysis.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Data Cleaning Project',
        description: 'Clean and prepare real-world messy datasets.',
        type: 'project',
        durationWeeks: 1,
      },
      {
        title: 'Data Visualization',
        description: 'Create dashboards with Tableau and Power BI.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Statistical Analysis',
        description: 'Apply statistics for data-driven decision making.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Python for Analytics',
        description: 'Use Python and pandas for advanced data analysis.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Business Analytics Project',
        description: 'Complete analytics project with business insights.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'Data Analyst Certificate',
        description: 'Receive certification with analytics portfolio.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Business Intelligence': {
    milestones: [
      {
        title: 'BI Fundamentals',
        description: 'Learn BI concepts, tools, and data warehousing.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'SQL & Database Design',
        description: 'Advanced SQL and dimensional modeling.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'ETL Processes',
        description: 'Extract, Transform, Load data pipelines.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Power BI Mastery',
        description: 'Create interactive dashboards and reports.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Tableau Advanced',
        description: 'Advanced data visualization techniques.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Data Modeling',
        description: 'Design star schema and data warehouses.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'DAX & Calculations',
        description: 'Master DAX for complex business metrics.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'BI Solution Project',
        description: 'Build complete BI solution from data to insights.',
        type: 'assessment',
        durationWeeks: 3,
      },
      {
        title: 'BI Developer Certificate',
        description: 'Earn BI certification with professional portfolio.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Project Management': {
    milestones: [
      {
        title: 'Project Management Basics',
        description: 'Introduction to PM frameworks and methodologies.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Project Planning',
        description: 'Scope definition, WBS, and project charters.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Agile & Scrum',
        description: 'Master agile practices and Scrum ceremonies.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Project Plan Development',
        description: 'Create comprehensive project plan.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Risk Management',
        description: 'Identify and mitigate project risks.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Stakeholder Management',
        description: 'Communication and stakeholder engagement.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'PM Tools & Software',
        description: 'Master Jira, MS Project, and PM tools.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Capstone Project',
        description: 'Lead a complete project from initiation to closure.',
        type: 'assessment',
        durationWeeks: 2,
      },
      {
        title: 'Project Manager Certificate',
        description: 'PMP preparation and certification.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Product Design': {
    milestones: [
      {
        title: 'Design Thinking',
        description: 'Learn design thinking process and user-centered design.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'User Research',
        description: 'Conduct user interviews and research studies.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Wireframing & Prototyping',
        description: 'Create wireframes and interactive prototypes.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Mobile App Design Project',
        description: 'Design complete mobile app from research to prototype.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Visual Design',
        description: 'Typography, color theory, and visual hierarchy.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'UI Design Systems',
        description: 'Create scalable design systems and components.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Figma & Design Tools',
        description: 'Master Figma for professional design work.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Portfolio Project',
        description: 'Design complete product with case study.',
        type: 'assessment',
        durationWeeks: 3,
      },
      {
        title: 'Product Designer Certificate',
        description: 'Complete certification with design portfolio.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
  'Full Stack': {
    milestones: [
      {
        title: 'Full Stack Foundations',
        description: 'Overview of frontend, backend, and database technologies.',
        type: 'lesson',
        durationWeeks: 1,
      },
      {
        title: 'Frontend with React',
        description: 'Build modern user interfaces with React and Tailwind CSS.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Backend with Node.js',
        description: 'Create RESTful APIs with Express and Node.js.',
        type: 'lesson',
        durationWeeks: 3,
      },
      {
        title: 'Database Management',
        description: 'Work with PostgreSQL and MongoDB databases.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'CRUD Application',
        description: 'Build a full-stack CRUD application from scratch.',
        type: 'project',
        durationWeeks: 2,
      },
      {
        title: 'Authentication & Authorization',
        description: 'Implement secure user authentication and role-based access.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'State Management & Real-time',
        description: 'Add state management and WebSocket real-time features.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Deployment & DevOps',
        description: 'Deploy applications to cloud platforms with CI/CD.',
        type: 'lesson',
        durationWeeks: 2,
      },
      {
        title: 'Capstone Full Stack Project',
        description: 'Build and deploy a complete production-ready application.',
        type: 'assessment',
        durationWeeks: 4,
      },
      {
        title: 'Full Stack Developer Certificate',
        description: 'Receive certification with complete application portfolio.',
        type: 'certificate',
        durationWeeks: 0,
      },
    ],
  },
}

async function main() {
  console.log('Starting roadmap seed...')

  // Get all courses
  const courses = await prisma.course.findMany({
    include: { category: true, roadmap: true },
  })

  console.log(`Found ${courses.length} courses`)

  let created = 0
  let skipped = 0

  for (const course of courses) {
    // Check if course already has a roadmap
    if (course.roadmap) {
      console.log(`⏭️  Skipping "${course.title}" - roadmap already exists`)
      skipped++
      continue
    }

    // Find matching roadmap data by course title or category
    let milestones = null
    for (const [key, data] of Object.entries(roadmapData)) {
      if (
        course.title.toLowerCase().includes(key.toLowerCase()) ||
        course.category.name.toLowerCase().includes(key.toLowerCase())
      ) {
        milestones = data.milestones
        break
      }
    }

    if (!milestones) {
      console.log(`⚠️  No roadmap template for "${course.title}"`)
      continue
    }

    try {
      // Create roadmap with milestones
      const roadmap = await prisma.courseRoadmap.create({
        data: {
          courseId: course.id,
          description: `Complete learning path for ${course.title}`,
          milestones: {
            create: milestones.map((milestone, index) => ({
              ...milestone,
              sortOrder: index,
            })),
          },
        },
        include: {
          milestones: true,
        },
      })

      console.log(`✅ Created roadmap for "${course.title}" with ${roadmap.milestones.length} milestones`)
      created++
    } catch (error) {
      console.error(`❌ Error creating roadmap for "${course.title}":`, error)
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Total courses: ${courses.length}`)
}

main()
  .catch((e) => {
    console.error('Error in seed script:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
