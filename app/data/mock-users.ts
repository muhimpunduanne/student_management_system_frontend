interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

const courseDetails: Record<string, Omit<Course, "id" | "progress">> = {
  "web-dev": {
    title: "Web Development",
    description: "Learn HTML, CSS, and JavaScript to build websites.",
  },
  "ui-ux": {
    title: "UI/UX Design",
    description: "Design stunning user interfaces and user experiences.",
  },
  cloud: {
    title: "Cloud Computing",
    description: "Understand cloud infrastructure and services.",
  },
  data: {
    title: "Data Science",
    description: "Explore data analysis, visualization, and ML basics.",
  },
  ai: {
    title: "Artificial Intelligence",
    description: "Dive into AI concepts and applications.",
  },
  business: {
    title: "Business Fundamentals",
    description: "Learn business skills and management.",
  },
  marketing: {
    title: "Marketing",
    description: "Master digital marketing strategies.",
  },
  finance: {
    title: "Finance",
    description: "Get introduced to financial planning and management.",
  },
  cybersec: {
    title: "Cyber Security",
    description: "Protect systems and networks from cyber threats.",
  },
  iot: {
    title: "Internet of Things",
    description: "Connect and control devices over the internet.",
  },
  project: {
    title: "Project Management",
    description: "Plan, execute, and close projects effectively.",
  },
  graphic: {
    title: "Graphic Design",
    description: "Create visual content using design tools.",
  },
};

// Convert courseDetails object into an array of Course with progress
const mockCourses: Course[] = Object.entries(courseDetails).map(([id, details]) => ({
  id,
  title: details.title,
  description: details.description,
  progress: Math.floor(Math.random() * 101), // random progress 0-100%
}));

export { mockCourses };
