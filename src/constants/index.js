import {
  excel,
  trading,
  ai,
  dice,
  tutor,
  plate,
  javascript,
  html,
  css,
  jb,
  bdo,
  bright,
  bath,
  bhlive,
  pwc,
  mna,
  fxalgo,
  option,
  monty,
  powerpoint,
  python,
  R,
  word,
  amplify,
  jpmorgan,
  college,
  springfield,
  golf,
  football,
  macro,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "other_experience",
    title: "Other Experience",
  },
  {
    id: "tech",
    title: "Skills",
  },
];

const services = [
  {
    title: "Mathematician",
    icon: dice,
  },
  {
    title: "Financial Modelling",
    icon: excel,
  },
  {
    title: "Algorithmic Trading",
    icon: trading,
  },
  {
    title: "Mathematics With AI",
    icon: ai,
  },
  {
    title: "Mathematics Tutor",
    icon: tutor,
  },
  {
    title: "Powerlifter",
    icon: plate,
  },
  {
    title: "Golf",
    icon: golf,
  },
  {
    title: "Football",
    icon: football,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "R",
    icon: R,
  },
  {
    name: "Excel",
    icon: excel,
  },
  {
    name: "Word",
    icon: word,
  },
  {
    name: "Powerpoint",
    icon: powerpoint,
  },
];

const experiences = [
  {
    title: "Audit Intern",
    company_name: "BDO",
    icon: bdo,
    iconBg: "#E6DEDD",
    date: "2024",
    points: [
      "Auditing a wide range of clients, including private equity firms.",
      "Performing stock counts and meeting clients on client sites, developing professional relationships.",
    ],
  },
  {
    title: "Virtual Finance & Consulting Intern",
    company_name: "Bright Network, IEUK",
    icon: bright,
    iconBg: "#E6DEDD",
    date: "June 2024",
    points: [
      "Audited a fictitious company, successfully correcting all financial statement errors. ",
      "Learnt and applied the concept of materiality and PESTLE analysis.",
      "Compiled a clearance agenda for a closing meeting with the client.",
    ],
  },
  {
    title: "Lead AI Researcher - AI VIP",
    company_name: "University of Bath",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "Jan 2024 - June 2024",
    points: [
      "Lead researcher within a team of students and academic professionals that collaborated to leverage AI for mathematical problem-solving.",
      "Delivered weekly presentations to share research progress and innovative project strategies.",
      "Implemented AI APIs for use in sophisticated prompt engineering.",
    ],
  },
  {
    title: "Mathematics Tutor",
    company_name: "University of Bath",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "Sep 2023 - Feb 2024",
    points: [
      "Tutored groups of A level students, representing the teaching quality of the university.",
      "Achieved a 20% increase in the number of questions answered correctly per session, and a 100% attendance record.",
    ],
  },
  {
    title: "Online Personal Trainer and Transformation Coach",
    company_name: "JB Coaching",
    icon: jb,
    iconBg: "#383E56",
    date: "Jan 2022 - Oct 2022",
    points: [
      "Simultaneously designed tailored fitness programs for a diverse range of clients, each one to fit their specific needs.",
      "An adaptable and client-focused approach led to a minimum of a 10% decrease in body fat per client.",
      "Utilised excel to perform multiple data analyses on progress to model and extrapolate future client goals.",
    ],
  },
  {
    title: "Personal Trainer and Wall Climbing Instructor",
    company_name: "BH Live Active",
    icon: bhlive,
    iconBg: "#E6DEDD",
    date: "June 2021 - Oct 2022",
    points: [
      "Juggled two roles within the same company, facilitating the upkeep of both the wall climbing facility and the gym.",
      "Taught customers how to use both facilities, while ensuring correct and safe practise.",
    ],
  },
  {
    title: "Spring Intern",
    company_name: "PWC",
    icon: pwc,
    iconBg: "#E6DEDD",
    date: "April 2021",
    points: [
      "Shadowed roles in audit, technology and operations.",
      "Completed a consultancy project to find and test solutions for reducing carbon emissions and decreasing tax while maintaining product quality.",
      "Acquired strategies to manage stress and navigate challenges like impostor syndrome with confidence.",
    ],
  },
];

const education = [
  {
    school: "University of Bath",
    course: "BSc (hons) Mathematics",
    grades: "85% (First)",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "2022-Present",
    points: [
      "Year 1: Probability & Statistics (95%), Vector Calculus (97%), Python Coursework (89%).",
      "Year 2: Probability 2A (100%), Probability 2B (97%), ODEs & Control (95%), Numerical Analysis Python Coursework (94%). Top of year in all 4.",
    ],
  },
  {
    school: "City of Portsmouth College",
    course: "Maths, Further Maths, Physics",
    grades: "A*A*A*",
    icon: college,
    iconBg: "#E6DEDD",
    date: "2020 - 2022",
    points: [
    ],
  },
  {
    school: "Springfield School",
    grades: "99999999977 and L3 Excel Methods",
    icon: springfield,
    iconBg: "#E6DEDD",
    date: "2015 - 2020",
    points: [
      "9 in Maths, Further Maths and English Language."
    ],
  },
];

