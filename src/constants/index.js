import {
  jb,
  bdo,
  bath,
  bhlive,
  navy,
  pwc,
  college,
  springfield,
  commonwealth,
} from "../assets";

import bscProject from "../assets/research/bsc-project-report.pdf";
import bscPresentation from "../assets/research/bsc-project-presentation.pdf";
import bscCover from "../assets/research/project-cover.png";
import sambaReport from "../assets/research/samba-report.pdf";
import sambaPresentation from "../assets/research/samba-presentation.pdf";
import sambaCover from "../assets/research/samba-cover.png";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    number: "",
  },
  {
    id: "about",
    title: "Abstract",
    number: "",
  },
  {
    id: "education",
    title: "Education",
    number: "1",
  },
  {
    id: "projects",
    title: "Research",
    number: "2",
  },
  {
    id: "work",
    title: "Work Experience",
    number: "3",
  },
  {
    id: "powerlifting",
    title: "Powerlifting",
    number: "4",
  },
];

export const sectionNumber = (id) =>
  navLinks.find((link) => link.id === id)?.number ?? "";

// Mirrors the Experience section of linkedin.com/in/joelbassil: same
// roles, same order, same wording. Royal Navy has no logo in assets yet.
const experiences = [
  {
    title: "Teaching Assistant",
    company_name: "University of Bath · Part-time",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "Oct 2025 - Present",
    points: [
      "Algebra and introductory number theory tutor to first year undergraduates, as a final-year undergraduate myself.",
    ],
  },
  {
    title: "Mathematics Research Intern (SAMBa)",
    href: "#samba-project",
    company_name: "University of Bath · Full-time",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "Jun 2025 - Aug 2025",
    points: [
      "Researching controlled measure-valued martingales and associated machine learning methods. More specifically, applying (a novel approach to) the Deep 2BSDE ML method in the context of a filtering (optimisation and control) problem. Building on research by Professor Alex Cox.",
    ],
  },
  {
    title: "Audit Industrial Placement",
    company_name: "BDO · Internship",
    icon: bdo,
    iconBg: "#E6DEDD",
    date: "Sep 2024 - Jun 2025",
    points: [],
  },
  {
    title: "Mathematics Tutor",
    company_name: "University of Bath · Part-time",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "Sep 2023 - Feb 2024",
    points: [
      "A-level Mathematics Tutor as part of a college partnership on behalf of Professor Jane White",
    ],
  },
  {
    title: "Online Personal Trainer",
    company_name: "JB Coaching · Self-employed",
    icon: jb,
    iconBg: "#383E56",
    date: "Jan 2022 - Oct 2022",
    points: [
      "Transforming clients' physical and mental lifestyle through exercise, diet, and stress management.",
    ],
  },
  {
    // The two BH Live roles ran concurrently; LinkedIn groups them under
    // one company, and here they read as one.
    title: "Personal Trainer and Wall Climbing Instructor",
    company_name: "BH Live · Part-time",
    icon: bhlive,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Oct 2022",
    points: [
      "Simultaneously a gym floor personal trainer and wall climbing instructor, taking lead roles in both.",
    ],
  },
  {
    title: "Spring Intern",
    company_name: "PwC · Internship",
    icon: pwc,
    iconBg: "#E6DEDD",
    date: "2021 - 2021",
    points: [
      "Completed a consultancy project to find and test solutions for reducing carbon emissions and decrease tax while maintaining product quality.",
    ],
  },
  {
    title: "Naval Air Squadron Engineer",
    company_name: "Royal Navy · Internship",
    icon: navy,
    iconBg: "#E6DEDD",
    date: "2019 - 2019",
    points: [],
  },
];

/**
 * Every entry may carry `prizes`, listed under the course line:
 *
 *   prizes: [{ name, date, description }]   date and description optional
 *
 * `type` decides what else it may carry:
 *
 *   university — `years`, each optionally holding
 *                  average:      the year's average, shown by its title
 *                  dissertation: { title, description }
 *                  modules:      [{ name, grade }]
 *                  note:         a line under the year
 *   college    — `subjects`: [{ name, grade }]
 *   school     — `points`: plain bullets
 *
 * Anything left out is simply not laid out, so an entry with no prizes,
 * or a year with no dissertation, leaves no gap on the page.
 */
