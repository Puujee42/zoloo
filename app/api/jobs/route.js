// /app/api/jobs/route.js

import { NextResponse } from 'next/server';

// --- Our Pseudo (Fake) Job Database ---
const jobs = [
    {
        id: 'job-001',
        title: 'Senior Frontend Engineer',
        company: 'Innovate Solutions Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$140,000 - $170,000 per year',
        postedDate: '3 days ago',
        description: 'Join our team to build the next generation of web applications using React and Next.js. You will be responsible for creating beautiful, high-performance user interfaces.',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma']
    },
    {
        id: 'job-002',
        title: 'UX/UI Designer',
        company: 'Creative Visions Studio',
        location: 'Remote',
        type: 'Contract',
        salary: '$60 - $85 per hour',
        postedDate: '1 week ago',
        description: 'We are looking for a talented designer to create intuitive and visually appealing interfaces for our mobile and web products. A strong portfolio is required.',
        skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD', 'Prototyping']
    },
    {
        id: 'job-003',
        title: 'Backend Developer (Node.js)',
        company: 'DataStream Analytics',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$130,000 - $160,000 per year',
        postedDate: '5 days ago',
        description: 'Develop and maintain our server-side logic, define and maintain the central database, and ensure high performance and responsiveness to requests from the front-end.',
        skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Docker']
    },
    {
        id: 'job-004',
        title: 'Digital Marketing Manager',
        company: 'Growth Gurus',
        location: 'Austin, TX (Hybrid)',
        type: 'Full-time',
        salary: '$85,000 - $110,000 per year',
        postedDate: '2 weeks ago',
        description: 'Lead our digital marketing campaigns across all channels. You will be responsible for SEO, SEM, social media, and content marketing strategies.',
        skills: ['SEO', 'Google Analytics', 'Content Marketing', 'Social Media Ads']
    }
];

// This is the function that will run when you make a GET request to /api/jobs
export async function GET(request) {
    try {
        // --- Simulate a real-world API delay ---
        // This is useful for testing loading states on your front-end.
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

        // Return the pseudo-data as a JSON response
        return NextResponse.json(
            { 
                success: true, 
                message: "Jobs fetched successfully",
                data: jobs 
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching jobs:", error);
        
        // In case of an unexpected error, send a server error response
        return NextResponse.json(
            { 
                success: false, 
                message: "Failed to fetch jobs due to a server error." 
            }, 
            { status: 500 }
        );
    }
}