const projects = [
  {
    name: "M&A Student Handbook",
    description:
      "I found that the content involved with M&A investment banking was simple, but explained poorly and in an unstructured way online. I did what any normal person would do in this situation, and write a book! This book gives a brief but holistic and comprehensive overview of M&A, in a way that is understandable and structured for someone with limited background knowledge.",
    tags: [
      {
        name: "M&A",
        color: "blue-text-gradient",
      },
      {
        name: "DCF Analysis",
        color: "green-text-gradient",
      },
      {
        name: "Financial Statements",
        color: "pink-text-gradient",
      },
    ],
    image: mna,
    source_code_link: "https://github.com/joelb1401/MAhb",
  },
  {
    name: "Options Pricer",
    description:
      "Machine learning implementation in Python using a Random Forest model to price QQQ (Invesco QQQ Trust) options. Also included is the document of the steps I took to create this and what I learnt.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "green-text-gradient",
      },
      {
        name: "Options",
        color: "pink-text-gradient",
      },
    ],
    image: option,
    source_code_link: "https://github.com/joelb1401/Options-Pricer",
  },
  {
    name: "FOREX Trading Algorithm",
    description:
      "A FOREX trading algorithm and its backtester that trades XAUUSD on the 5min TF according to a fine-tuned strategy with proper risk management. This is the result of over 10 different versions and strategy adjustments. It achieved a 6% return in one month.",
    tags: [
      {
        name: "FOREX",
        color: "blue-text-gradient",
      },
      {
        name: "Risk Management",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "pink-text-gradient",
      },
    ],
    image: fxalgo,
    source_code_link: "https://github.com/joelb1401/FXalgo",
  },
  {
    name: "Monty Hall Website Entrance",
    description:
      "While wanting to create this portfolio website to improve and showcase my programming skills, I also wanted to personalise it by creating a 'gateway' that only allowed access if the user understands one of my favourite probability questions - the Monty Hall problem! Well done for getting this far. (By the way, the game was rigged to promote correct reasoning rather than luck).",
    tags: [
      {
        name: "Probability",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "HTML",
        color: "pink-text-gradient",
      },
      {
        name: "JavaScript",
        color: "orange-text-gradient",
      },
    ],
    image: monty,
    source_code_link: "https://github.com/joelb1401/MHgame",
  },
];

const other_experience = [
  {
    name: "JP Morgan Chase Quantitative Research Job Simulation - Forage",
    description:
      "This simulation focused on quantitative research  and machine learning methods to analyse a book of loans and estimate a customer's probability of default. I also used dynamic programming to convert FICO scores into categorical data to predict defaults. I have included the code I produced as well as the documentation of the steps I took.",
    tags: [
      {
        name: "Quantitative Research",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "green-text-gradient",
      },
      {
        name: "Default Prediction",
        color: "pink-text-gradient",
      },
    ],
    image: jpmorgan,
    source_code_link: "https://github.com/joelb1401/JPMquantsim",
  },
  {
    name: "AmplifyME M&A Finance Accelerator Simulation",
    description:
      "Before knowing much about investment banking or M&A, I completed this simulation and achieved a 96% score. It required successful completion of an entire DCF analysis with a recommendation in under 45 minutes.",
    tags: [
      {
        name: "M&A",
        color: "blue-text-gradient",
      },
      {
        name: "DCF Analysis",
        color: "green-text-gradient",
      },
      {
        name: "Financial Statements",
        color: "pink-text-gradient",
      },
    ],
    image: amplify,
    source_code_link: "https://github.com/joelb1401/AMdcf",
  },
  {
    name: "JP Morgan Chase Investment Banking Job Simulation - Forage",
    description:
      "This simulation introduced me to DCF analysis, target company research and identification, and the auction process. After completing the DCF model, I crafted a concise 2-pager to inform a client's decision-making.",
    tags: [
      {
        name: "M&A",
        color: "blue-text-gradient",
      },
      {
        name: "DCF Analysis",
        color: "green-text-gradient",
      },
      {
        name: "Due Diligence",
        color: "pink-text-gradient",
      },
    ],
    image: jpmorgan,
    source_code_link: "https://github.com/joelb1401/JPMibsim",
  },
  {
    name: "MacroVoices Podcast",
    description:
      "To keep up-to-date on the current relevant macroeconomic events and learn about how they affect the markets, I listen to the weekly podcast by Erik Townsend and Patrick Ceresna.",
    tags: [
      {
        name: "Macroeconomics",
        color: "blue-text-gradient",
      },
      {
        name: "Investment",
        color: "green-text-gradient",
      },
      {
        name: "Politics",
        color: "pink-text-gradient",
      },
    ],
    image: macro,
    source_code_link: "https://www.macrovoices.com/",
  },
];

export { services, technologies, experiences, education, projects, other_experience };
