export interface BlogPreview {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
  };
}

export const FEATURED_BLOG_PREVIEWS: BlogPreview[] = [
  {
    id: "blog-0",
    slug: "why-arnav-abacus-academy-exists-building-future-ready-children",
    title: "Why Arnav Abacus Academy Exists: Building Future-Ready Children, Not Just Fast Calculators",
    excerpt: "Discover how we transform math anxiety into lifelong cognitive confidence, focus, and logical problem-solving for children in Wakad, Pune, and globally.",
    category: "Brain Development",
    coverImage: "/why_aaa_exists.jpg",
    readTime: "6 min read",
    publishedAt: "July 31, 2026",
    author: {
      name: "Neha Patil",
    },
  },
  {
    id: "blog-championship-2026",
    slug: "national-level-abacus-vedic-maths-championship-2026",
    title: "National Level Abacus & Vedic Maths Championship 2026: 56 Students Competing Under AVAS & IIVA",
    excerpt: "Witness our young math wizards in action! Celebrating 56 student finalists competing at state and national speed math championships.",
    category: "Competitions",
    coverImage: "/blog/national-abacus-vedic-maths-championship-2026.webp",
    readTime: "4 min read",
    publishedAt: "Oct 18, 2026",
    author: {
      name: "Neha Patil",
    },
  },
  {
    id: "blog-1",
    slug: "5-reasons-why-abacus-is-essential-in-the-digital-age",
    title: "5 Reasons Why Abacus Training is Essential in the AI & Smartphone Age",
    excerpt: "In an era where calculators and AI solve sums in seconds, why should children still learn abacus? Here is what neuroscience reveals.",
    category: "Neuroscience",
    coverImage: "/abacus_digital_age.jpg",
    readTime: "5 min read",
    publishedAt: "August 2, 2026",
    author: {
      name: "Neha Patil",
    },
  },
];