const education = [
  {
    school: "University of Bath",
    type: "university",
    course: "PhD in Statistical and Applied Mathematics (SAMBa)",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "Sep 2026 - Present",
    prizes: [],
  },
  {
    school: "University of Bath",
    id: "bsc-degree",
    type: "university",
    course: "BSc (hons) Mathematics",
    grades: "87% degree average (First-class)",
    icon: bath,
    iconBg: "#E6DEDD",
    date: "2022 - 2026",
    prizes: [
      {
        name: "FH Jackson Prize for Mathematics",
        date: "2025/26",
        description: "For top performance in pure mathematics.",
      },
    ],
    // Modules listed are those marked 90% or above, highest first.
    years: [
      {
        name: "Year 1",
        average: "86%",
        modules: [
          { name: "Vectors, vector calculus and mechanics", grade: "97%" },
          { name: "Probability & statistics 1B", grade: "95%" },
          { name: "Algebra 1B", grade: "90%" },
        ],
      },
      {
        name: "Year 2",
        average: "85%",
        modules: [
          { name: "Probability 2A", grade: "100%" },
          { name: "Probability 2B", grade: "97%" },
          { name: "Ordinary differential equations and control", grade: "95%" },
        ],
      },
      {
        name: "Year 3",
        average: "88%",
        modules: [
          { name: "Number theory and cryptography", grade: "96%" },
          { name: "Discrete probability", grade: "96%" },
          { name: "Measure theory and integration", grade: "92%" },
          { name: "Probability and finance", grade: "90%" },
          {
            name: "Final-year BSc project",
            grade: "88%",
            href: "#bsc-project",
          },
        ],
      },
    ],
  },
  {
    school: "City of Portsmouth College",
    type: "college",
    course: "A Levels",
    grades: "A*A*A*",
    icon: college,
    iconBg: "#E6DEDD",
    date: "2020 - 2022",
    prizes: [
      {
        name: "'Excellence in Mathematics' Award",
        description: "For top performance in mathematics.",
      },
    ],
    subjects: [
      { name: "Mathematics", grade: "A*" },
      { name: "Further Mathematics", grade: "A*" },
      { name: "Physics", grade: "A*" },
    ],
  },
  {
    school: "Springfield School",
    type: "school",
    grades: "99999999977 and L3 Excel Methods",
    icon: springfield,
    iconBg: "#E6DEDD",
    date: "2015 - 2020",
    prizes: [],
    points: [
      "9 in Maths, Further Maths and English Language."
    ],
  },
];

/**
 * A research entry may carry:
 *
 *   name              the title, printed after the automatic "2.1"
 *   description       the paragraph of body text
 *   tags              keywords, listed under the description
 *   image             the figure in the left margin, imported from ../assets
 *   live              "monty" runs the simulation in the margin instead
 *   source_code_link  the link at the foot of the entry
 *
 * Only `name` is required. Anything left out simply isn't laid out, so
 * an entry with no figure or no link leaves no gap behind it.
 */
