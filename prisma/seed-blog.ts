import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding blog data...')

  // Create blog categories
  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Articles about modern web development, frameworks, and best practices',
      type: 'BLOG',
    },
  })

  const tutorialsCategory = await prisma.category.upsert({
    where: { slug: 'tutorials' },
    update: {},
    create: {
      name: 'Tutorials',
      slug: 'tutorials',
      description: 'Step-by-step guides and tutorials',
      type: 'BLOG',
    },
  })

  const newsCategory = await prisma.category.upsert({
    where: { slug: 'news' },
    update: {},
    create: {
      name: 'News',
      slug: 'news',
      description: 'Latest news and updates',
      type: 'BLOG',
    },
  })

  console.log('✅ Created blog categories')

  // Get or create admin user
  let admin = await prisma.admin.findFirst()

  if (!admin) {
    console.log('⚠️  No admin user found. Please create an admin user first.')
    return
  }

  // Update admin with profile info (only if not already set)
  if (!admin.fullName) {
    admin = await prisma.admin.update({
      where: { id: admin.id },
      data: {
        fullName: admin.username,
        bio: admin.bio || 'Developer and educator passionate about making technology accessible to everyone.',
      },
    })
  }

  // Create sample blog posts
  const post1 = await prisma.blogPost.upsert({
    where: { slug: 'getting-started-with-nextjs-15' },
    update: {},
    create: {
      title: 'Getting Started with Next.js 15',
      slug: 'getting-started-with-nextjs-15',
      excerpt: 'Learn the fundamentals of Next.js 15 and build your first modern web application.',
      content: `
        <h2>Introduction</h2>
        <p>Next.js 15 brings exciting new features and improvements to the React framework. In this tutorial, we'll explore the key features and build a simple application.</p>

        <h3>What's New in Next.js 15</h3>
        <ul>
          <li>React Server Components by default</li>
          <li>Improved performance and caching</li>
          <li>Enhanced image optimization</li>
          <li>Better TypeScript support</li>
        </ul>

        <h3>Setting Up Your First Project</h3>
        <p>To get started, run the following command:</p>
        <pre><code>npx create-next-app@latest my-app</code></pre>

        <p>This will create a new Next.js project with all the necessary configuration.</p>

        <h3>Project Structure</h3>
        <p>Next.js 15 uses the new App Router by default. Here's a basic structure:</p>
        <ul>
          <li><code>/app</code> - Your application pages and layouts</li>
          <li><code>/components</code> - Reusable React components</li>
          <li><code>/public</code> - Static assets</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Next.js 15 makes it easier than ever to build modern web applications. Stay tuned for more tutorials!</p>
      `,
      categoryId: webDevCategory.id,
      authorId: admin.id,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-15'),
      tags: ['nextjs', 'react', 'web-development', 'tutorial'],
      keywords: ['Next.js 15', 'React', 'Web Development', 'Tutorial'],
      isFeatured: true,
      readingTime: 5,
      metaDescription: 'Learn how to get started with Next.js 15 and build modern web applications with React Server Components.',
    },
  })

  const post2 = await prisma.blogPost.upsert({
    where: { slug: 'typescript-best-practices-2024' },
    update: {},
    create: {
      title: 'TypeScript Best Practices for 2024',
      slug: 'typescript-best-practices-2024',
      excerpt: 'Discover the latest TypeScript best practices and patterns to write better, more maintainable code.',
      content: `
        <h2>Why TypeScript?</h2>
        <p>TypeScript has become the de facto standard for building large-scale JavaScript applications. Here are some best practices to follow.</p>

        <h3>1. Use Strict Mode</h3>
        <p>Always enable strict mode in your tsconfig.json:</p>
        <pre><code>{
  "compilerOptions": {
    "strict": true
  }
}</code></pre>

        <h3>2. Leverage Type Inference</h3>
        <p>TypeScript's type inference is powerful. Let it do the work:</p>
        <pre><code>// Good
const count = 5;

// Unnecessary
const count: number = 5;</code></pre>

        <h3>3. Use Interfaces for Object Types</h3>
        <p>Interfaces are more extensible than type aliases for object shapes.</p>

        <h3>4. Avoid Any</h3>
        <p>The <code>any</code> type defeats the purpose of TypeScript. Use <code>unknown</code> when you truly don't know the type.</p>

        <h3>Conclusion</h3>
        <p>Following these practices will help you write more maintainable TypeScript code.</p>
      `,
      categoryId: tutorialsCategory.id,
      authorId: admin.id,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-02-01'),
      tags: ['typescript', 'javascript', 'best-practices', 'coding'],
      keywords: ['TypeScript', 'Best Practices', 'JavaScript', 'Programming'],
      isFeatured: true,
      readingTime: 7,
    },
  })

  const post3 = await prisma.blogPost.upsert({
    where: { slug: 'building-rest-apis-with-nodejs' },
    update: {},
    create: {
      title: 'Building RESTful APIs with Node.js',
      slug: 'building-rest-apis-with-nodejs',
      excerpt: 'A comprehensive guide to building scalable and secure REST APIs using Node.js and Express.',
      content: `
        <h2>Introduction to REST APIs</h2>
        <p>REST (Representational State Transfer) is an architectural style for building web services. Let's build one with Node.js!</p>

        <h3>Setting Up Express</h3>
        <p>First, install the required packages:</p>
        <pre><code>npm install express</code></pre>

        <h3>Creating Your First Endpoint</h3>
        <pre><code>const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);</code></pre>

        <h3>Best Practices</h3>
        <ul>
          <li>Use proper HTTP status codes</li>
          <li>Implement error handling</li>
          <li>Validate input data</li>
          <li>Use middleware for authentication</li>
        </ul>

        <h3>Conclusion</h3>
        <p>Building REST APIs with Node.js is straightforward with Express. Follow these patterns for success!</p>
      `,
      categoryId: tutorialsCategory.id,
      authorId: admin.id,
      status: 'PUBLISHED',
      publishedAt: new Date('2024-02-10'),
      tags: ['nodejs', 'api', 'express', 'backend'],
      keywords: ['Node.js', 'REST API', 'Express', 'Backend Development'],
      readingTime: 8,
    },
  })

  const post4 = await prisma.blogPost.upsert({
    where: { slug: 'draft-post-coming-soon' },
    update: {},
    create: {
      title: 'Exciting New Features Coming Soon',
      slug: 'draft-post-coming-soon',
      excerpt: 'We have some exciting announcements to share with you soon!',
      content: `
        <h2>Stay Tuned!</h2>
        <p>This is a draft post that will be published soon.</p>
      `,
      categoryId: newsCategory.id,
      authorId: admin.id,
      status: 'DRAFT',
      tags: ['news', 'announcement'],
      readingTime: 2,
    },
  })

  console.log('✅ Created sample blog posts')
  console.log(`
📝 Blog data seeded successfully!

Created:
- ${webDevCategory.name} category
- ${tutorialsCategory.name} category
- ${newsCategory.name} category
- ${post1.title} (Published, Featured)
- ${post2.title} (Published, Featured)
- ${post3.title} (Published)
- ${post4.title} (Draft)

You can now:
1. Visit /blog to see published posts
2. Visit /admin/blog/posts to manage posts
3. Create blog categories at /admin/categories (select type: BLOG)
  `)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
