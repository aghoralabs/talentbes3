export const company = {
  name: "Talentbes",
  tagline: "Your New Workstation",
  // The line printed under TALENTBES in the logo itself.
  logoTagline: "Driving Business with Human Touch",
  founder: "Sneha Prabhu",
  founderTitle: "Founder & CEO",
  founderLinkedIn: "https://www.linkedin.com/in/sneha-prabhu-7434901b9/",
  // Every "Email us" / apply / chatbot button opens a message to this.
  email: "ssnehatalentbes@gmail.com",
  // Google Maps embed for the office, shown on the Contact page.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.9015400128906!2d74.78133457538662!3d13.356398006324497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca39e5f8cad95%3A0x9c61f45011c3b7be!2sTalentbes!5e0!3m2!1sen!2sin!4v1791446867187!5m2!1sen!2sin",
  address: "Talentbes HR Consultants, Karnataka, India",
};

export type ServiceDetail =
  | { kind: "text"; heading?: string; body: string }
  | { kind: "steps"; heading?: string; items: { title: string; body: string }[] }
  | { kind: "list"; heading?: string; items: string[] };

export type Service = {
  slug: string;
  number: string;
  title: string;
  short: string;
  image: string;
  detail: ServiceDetail[];
};

// Service text is taken from the client's source document; only grammar and
// punctuation have been tidied.
export const services: Service[] = [
  {
    slug: "hr-auditing",
    number: "01",
    title: "HR Auditing",
    short: "A standard process that analyses the key monitoring areas for your organization's growth.",
    image: "/images/services/hr-auditing.webp",
    detail: [
      {
        kind: "text",
        body: "We follow a standard process for HR auditing that simplifies and analyses the key monitoring areas for the growth of the organization.",
      },
      {
        kind: "steps",
        items: [
          {
            title: "Define the scope and type of audit",
            body: "Different companies have their own set goals. While doing the HR audit, we define the scope in which we have to execute the audit, which gives us a better understanding of the company.",
          },
          {
            title: "A customized questionnaire for audit",
            body: "The staff and hierarchy of a company vary with its size, so it is important to understand the type of company and its operational parameters. To achieve the best audit results we prepare a customized questionnaire, which helps us derive the right direction in our research findings.",
          },
          {
            title: "Gathering data",
            body: "Once we speak to all the employees, it is important to collate the data and put it in a format to present our findings.",
          },
          {
            title: "Analyze the key findings",
            body: "Any research has to lead to a solution-oriented platform. The vital points achieved in the research are formulated into the important parameters for a proper way-forward plan for the organization.",
          },
          {
            title: "Provide solutions to achieve better results",
            body: "Filtering the key findings identifies the loopholes and the potential that is unexplored or yet to be worked out well. We mark a framework that helps the different verticals in the company perform to their full capacity.",
          },
          {
            title: "Make a strategy-based audit report",
            body: "When all the steps are neatly chalked out, a final report is produced for the top management that defines the criteria of the company's operational metrics, to be adapted as their daily work frame.",
          },
        ],
      },
    ],
  },
  {
    slug: "employer-employee-assessment",
    number: "02",
    title: "Employer / Employee Assessment",
    short: "Pre-employment and on-the-job assessments for smart hiring decisions.",
    image: "/images/services/employer-employee-assessment.webp",
    detail: [
      {
        kind: "text",
        heading: "Employer assessment",
        body: "A pre-employment test assists hiring managers to identify the appropriate skills, work process, ability to work at ease, knowledge and personality of an employee. These tests are usually done to make good hiring decisions at the early stages of the interview process.",
      },
      {
        kind: "text",
        heading: "Employee assessment",
        body: "The critical elements of success on the job are proficiency, work ethic and emotional intelligence (self-awareness, self-regulation, motivation, empathy and social skills). Employers still hunt for evidence of these qualities in résumés, reference checks and interviews, but they need a fuller picture to make smart hires.",
      },
    ],
  },
  {
    slug: "manpower-planning-budgeting",
    number: "03",
    title: "Manpower Planning & Budgeting",
    short: "The right number of qualified people, in the right job, at the right time.",
    image: "/images/services/manpower-planning-budgeting.webp",
    detail: [
      {
        kind: "text",
        body: "We essentially highlight this process to every employer, as in many cases this stage is missed. Generally an employer decides to hire when required, but if this planning is done in advance, the organization is ready well ahead to avoid any crisis when business grows exponentially. It means hiring the right number of qualified employees and placing the right employees in the right job at the right time, so that the organization can meet its set goals.",
      },
      {
        kind: "text",
        body: "The operational cost center is determined by manpower budgeting. It is a key process that links your business goals to the number of employees you will require to achieve them.",
      },
      {
        kind: "list",
        heading: "The key stages in which we do HR planning and budgeting",
        items: [
          "Create an HR budget",
          "Assess headcount requirement (department wise, job family wise)",
          "Assess training requirements (functional, behavioral and leadership)",
          "Allocate merit increase % (percentage of total payroll for merit increase, bonus and other rewards)",
        ],
      },
    ],
  },
  {
    slug: "recruitment-selection",
    number: "04",
    title: "Recruitment & Selection",
    short: "We recruit the best talent for an open vacancy at a specific time and cost.",
    image: "/images/services/recruitment-selection.webp",
    detail: [
      {
        kind: "text",
        body: "We recruit the best talent for an open job vacancy within the organization at a specific time and cost.",
      },
      {
        kind: "steps",
        items: [
          {
            title: "Preparation",
            body: "The HR department prepares a frame of the ideal candidate for the vacant position. The skills and competencies required to perform the job are identified, and the qualification and level of experience required to execute the job responsibilities are determined.",
          },
          {
            title: "Accepting resumes",
            body: "Once the job vacancy is advertised through internal and external sources of recruitment, the HR department starts receiving applications. Most of the time the HR department confirms to the candidate that their application has been received and that the sorting process is going on.",
          },
          {
            title: "Selection stage 1: Cancel out unqualified applicants",
            body: "Applications that are not suitable for the job are cancelled out, based on an unmatching qualification or experience of the candidate.",
          },
          {
            title: "Selection stage 2: Arrangement of candidates",
            body: "Applicants who match the requirement are rated on their on-paper experience and qualification. The ratings convey how well each applicant fits the vacant job profile. It is a time-consuming process, and spreadsheets are often used to sort the applications and rank them by their suitability to the job profile.",
          },
          {
            title: "Selection stage 3: Interview rounds",
            body: "The ranked and selected candidates are called for interview rounds, which can vary from 2 to 6 based on the selection process adopted by the organization. The HR round usually includes background verification, a personality check and behavioral suitability. The manager round is often used to check the candidate's actual work suitability.",
          },
          {
            title: "Selection stage 4: Future work situation",
            body: "The last round of selection gives the candidate a simulated work exercise, with questions or tasks related to their area of expertise. It provides actual results about the candidate's ability to perform as a future employee of the organization.",
          },
          {
            title: "Offer and joining formalities",
            body: "Generally the 2 to 3 top selected candidates get joining offers. The joining formalities include submitting the relevant papers and signing the work contract. After the documentation, the joining date is decided and the new recruit joins the organization.",
          },
        ],
      },
      {
        kind: "text",
        heading: "Recruitment Process Outsourcing (RPO)",
        body: "Recruitment outsourcing is the latest practice followed by middle and large-sized organizations, where they outsource the recruitment process to recruitment consultants, search and select companies or recruitment specialist companies. RPO is a huge industry in itself, with many national and international companies doing great business worldwide.",
      },
      {
        kind: "text",
        heading: "SME and corporate recruitment",
        body: "HR outsourcing supports an organization's human resource professionals to focus on the strategic functions and processes of human resource management. Outsourcing organizations strive to provide cost-saving benefits to their clients and economies of scale to large organizations. Outsourcing is fruitful both for the corporate organizations that use the service and for the consultancies that provide it, helping both to grow and perform.",
      },
      {
        kind: "list",
        heading: "The advantages to the SME / corporate",
        items: [
          "Optimal resource utilization",
          "Satisfied and, hence, highly productive employees",
          "Management's focus turned to strategic HRM processes",
          "Structured and fair performance management",
          "Freedom from red tape and adhering to strict rules and regulations",
          "Value creation, operational flexibility and competitive advantage",
        ],
      },
    ],
  },
  {
    slug: "training-development",
    number: "05",
    title: "Training & Development",
    short: "Five touchpoints: assessment, motivation, design, delivery and evaluation.",
    image: "/images/services/training-development.webp",
    detail: [
      {
        kind: "text",
        body: "The phases of training and development are critical to scrutinize the areas of improvement and development. The training process comprises five important touchpoints: assessment, motivation, design, delivery and evaluation.",
      },
      {
        kind: "list",
        heading: "Our standard training and development process",
        items: [
          "Carry out a TNA (training needs analysis)",
          "Assess behavioral / soft skills, functional training and leadership training",
          "Types of training: group, individual, in-house (by superiors), e-learning / webinar, agency organized",
          "ROI framework to measure training effectiveness",
        ],
      },
    ],
  },
  {
    slug: "performance-management",
    number: "06",
    title: "Performance Management System",
    short: "A consistent cycle of communication and feedback between manager and employee.",
    image: "/images/services/performance-management.webp",
    detail: [
      {
        kind: "text",
        body: "Performance management is a cycle of consistent exchange of communication and feedback between a manager and employee towards the achievement of organizational objectives.",
      },
      {
        kind: "list",
        heading: "Our performance management system involves",
        items: [
          "Define organizational goals",
          "Define departmental goals",
          "Define individual goals",
          "Create KRAs for each department",
          "Generate KPIs for each position",
          "Create a template to measure performance (customized, not copied)",
          "Roll out the template and measure performance vs goals set",
        ],
      },
    ],
  },
  {
    slug: "sourcing-headhunting",
    number: "07",
    title: "Sourcing & Headhunt Methods",
    short: "We invest in ways and means to get you the right fit.",
    image: "/images/services/sourcing-headhunting.webp",
    detail: [
      {
        kind: "text",
        body: "Our way to find you the right employee is also a way to source blue collar talent. We invest in ways and means to get you the right fit in the organization.",
      },
      {
        kind: "list",
        heading: "Our sourcing platforms",
        items: [
          "Job portals",
          "Social media platforms",
          "Recruitment database",
          "Newspaper ads",
          "Recruiter network",
          "Personal & professional checks",
        ],
      },
    ],
  },
  {
    slug: "executive-search",
    number: "08",
    title: "Headhunting for Senior Management",
    short: "We see leaders as brands, not employees.",
    image: "/images/services/executive-search.webp",
    detail: [
      {
        kind: "text",
        body: "We see them as brands and not employees. Their excellence is the perfect resume an organization is looking for at the time of hiring top management personnel.",
      },
      {
        kind: "text",
        heading: "Leaders who do the same things differently",
        body: "Executive hiring in a company happens when they are approached for the right vacancies.",
      },
    ],
  },
  {
    slug: "recruitment-budget",
    number: "09",
    title: "Allocate Recruitment Budget",
    short: "Plan your next HR budget with ease, in five steps.",
    image: "/images/services/recruitment-budget.webp",
    detail: [
      {
        kind: "text",
        body: "Our unique planning will help you plan your next HR budget with ease. As per the nature and size of your business, allocate your budget based on the steps below.",
      },
      {
        kind: "steps",
        items: [
          { title: "Step 1", body: "Estimate your total number of recruitments." },
          { title: "Step 2", body: "Estimate your base recruitment costs." },
          { title: "Step 3", body: "Estimate your fixed / variable costs." },
          { title: "Step 4", body: "Estimate your recruiting technology costs." },
          { title: "Step 5", body: "Estimate your recruitment tool / medium costs related to the hiring process." },
        ],
      },
    ],
  },
  {
    slug: "headcount-planning",
    number: "10",
    title: "Headcount by Financial Year",
    short: "Keep your operational goal indicator in green.",
    image: "/images/services/headcount-planning.webp",
    detail: [
      {
        kind: "text",
        body: "Headcount is a popular term to define the employees hired by a business at a given time. Your workforce evaluation also keeps a check on the work responsibilities of the employees: whether they are providing you solutions and insights that help improve the company's health and keep the operational goal indicator in green.",
      },
    ],
  },
  {
    slug: "replacement-provision",
    number: "11",
    title: "Replacement Provision",
    short: "A swift replacement provision across various scenarios.",
    image: "/images/services/replacement-provision.webp",
    detail: [
      {
        kind: "list",
        heading: "We follow a swift replacement provision for all employers in various scenarios",
        items: [
          "Long term and short term back up",
          "Replacement during the probation period",
          "Non-competency analysis during and after the probation period",
          "Health factors responsible for replacement",
          "Outstation rejections by the employees",
        ],
      },
      {
        kind: "text",
        heading: "Our guarantee",
        body: "We guarantee replacement in various scenarios. If the selected candidate resigns from the services of their own will within the first 3 months of joining, a free replacement is provided. We are not responsible for replacing the candidate if the company terminates the candidate for any reason.",
      },
    ],
  },
  {
    slug: "manpower-turnover",
    number: "12",
    title: "Manpower Turnover Assessment",
    short: "Keep business growth and manpower in sync.",
    image: "/images/services/manpower-turnover.webp",
    detail: [
      {
        kind: "text",
        body: "Our solutions help your organization function swiftly and with future planning. The HR audit is a well-planned activity to gauge the efficiency of the existing manpower's work responsibilities against the goals: whether business growth is in sync, and whether an additional resource is needed to match the set targets.",
      },
      {
        kind: "text",
        body: "We firmly believe that assessment criteria should be customized to the organization's structure and nature of business. We examine and review existing policies, procedures and practices regarding recruitment and selection, orientation, placement, training and development, job analysis and design, job evaluation, compensation, morale and motivation, employee health and safety, and social welfare. This adds up to valuable data seen through a structured system, and where anything needs to be revised, the assessment data helps us provide better solutions.",
      },
    ],
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const recruitmentSteps: Step[] = [
  {
    number: "1",
    title: "Preparation",
    description:
      "We frame the ideal candidate for the role: the skills, competencies, qualification and experience needed to do the job.",
  },
  {
    number: "2",
    title: "Accepting Resumes",
    description:
      "We advertise through internal and external channels, confirm every application received, and begin sorting.",
  },
  {
    number: "3",
    title: "Selection Stages",
    description:
      "Shortlist, rank, interview across 2–6 rounds, and run a future-work simulation to test real fit.",
  },
  {
    number: "4",
    title: "Offer & Joining",
    description:
      "Top candidates receive offers, complete documentation, and join on a date that works for everyone.",
  },
];

export const industries = ["Information Technology", "Banking & Finance", "Manufacturing", "SMEs"];

// Blog posts and job postings are managed through the admin CMS and served by
// talentbes-api, see lib/api.ts.

// Shown at the end of the Services page. Taken from the client's source
// document; only grammar has been tidied.
export const faqs: { question: string; answer: string }[] = [
  { question: "What is your nature of business?", answer: "We are HR consultants serving clients worldwide." },
  { question: "What services do you have?", answer: "Complete 360-degree services." },
  {
    question: "Do you look into bulk recruitments?",
    answer: "Yes, depending on the nature of your business and the job descriptions you are hiring for.",
  },
  {
    question: "Do you have a replacement policy?",
    answer:
      "Yes. If the selected candidate resigns of their own will within the first 3 months of joining, a free replacement is provided. See Replacement Provision above for the scenarios covered.",
  },
  {
    question: "What kind of profiles do you hire?",
    answer: "From junior managers to senior managers to top management.",
  },
  { question: "What kind of sectors do you serve?", answer: "All sectors." },
  {
    question: "Do you manage payrolls?",
    answer: "Yes, depending on the requirement, we provide customized solutions.",
  },
];

// The home hero tells Talentbes' story in three short film chapters, one
// per beat of what the firm does for an employer: find the person, plan
// the team around them, then keep the workplace one people trust. Each
// headline is shown over its own clip, so the words and the footage always
// agree. Clips live in public/videos/hero: muted, no audio track, cropped
// clear of the promo film's captions and corner logo.
export type HeroHeadline = {
  lead: string;
  highlight: string;
  tail?: string;
  /** Short label for the chapter, shown on the film and its progress bar. */
  chapter: string;
  video: string;
  /** First frame of the clip: shown until it plays, and when motion is reduced. */
  poster: string;
  /** What the clip shows, for screen readers. */
  alt: string;
  /** CSS object-position that keeps the people in frame. */
  position?: string;
  /** Clip length in seconds: the chapter's length on the hero's clock. */
  seconds: number;
};

export const heroHeadlines: HeroHeadline[] = [
  {
    lead: "Hiring, with a ",
    highlight: "human touch",
    tail: ".",
    chapter: "Recruitment & executive search",
    video: "/videos/hero/01-interview.mp4",
    poster: "/videos/hero/01-interview.jpg",
    alt: "Two interviewers smiling across the table at candidates",
    position: "42% center",
    seconds: 4.9,
  },
  {
    lead: "Teams, ",
    highlight: "planned to grow",
    tail: ".",
    chapter: "HR audit & manpower planning",
    video: "/videos/hero/02-planning.mp4",
    poster: "/videos/hero/02-planning.jpg",
    alt: "Colleagues leaning over plans on a meeting-room table",
    position: "78% center",
    seconds: 4.5,
  },
  {
    lead: "Workplaces ",
    highlight: "people trust",
    tail: ".",
    chapter: "Training, POSH & compliance",
    video: "/videos/hero/03-culture.mp4",
    poster: "/videos/hero/03-culture.jpg",
    alt: "Employees listening attentively in a workplace training session",
    position: "center 30%",
    seconds: 5.2,
  },
];

export const stats = [
  { value: "3", suffix: " decades", label: "of HR leadership experience" },
  { value: "360", suffix: "°", label: "end-to-end HR & recruitment services" },
  { value: "2-6", suffix: "", label: "structured interview rounds per hire" },
  { value: "3", suffix: " months", label: "free-replacement guarantee window" },
];
