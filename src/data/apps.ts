export interface App {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  icon: string;
  tags: string[];
  features: string[];
  previewImage: string;
  category: string;
}

export const apps: App[] = [
  {
    id: "demo-game-1",
    name: "Demo Game 1",
    shortDescription: "Track workouts, calories, and health metrics with an intuitive dashboard.",
    description:
      "A comprehensive fitness tracking application built on Unity that helps users monitor their daily workouts, calorie intake, sleep patterns, and overall health metrics. Features beautiful data visualizations, personalized workout plans, and social sharing capabilities. This Unity-based application can be fully customized through our platform to match your brand identity.",
    price: 49,
    icon: "/icon-game-1.png",
    tags: ["Health", "Fitness", "Unity"],
    features: [
      "Workout tracking with 200+ exercises",
      "Calorie & nutrition logging",
      "Sleep quality monitoring",
      "Progress charts & analytics",
      "Social challenges & leaderboards",
      "Customizable UI themes",
    ],
    previewImage: "/preview-fitness.svg",
    category: "Health & Fitness",
  },
  {
    id: "demo-game-2",
    name: "Demo Game 2",
    shortDescription: "Interactive quiz platform for engaging educational experiences.",
    description:
      "An interactive quiz and learning management platform powered by Unity's rich media capabilities. Create engaging quizzes, flashcards, and interactive lessons. Perfect for educators and corporate training programs. Fully customizable branding and theme options available through our marketplace editor.",
    price: 39,
    icon: "/icon-game-2.png",
    tags: ["Education", "Quiz", "Unity"],
    features: [
      "Drag-and-drop quiz builder",
      "Multiple question types",
      "Real-time scoring & analytics",
      "Student progress tracking",
      "Certificate generation",
      "Custom branding support",
    ],
    previewImage: "/preview-quiz.svg",
    category: "Education",
  },
  {
    id: "demo-game-3",
    name: "Demo Game 3",
    shortDescription: "Organize projects and boost team productivity effortlessly.",
    description:
      "A powerful project and task management application built on Unity for rich interactive experiences. Features Kanban boards, Gantt charts, time tracking, and team collaboration tools. Designed for teams of all sizes with customizable workflows and branding options.",
    price: 59,
    icon: "/icon-game-3.png",
    tags: ["Productivity", "Management", "Unity"],
    features: [
      "Kanban & list views",
      "Gantt chart timeline",
      "Time tracking & reports",
      "Team collaboration & chat",
      "Automated workflows",
      "Custom fields & labels",
    ],
    previewImage: "/preview-task.svg",
    category: "Productivity",
  },
  {
    id: "demo-game-4",
    name: "Demo Game 4",
    shortDescription: "Unity-powered gaming analytics and player management console.",
    description:
      "A comprehensive gaming dashboard built entirely in Unity, providing real-time player analytics, game performance metrics, in-app purchase management, and player engagement tools. Perfect for game studios looking for a customizable admin panel for their Unity games.",
    price: 79,
    icon: "/icon-game-4.png",
    tags: ["Gaming", "Analytics", "Unity"],
    features: [
      "Real-time player analytics",
      "Revenue & IAP tracking",
      "Player segmentation",
      "Push notification manager",
      "A/B testing dashboard",
      "Custom event tracking",
    ],
    previewImage: "/preview-game.svg",
    category: "Gaming",
  },
  {
    id: "demo-game-5",
    name: "Demo Game 5",
    shortDescription: "Smart study scheduling with AI-powered recommendations.",
    description:
      "An intelligent study planning application that helps students organize their academic schedule, set study goals, and track progress. Built on Unity for a smooth, engaging interface with gamification elements to keep students motivated.",
    price: 29,
    icon: "/icon-game-5.png",
    tags: ["Education", "Planning", "Unity"],
    features: [
      "Smart schedule generator",
      "Goal setting & tracking",
      "Pomodoro timer built-in",
      "Subject-wise analytics",
      "Gamification & rewards",
      "Calendar integration",
    ],
    previewImage: "/preview-study.svg",
    category: "Education",
  },
  {
    id: "demo-game-6",
    name: "Demo Game 6",
    shortDescription: "Automate repetitive workflows with visual flow builder.",
    description:
      "A visual workflow automation tool built with Unity's powerful UI system. Create complex automation flows with a drag-and-drop interface, connect to popular services, and automate repetitive tasks. Fully customizable to match your organization's branding.",
    price: 69,
    icon: "/icon-game-6.png",
    tags: ["Automation", "Workflow", "Unity"],
    features: [
      "Visual flow builder",
      "100+ integration connectors",
      "Conditional logic & branching",
      "Scheduled triggers",
      "Error handling & logging",
      "Team sharing & permissions",
    ],
    previewImage: "/preview-automation.svg",
    category: "Automation",
  },
];

export const categories = [
  "All",
  "Health & Fitness",
  "Education",
  "Productivity",
  "Gaming",
  "Automation",
];

export function getAppById(id: string): App | undefined {
  return apps.find((app) => app.id === id);
}
