/* Everything the site says, in one place. The wording is the Foundation's
   own content plan, kept as written; only line breaks and list shapes are
   ours. Nothing here is invented: no figures, no partners, no testimonials. */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Paths into /public need the base path when the site is served from a
    sub-folder (GitHub Pages). next/image does not add it to string paths. */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

export const ORG = {
  name: "Gramya Sarvodaya Foundation",
  short: "GSF",
  motto: "Strong Villages, Prosperous Nation",
  tagline: "Empowering Villages. Enriching Lives. Building a Sustainable Future.",
  philosophy: "Sarvodaya – Welfare of All.",
  email: "gramyasarvodaya@gmail.com",
  phone: "+91 96780 70943",
  phoneHref: "tel:+919678070943",
  website: "www.gramyasarvodaya.org",
  url: "https://www.gramyasarvodaya.org",
  // As printed on the Foundation's own letterhead banner.
  office: ["Bhatemora, Pulibor", "Jorhat, Assam – 785006, India"],
  year: 2026,
};

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

export const NAV: NavItem[] = [
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about", label: "Who we are" },
      { href: "/about#philosophy", label: "Our philosophy" },
      { href: "/about#gandhian-ideology", label: "Gandhian ideology" },
      { href: "/about#vision-mission", label: "Vision & mission" },
    ],
  },
  {
    href: "/programmes",
    label: "Our Programmes",
    children: [
      { href: "/programmes", label: "All 12 programmes" },
      { href: "/programmes/sustainable-agriculture", label: "Natural farming" },
      { href: "/programmes/farmer-producer-company", label: "Farmer Producer Companies" },
      { href: "/programmes/gramya-udyog", label: "Gramya Udyog" },
      { href: "/programmes/womens-empowerment", label: "Women's empowerment" },
      { href: "/programmes/environment", label: "Environment & energy" },
    ],
  },
  { href: "/approach", label: "Our Approach" },
  { href: "/impact", label: "Our Impact" },
  {
    href: "/get-involved",
    label: "Get Involved",
    children: [
      { href: "/get-involved#volunteer", label: "Volunteer" },
      { href: "/get-involved#partnerships", label: "Partner with us" },
      { href: "/get-involved#entrepreneurs", label: "Support rural entrepreneurs" },
    ],
  },
  {
    href: "/resources",
    label: "Resources",
    children: [
      { href: "/resources#news", label: "News" },
      { href: "/resources#gallery", label: "Gallery" },
      { href: "/resources#publications", label: "Publications" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programmes", label: "Our Programmes" },
  { href: "/approach", label: "Our Approach" },
  { href: "/get-involved#partnerships", label: "Partnerships" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact Us" },
];

export const INTRO =
  "Inspired by Gandhian philosophy, Gramya Sarvodaya Foundation works towards creating self-reliant villages through sustainable agriculture, rural entrepreneurship, education, environmental conservation, community empowerment and inclusive development.";

export const HOME = {
  title: "Building Self-Reliant Villages for a Prosperous Nation",
  lede: "Gramya Sarvodaya Foundation is committed to transforming rural communities through sustainable development, economic empowerment, environmental protection and social inclusion.",
  body: "We believe that the real progress of a nation begins with the development of its villages. Our approach combines traditional knowledge, local resources, community participation and modern innovation to build resilient and prosperous rural communities.",
};

export const ABOUT = {
  who: [
    "Gramya Sarvodaya Foundation is a rural development-oriented organization dedicated to promoting inclusive, sustainable and community-led development.",
    "The Foundation works to strengthen rural livelihoods, encourage local entrepreneurship, promote sustainable agricultural practices, protect natural resources and create opportunities for women, youth, farmers and marginalized communities.",
    "We believe that villages should become centres of economic opportunity, environmental sustainability, cultural preservation and social harmony.",
    "Our work is guided by the principle that development must reach every individual and every community.",
  ],
  name: [
    { term: "Gramya", text: "Village, rural life and community-based development." },
    { term: "Sarvodaya", text: "The welfare, upliftment and prosperity of all." },
  ],
  together:
    "Together, Gramya Sarvodaya represents the holistic development of rural communities for the welfare of society.",
};

export const PRINCIPLES = [
  { term: "Sarvodaya", text: "Welfare of All." },
  { term: "Gram Swaraj", text: "Self-reliant and self-governing villages." },
  { term: "Swadeshi", text: "Promotion of local products and industries." },
  { term: "Ahimsa", text: "Peace, harmony and non-violence." },
  { term: "Satya", text: "Truth and transparency." },
  { term: "Trusteeship", text: "Responsible use of resources for society." },
  { term: "Antyodaya", text: "Priority to the most disadvantaged." },
];

export const VISION =
  "To build an inclusive, sustainable and self-reliant rural society where every individual has access to livelihood opportunities, education, healthcare awareness, economic participation and a dignified life.";

export const MISSION = [
  "Promote sustainable agriculture and natural farming.",
  "Strengthen farmer institutions and collective enterprises.",
  "Empower women and rural youth through skills and entrepreneurship.",
  "Establish rural industries using local resources.",
  "Promote environmental conservation and renewable energy.",
  "Encourage green education and environmental awareness.",
  "Develop agro-tourism and rural livelihood opportunities.",
  "Promote community participation and financial inclusion.",
  "Support waste management and circular economy initiatives.",
  "Preserve traditional knowledge, culture and rural heritage.",
];

export const APPROACH = [
  "Community identification and participation.",
  "Assessment of local needs and resources.",
  "Capacity building and skill development.",
  "Institutional development.",
  "Livelihood and enterprise creation.",
  "Market and technology linkages.",
  "Monitoring and evaluation.",
  "Long-term community sustainability.",
];

export const VALUES = [
  "Inclusiveness",
  "Transparency",
  "Accountability",
  "Sustainability",
  "Community participation",
  "Equality and dignity",
  "Environmental responsibility",
  "Innovation",
  "Self-reliance",
  "Service to humanity",
];

export const JOIN = [
  {
    id: "volunteer",
    title: "Become a Volunteer",
    text: "Contribute your time, knowledge and skills to rural development.",
    icon: "volunteer",
  },
  {
    id: "partner",
    title: "Become a Development Partner",
    text: "Collaborate with us on sustainable agriculture, education, environment and livelihood projects.",
    icon: "partner",
  },
  {
    id: "entrepreneurs",
    title: "Support Rural Entrepreneurs",
    text: "Help village enterprises develop products, skills and market opportunities.",
    icon: "enterprise",
  },
  {
    id: "supporter",
    title: "Become a Community Supporter",
    text: "Participate in campaigns and initiatives that strengthen rural communities.",
    icon: "community",
  },
] as const;

export const PARTNERS = [
  "Government departments and institutions.",
  "Corporate CSR organizations.",
  "Universities and research institutions.",
  "Agricultural institutions.",
  "NGOs and development organizations.",
  "Farmer Producer Organizations.",
  "Cooperative institutions.",
  "Social enterprises.",
  "National and international development agencies.",
];

export type IconName =
  | "agriculture"
  | "fpc"
  | "ffs"
  | "tourism"
  | "education"
  | "udyog"
  | "wellness"
  | "finance"
  | "women"
  | "youth"
  | "environment"
  | "waste"
  | "volunteer"
  | "partner"
  | "enterprise"
  | "community"
  | "mail"
  | "phone"
  | "pin"
  | "globe"
  | "news"
  | "gallery"
  | "publication"
  | "project"
  | "activity"
  | "report";

export type Programme = {
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  intro: string[];
  lists: { heading: string; items: string[] }[];
  motto?: string;
  /** A boundary the page must state plainly: what the Foundation is not. */
  note?: { heading: string; text: string[] };
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "sustainable-agriculture",
    title: "Sustainable Agriculture & Natural Farming",
    short: "Natural Farming",
    icon: "agriculture",
    intro: [
      "We promote environmentally responsible agriculture that improves soil health, conserves water and strengthens farmers' livelihoods.",
    ],
    lists: [
      {
        heading: "Our initiatives include",
        items: [
          "Natural farming awareness.",
          "Organic farming education.",
          "Soil health management.",
          "Composting and vermicomposting.",
          "Integrated farming systems.",
          "Water conservation.",
          "Climate-resilient agriculture.",
          "Farmer training and demonstrations.",
          "Sustainable agricultural entrepreneurship.",
        ],
      },
    ],
    motto: "Healthy Soil, Healthy Crops, Prosperous Farmers.",
  },
  {
    slug: "farmer-producer-company",
    title: "Farmer Producer Company (FPC) Support",
    short: "Farmer Producer Companies",
    icon: "fpc",
    intro: [
      "We encourage farmers to work collectively through Farmer Producer Companies and producer institutions.",
      "We aim to support farmer collectivization, institutional development, business planning and market-oriented agricultural enterprises.",
    ],
    lists: [
      {
        heading: "Benefits of FPC",
        items: [
          "Collective bargaining power.",
          "Better access to markets.",
          "Reduced input and production costs.",
          "Bulk procurement opportunities.",
          "Improved access to technical knowledge.",
          "Value addition and processing.",
          "Branding and packaging support.",
          "Better market linkages.",
          "Collective business development.",
          "Stronger farmer institutions.",
        ],
      },
    ],
    note: {
      heading: "How we support FPCs",
      text: [
        "A Farmer Producer Company is owned by its farmer members and registered in its own name. The Foundation helps farmers understand FPC formation and membership, and supports their institutional development, business planning and market linkages.",
        "Gramya Sarvodaya Foundation is not itself a Farmer Producer Company, and does not act as one.",
      ],
    },
  },
  {
    slug: "farm-field-school",
    title: "Farm Field School (FFS)",
    short: "Farm Field Schools",
    icon: "ffs",
    intro: [
      "Farm Field School is a participatory learning approach that allows farmers to learn directly from agricultural fields.",
    ],
    lists: [
      {
        heading: "Our activities",
        items: [
          "Practical field demonstrations.",
          "Crop management training.",
          "Pest and disease identification.",
          "Soil and water management.",
          "Natural farming practices.",
          "Farmer-to-farmer learning.",
          "Climate-smart agriculture.",
          "Seasonal agricultural training.",
        ],
      },
    ],
    motto: "Learn. Observe. Practice. Succeed.",
  },
  {
    slug: "agro-tourism",
    title: "Agro Tourism",
    short: "Agro Tourism",
    icon: "tourism",
    intro: [
      "We promote agro-tourism as an alternative rural livelihood and an opportunity to connect visitors with agriculture, culture and nature.",
    ],
    lists: [
      {
        heading: "Activities",
        items: [
          "Farm visits and field experiences.",
          "Village lifestyle experiences.",
          "Traditional food and cooking.",
          "Organic farming demonstrations.",
          "Fruit and vegetable harvesting.",
          "Rural homestays.",
          "Traditional crafts and cultural activities.",
          "Nature walks and birdwatching.",
          "Educational farm visits.",
          "Local product exhibitions.",
        ],
      },
      {
        heading: "Benefits",
        items: [
          "Additional income for farmers.",
          "Rural employment generation.",
          "Promotion of local culture.",
          "Opportunities for women entrepreneurs.",
          "Market development for local products.",
          "Environmental awareness.",
          "Rural infrastructure development.",
        ],
      },
    ],
    motto: "Experience Agriculture. Embrace Nature. Enrich Lives.",
  },
  {
    slug: "green-education",
    title: "Green Education",
    short: "Green Education",
    icon: "education",
    intro: [
      "We believe education should develop environmental responsibility, practical knowledge and sustainable lifestyles.",
    ],
    lists: [
      {
        heading: "Our initiatives",
        items: [
          "Environmental awareness programmes.",
          "School plantation campaigns.",
          "Climate education.",
          "Biodiversity conservation.",
          "Waste management education.",
          "Water conservation awareness.",
          "Renewable energy awareness.",
          "Green clubs and student activities.",
          "Sustainable agriculture education.",
          "Eco-friendly school initiatives.",
        ],
      },
    ],
    motto: "Learn Green. Live Green. Lead Green.",
  },
  {
    slug: "gramya-udyog",
    title: "Gramya Udyog – Rural Industries",
    short: "Gramya Udyog",
    icon: "udyog",
    intro: [
      "Gramya Udyog focuses on developing village-based industries by utilizing local resources, traditional skills and modern technologies.",
    ],
    lists: [
      {
        heading: "Focus industries",
        items: [
          "Bamboo-based industries.",
          "Handloom and handicrafts.",
          "Agro and food processing.",
          "Natural and herbal products.",
          "Dairy and animal-based enterprises.",
          "Village-based manufacturing.",
          "Traditional craft industries.",
          "Renewable energy solutions.",
          "Waste-to-wealth enterprises.",
          "Rural service enterprises.",
        ],
      },
      {
        heading: "Our support",
        items: [
          "Entrepreneurship development.",
          "Skill training.",
          "Product development.",
          "Packaging and branding.",
          "Market linkages.",
          "Business planning.",
          "Technology awareness.",
          "Enterprise incubation.",
        ],
      },
    ],
    motto: "Local Resources. Local Skills. Local Enterprises. Global Impact.",
  },
  {
    slug: "wellness",
    title: "Natural Wellness Initiative",
    short: "Natural Wellness",
    icon: "wellness",
    intro: [
      "We envision promoting holistic wellness through nature-based living, preventive health awareness and responsible traditional wellness practices.",
    ],
    lists: [
      {
        heading: "Proposed wellness activities",
        items: [
          "Yoga and meditation.",
          "Pranayama and breathing practices.",
          "Nutrition and healthy food awareness.",
          "Medicinal plant gardens.",
          "Traditional wellness education.",
          "Nature-based relaxation.",
          "Healthy lifestyle workshops.",
          "Wellness awareness programmes.",
        ],
      },
    ],
    motto: "Back to Nature. Back to Health. Back to Life.",
    note: {
      heading: "Wellness education, not clinical treatment",
      text: [
        "The activities above are wellness education and awareness. They are not medical treatment.",
        "Any medical treatment or clinical service will be provided only through appropriately qualified and legally authorized professionals and facilities.",
      ],
    },
  },
  {
    slug: "financial-inclusion",
    title: "Community Financial Inclusion",
    short: "Financial Inclusion",
    icon: "finance",
    intro: [
      "We promote financial literacy, responsible savings habits, entrepreneurship awareness and access to appropriate financial services.",
      "We also encourage the development of community-based cooperative institutions in accordance with applicable laws and regulatory requirements.",
    ],
    lists: [
      {
        heading: "Focus areas",
        items: [
          "Financial literacy.",
          "Savings awareness.",
          "Rural entrepreneurship finance education.",
          "Self-help group development.",
          "Women-led enterprise awareness.",
          "Cooperative education.",
          "Responsible borrowing awareness.",
          "Institutional financial inclusion.",
        ],
      },
    ],
    note: {
      heading: "What the Foundation does not do",
      text: [
        "Gramya Sarvodaya Foundation does not accept deposits, lend money or provide any regulated financial service. Our role is education and awareness.",
        "Any credit cooperative society will be a separate institution under its own registration. It will be shown on this website only after its registration and permitted activities are confirmed.",
      ],
    },
  },
  {
    slug: "womens-empowerment",
    title: "Women's Empowerment",
    short: "Women's Empowerment",
    icon: "women",
    intro: ["Women are essential contributors to rural economic and social development."],
    lists: [
      {
        heading: "Our initiatives",
        items: [
          "Self-help group development.",
          "Entrepreneurship training.",
          "Skill development.",
          "Livelihood promotion.",
          "Financial literacy.",
          "Leadership development.",
          "Handloom and handicraft enterprises.",
          "Agricultural value addition.",
          "Market access for women-led products.",
        ],
      },
    ],
    motto: "Empowered Women. Strong Families. Prosperous Communities.",
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment & Skill Development",
    short: "Youth & Skills",
    icon: "youth",
    intro: [
      "We work towards creating opportunities for rural youth through education, skills and entrepreneurship.",
    ],
    lists: [
      {
        heading: "Focus areas",
        items: [
          "Vocational training.",
          "Digital literacy.",
          "Entrepreneurship development.",
          "Agricultural technology awareness.",
          "Green jobs.",
          "Rural business development.",
          "Leadership programmes.",
          "Career awareness.",
          "Innovation and incubation.",
        ],
      },
    ],
  },
  {
    slug: "environment",
    title: "Environmental Conservation & Renewable Energy",
    short: "Environment & Energy",
    icon: "environment",
    intro: [
      "We promote responsible use of natural resources and environmentally sustainable development.",
    ],
    lists: [
      {
        heading: "Our activities",
        items: [
          "Tree plantation.",
          "Biodiversity conservation.",
          "Water conservation.",
          "Renewable energy awareness.",
          "Solar energy promotion.",
          "Waste segregation.",
          "Plastic reduction.",
          "Community cleanliness campaigns.",
          "Natural resource protection.",
        ],
      },
    ],
  },
  {
    slug: "waste-to-wealth",
    title: "Waste-to-Wealth & Circular Economy",
    short: "Waste-to-Wealth",
    icon: "waste",
    intro: [
      "We encourage communities to transform waste materials into useful products and economic opportunities.",
    ],
    lists: [
      {
        heading: "Focus areas",
        items: [
          "Waste segregation.",
          "Organic waste composting.",
          "Recycling awareness.",
          "Agricultural waste utilization.",
          "Bamboo and natural fibre products.",
          "Reuse and resource recovery.",
          "Community waste management.",
          "Circular economy entrepreneurship.",
        ],
      },
    ],
    motto: "Reduce. Reuse. Recycle. Regenerate.",
  },
];

export function getProgramme(slug: string) {
  return PROGRAMMES.find((p) => p.slug === slug);
}

/** Said once on the programmes pages: they describe intended work. */
export const PROGRAMME_STATUS =
  "These pages set out the work the Foundation intends to do in each area. Projects will be listed on the Our Impact page as they begin, with what they have actually done.";

export const LEGAL_PENDING =
  "Official registration details, governing-body information, statutory registrations, and applicable tax exemption details will be added after verification from the Foundation's official documents.";
