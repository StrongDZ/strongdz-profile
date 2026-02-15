import { is } from 'drizzle-orm';
import { db } from '../src/db';
import { profile, experiences, projects, education, skills, awards } from '../src/db/schema';

async function seed() {
    console.log('🌱 Starting seeding process...');

    // --- 1. CLEAN UP ---
    console.log('🧹 Cleaning old data...');
    await db.delete(profile);
    await db.delete(experiences);
    await db.delete(projects);
    await db.delete(education);
    await db.delete(skills);
    await db.delete(awards);

    // --- 2. INSERT PROFILE ---
    console.log('👤 Seeding Profile...');
    await db.insert(profile).values({
        fullName: 'Hoàng Khải Mạnh',
        headline: 'Full-stack Developer | Web3 & Data Engineering Enthusiast',
        email: 'hoanmanh04@gmail.com',
        phone: '+(84) 846 116 111',
        location: 'Ha Noi, Vietnam',
        githubUrl: 'https://github.com/hoanmanh04',
        bio: 'A person who is highly responsible, progressive, always keeps an appropriate attitude and is humble. Eager to learn, fast acquisition, adapt quickly and stay positive in any situation. Good teamwork skills, problem-solving skills, data-driven strategic planning, critical thinking skills.',
        isAvailable: true,
    });

    // --- 3. INSERT EDUCATION ---
    console.log('🎓 Seeding Education...');
    await db.insert(education).values([
        {
            school: 'Hanoi University of Science and Technology (HUST)',
            degree: 'Global ICT',
            gpa: 'CPA: 3.77/4.0',
            achievements: 'HUST Academic Excellence Scholarship Type A: Semester 2023.2, 2024.1, 2024.2',
            startDate: 'Sep 2019',
            endDate: 'Present',
        },
        {
            school: 'Tran Phu Gifted High School',
            degree: 'High School Diploma',
            gpa: 'GPA: 9.2/10.0',
            achievements: 'Specialized Class',
            startDate: '2016',
            endDate: '2019',
        },
    ]);

    // --- 4. INSERT WORK EXPERIENCE ---
    console.log('💼 Seeding Work Experience...');
    await db.insert(experiences).values([
        {
            type: 'WORK',
            role: 'Web3 Backend Developer',
            company: 'A-star Group',
            location: 'Ha Noi, Vietnam',
            startDate: 'Sep 2022',
            endDate: 'Present',
            description: `- Managed and maintained production servers for Web3 DApps such as Orchai, Aimstrong.
- Developed automated investment and yield-farming bots.
- Implemented data management, data analytics pipelines, monitoring and alerting pipelines.`,
            traits: ['Typescript', 'Python', 'Docker', 'Express.js', 'Sanic', 'MongoDB', 'Redis', 'Subgraph'],
            order: 1,
        },
    ]);

    // --- 5. INSERT EXTRACURRICULAR ACTIVITIES ---
    console.log('🎯 Seeding Extracurricular Activities...');
    await db.insert(experiences).values([
        {
            type: 'ACTIVITY',
            role: 'Vice Leader of Social Activities',
            company: 'Volunteer Team @SOICT',
            location: 'HUST',
            startDate: 'Dec 2022',
            endDate: 'Dec 2024',
            description: `- Organized internal events and volunteer activities, managing event logistics.
- Supervised volunteer recruitment and coordinated team activities.`,
            traits: ['Leadership', 'Event Planning', 'Team Management'],
            order: 1,
        },
        {
            type: 'ACTIVITY',
            role: 'Teaching Assistant',
            company: 'Short Courses @SOICT',
            location: 'HUST',
            startDate: '2023',
            endDate: '2024',
            description: `- Supported instruction for "TIN HOC DAI CUONG", "Programming with Scratch" and "Kidemy's AI Summer Camp".
- Improved student engagement and retention for hundreds of learners through personalized mentoring.`,
            traits: ['Teaching', 'Mentoring', 'Education'],
            order: 2,
        },
    ]);

    // --- 6. INSERT PROJECTS ---
    console.log('🚀 Seeding Projects...');
    await db.insert(projects).values([
        {
            title: 'Financial Market Data Visualization',
            slug: 'financial-market-viz',
            brief: 'Online dashboard specifically designed for retail investors in Vietnam with real-time data.',
            content: `### Overview
This project aims to develop an online dashboard specifically designed for retail investors in Vietnam. Built a full-stack website consisting of front-end, API and back-end for comprehensive market analysis and visualization.

### Responsibilities
- Full-stack development
- Database design
- Real-time data integration using Kafka and WebSocket`,
            techStack: ['ReactJS', 'Node.js', 'Kafka', 'PostgreSQL', 'Elasticsearch', 'Chart.js', 'WebSocket'],
            demoUrl: '#',
            repoUrl: 'https://github.com/StrongDZ/GR1--Data-visualization-in-financial-market',
            featured: true,
        },
        {
            title: 'Monkey D.Vuvi - Travel Booking',
            slug: 'monkey-d-vuvi',
            brief: 'Vietnam Travel and Culture Website offering guides and booking system for yachts, hotels, and flights.',
            content: `### Overview
Our website offers travel guides and an easy-to-use booking system for yachts, hotels, and plane tickets to help visitors plan their trips efficiently.

### Responsibilities
- Full-stack development & Database design.
- Authentication system implementation.
- CRUD for users and bookings.
- Containerization and deployment.`,
            techStack: ['ReactJS', 'NodeJS', 'Java Spring Boot', 'PostgreSQL', 'Docker', 'Render'],
            demoUrl: '#',
            repoUrl: 'https://github.com/StrongDZ/monkey-D-vuvi',
            featured: true,
        },
        {
            title: 'AIMS - E-commerce Platform',
            slug: 'aims-ecommerce',
            brief: 'A full-stack e-commerce platform for physical media products with payment integration.',
            content: `### Overview
Full-stack e-commerce platform with features including user authentication, cart management, order processing, VNPay/Momo integration, rush order delivery, and admin dashboards.

### Responsibilities
- Full-stack development.
- Manage cart, view/search product for customers.
- CRUD products for product manager.`,
            techStack: ['Java Spring Boot', 'ReactJS', 'PostgreSQL', 'Design Patterns'],
            demoUrl: '#',
            repoUrl: 'https://github.com/StrongDZ/ISD.ICT.20242-07',
            featured: false,
        },
        {
            title: 'Timenest - Smart Schedule',
            slug: 'timenest',
            brief: 'Smart task management app with AI-powered assistant and personalized analytics.',
            content: `### Overview
Timenest features smart task scheduling, an AI-powered assistant for managing tasks via natural language, personalized analytics to track work habits, and group meeting scheduling.

### Responsibilities
- Full-stack development.
- Containerization with Docker.
- Database design.`,
            techStack: ['Javascript', 'HTML', 'CSS', 'MongoDB', 'Docker'],
            demoUrl: '#',
            repoUrl: 'https://github.com/StrongDZ/TIMENEST---PRODUCTION',
            featured: false,
        },
    ]);

    // --- 7. INSERT SKILLS ---
    console.log('🛠️ Seeding Skills...');
    await db.insert(skills).values([
        {
            category: 'Languages',
            items: [
                { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'C/C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' }
            ],
            displayOrder: 1
        },
        {
            category: 'Frameworks & Platforms',
            items: [
                { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/white' },
                { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                { name: 'Sanic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }, // Fallback for Sanic
                { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' }
            ],
            displayOrder: 2
        },
        {
            category: 'Database & Infrastructure',
            items: [
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
                { name: 'Elasticsearch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg' }, // Fallback/generic
                { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                { name: 'WebSocket', icon: 'https://cdn.simpleicons.org/socketdotio/white' }
            ],
            displayOrder: 3
        },
        {
            category: 'Tools & Utilities',
            items: [
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/white' },
                { name: 'Render', icon: 'https://cdn.simpleicons.org/render/white' },
                { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/orange' },
                { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
                { name: 'Oracle Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' }
            ],
            displayOrder: 4
        },
    ]);

    // --- 8. INSERT AWARDS & CERTIFICATES ---
    console.log('🏆 Seeding Awards...');
    await db.insert(awards).values([
        { title: 'Top 5 SOICT Hackathon 2024', issuer: "SOICT", type: 'AWARD', date: '2024' },
        { title: 'Top 6 Swinburne Hackathon 2024', issuer: "Swinburne", type: 'AWARD', date: '2024' },
        { title: 'Top 7 Tech Club Champion 2023', type: 'AWARD', date: '2023' },
        { title: 'National information technology consolation prize', type: 'AWARD', date: 'High School' },
        { title: 'IELTS 7.0', issuer: 'British Council', type: 'CERTIFICATE' },
        { title: 'Google Data Analytics Specialization', issuer: 'Google', type: 'CERTIFICATE' },
    ]);

    console.log('✅ Seeding completed successfully!');
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