const projects = [
  {
    id: "bsc-project",
    name: "Percolation, Random Walks, and Minimal Cutsets on Infinite Graphs",
    meta: "Bachelor's project · Supervised by Dr Christoforos Panagiotis, University of Bath · April 2026",
    image: bscCover,
    description: [
      "This project studies two fundamental areas of modern probability theory: random walks on graphs and percolation theory. Foundational material is studied from [PO] and [Gri99], covering Bernoulli bond and site percolation, phase transitions, the classical Peierls argument, and the FKG inequality. We then develop the theory of electrical networks and isoperimetric profiles, culminating in a proof that graphs with isoperimetric dimension greater than 2 are uniformly transient.",
      "We provide a thorough exposition of the paper [EST25], which establishes connections between percolation thresholds and transience of random walks on infinite graphs. This paper encapsulates how probabilistic ideas can be used to obtain deterministic structural results for graphs. We conclude this review with a careful discussion about the 'gap at 1' phenomenon for the critical parameter on transitive graphs.",
      "We conjecture that the same results of [EST25] are true in the case of site percolation, and attempt to prove them via the same methods. However, we see that this is in fact not possible, and give counterexamples illustrating this. In particular, we show that the prescription of exposed vertex boundaries is too 'expensive'. We consider the class of line graphs to illustrate the difficulties encountered, and prove intermediate results for graphs of bounded degree. We make an original contribution by deducing a corollary which partially extends results by Panagiotis and Severo [PS23], and partially resolves a conjecture posed by Benjamini and Schramm [BS96].",
    ],
    tags: [
      "Percolation",
      "Random walks",
      "Electrical networks",
      "Isoperimetric inequalities",
      "Minimal cutsets",
      "Transience",
      "Infinite graphs",
    ],
    documents: [
      {
        label: "Read the report",
        title: "Percolation, Random Walks, and Minimal Cutsets on Infinite Graphs",
        file: bscProject,
      },
      {
        label: "See the presentation",
        title: "Bachelor's project presentation",
        file: bscPresentation,
      },
    ],
  },
  {
    id: "samba-project",
    name: "Controlled Measure-valued Martingales and Associated Machine Learning Methods",
    meta: "SAMBa summer placement · Supervised by Chaorui Wang, University of Bath · August 2025",
    image: sambaCover,
    description: [
      "This report presents an implementation and comprehensive analysis of the deep 2BSDE (second-order backward stochastic differential equation) method for solving stochastic optimal control problems and their associated Hamilton-Jacobi-Bellman (HJB) equations. We begin with a thorough exposition of Brownian motion, stochastic calculus, the Itô formula, and the Euler-Maruyama discretization scheme, establishing the theoretical foundation for understanding second-order BSDEs and their connection to fully nonlinear parabolic partial differential equations.",
      "We first validate our implementation against a stochastic linear-quadratic control problem with known analytical solutions, demonstrating excellent convergence properties with approximation errors on the order of 10\u207B³. We then conduct dimension scaling analysis up to d = 100, revealing exponential growth in computational time and linear scaling in loss with increasing dimension.",
      "This understanding lays the foundation to substitute the Itô process for measure-valued martingale processes. We implement a three-dimensional process supported on {-1, 0, 1} with a sophisticated cost function incorporating variance and covariance terms, while enforcing constraints to ensure the process remains within the simplex domain. We provide a detailed mathematical analysis of the discretization scheme's recursion relation, which reveals why loss inevitably becomes large for certain parameter combinations. Through examination of the update equations, we demonstrate that the discrete approximation exhibits exponential growth in the final time T, leading to systematic errors that cannot be eliminated through parameter tuning alone.",
      "We also compare control optimization algorithms, finding that while increasing iterations improves early-stage control approximation, particularly for the first time-step, L-BFGS outperforms ADAM significantly over all time steps. Additional investigations cover discretization parameter optimization and boundary absorption effects.",
      "Finally, we demonstrate applications in mathematical finance by solving the classical Merton portfolio optimization problem, and how to interpret the results of the algorithm.",
      "An interesting take-away from the simulations in the project is that controlling the data process within the 2BSDE seems to pose no issues. In the method construction, the data process takes an auxiliary control, since it is actually irrelevant to the success of the algorithm. If we instead run the simulations but use the optimal control in the update equations at each time step instead of the auxiliary control, the results look almost identical. However, one of our investigations indicated that the further away the auxiliary control is from the optimal control, the longer it took for convergence of loss. Hence, it would seem that using the optimal control instead of the auxiliary control and essentially using a modified C2BSDE (controlled 2BSDE) method, we are likely to see faster convergence. It appears that this approach has not been seen before, so a rigorous construction of the method and proof that a solution still exists and is unique may be an interesting direction to pursue.",
    ],
    tags: [
      "Deep 2BSDE",
      "Stochastic optimal control",
      "Hamilton-Jacobi-Bellman equations",
      "Measure-valued martingales",
      "Machine learning",
      "Merton portfolio problem",
    ],
    documents: [
      {
        label: "Read the report",
        title: "Controlled Measure-valued Martingales and Associated Machine Learning Methods",
        file: sambaReport,
      },
      {
        label: "See the presentation",
        title: "SAMBa summer placement presentation",
        file: sambaPresentation,
      },
    ],
  },
];

/** Flags are drawn by Flag.jsx; `flag` names which standard to draw. */
const powerlifting = [
  {
    competition: "Commonwealth Championships 2026",
    result: "Upcoming — competing for England",
    date: "September 2026",
    icon: commonwealth,
  },
  {
    competition: "English Junior Championships 2026",
    result: "2nd place",
    date: "May 2026",
    flag: "england",
  },
  {
    competition: "British University Championships (BUCs) 2026",
    result: "3rd place",
    date: "April 2026",
    flag: "uk",
  },
];

export { experiences, education, projects, powerlifting };
