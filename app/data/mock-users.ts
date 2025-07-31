

export const mockAdminUser = {
  name: "Alice Admin",
  email: "alice.admin@example.com",
  avatar: "/avatars/admin.jpg", // Optional avatar
  role: "admin" as const,
}

export const mockStudentUser = {
  name: "Steve Student",
  email: "steve.student@example.com",
  avatar: "/avatars/student.jpg",
  role: "student"  as const,
  phone: "123-456-7890",
  student_profile: {
    enrollment_year: 2023,
    status: "Active",
    courses: [
      {
        id: "c1",
        title: "Full Stack Web Development",
        progress: 72,
        description: "Master front-end and back-end web technologies.",
      },
      {
        id: "c2",
        title: "React Advanced Patterns",
        progress: 40,
        description: "Dive deeper into React architecture and design.",
      },
      {
        id: "c3",
        title: "TypeScript Essentials",
        progress: 90,
        description: "Strongly type your JavaScript for reliability and clarity.",
      },
      {
        id: "c4",
        title: "Node.js Backend APIs",
        progress: 55,
        description: "Learn how to build RESTful APIs with Node.js.",
      },
      {
        id: "c5",
        title: "UI/UX for Developers",
        progress: 30,
        description: "Design principles and prototyping for better interfaces.",
      },
      {
        id: "c6",
        title: "Database Design with PostgreSQL",
        progress: 80,
        description: "Normalize data, design schemas, and write queries.",
      },
      {
        id: "c7",
        title: "DevOps Basics",
        progress: 25,
        description: "CI/CD, Docker, and cloud deployment fundamentals.",
      },
      {
        id: "c8",
        title: "Python for Web Automation",
        progress: 60,
        description: "Use Python to automate browser tasks and workflows.",
      },
      {
        id: "c9",
        title: "GraphQL APIs",
        progress: 10,
        description: "Build flexible APIs with GraphQL and Apollo Server.",
      },
      {
        id: "c10",
        title: "Next.js in Production",
        progress: 50,
        description: "Deploy fast, secure and scalable React apps.",
      },
    ],
  },
}


