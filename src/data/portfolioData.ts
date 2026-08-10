import type {
  BuildingProject,
  Certification,
  CompletedSystem,
  ExperienceItem,
  MiniProject,
  SkillItem,
} from '../types';

/* ------------------------------------------------------------------ */
/*  IDENTITY                                                            */
/* ------------------------------------------------------------------ */

export const PERSONAL = {
  name: 'Datta Srinikesh Chinta',
  firstName: 'Datta Srinikesh Chinta',
  role: 'AI Systems Engineer',
  headline: 'I build intelligent systems that can see, speak, reason and act.',
  proHeadline:
    "Python Developer | Gen AI and Voice AI Intern @Doneswaritechnologiesllp | Agentic AI Intern @Venixa | ML Engineer | Data Science | LLM's/RAG | AI Agentic Automation | LangChain | LangGraph | QA Automation Testing",
  tagline:
    'AI/ML engineer building intelligent agents, voice systems, retrieval engines and real-world AI products — from models to autonomous systems.',
  positioning:
    'He doesn\u2019t just experiment with AI models — he builds complete systems around them.',
  location: 'Hyderabad, Telangana, India',
  email: 'srinikeshchinta@gmail.com',
  phone: '+91 8309594383',
  education: {
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    college: 'R.M.D Engineering College',
    period: 'Sep 2024 \u2013 Jun 2028',
    cgpa: '7.96',
  },
  links: {
    portfolio: 'https://dattasrinikeshchinta.netlify.app/',
    github: 'https://github.com/sri-nikesh-1432',
    linkedin: 'https://www.linkedin.com/in/datta-srinikesh-chinta-986064333/',
    voiceAgent: 'https://venixaintern.netlify.app/',
    ragStudio: 'https://ragstudiopro.netlify.app/',
  },
  interests: [
    'Voice AI',
    'AI Agents',
    'RAG',
    'Generative AI',
    'Multilingual AI',
    'Computer Vision',
    'AI Automation',
    'Full-Stack AI',
    'Biomimicry & Robotics',
    'Conversational AI',
  ],
};

export const METRICS = [
  { value: '06', label: 'Completed Projects', detail: 'Ready to demonstrate' },
  { value: '01', label: 'Pre-Publication Research', detail: 'YET TO BE PUBLISHED' },
  { value: '03+', label: 'Projects in Development', detail: 'Actively building' },
  { value: '08', label: 'Trinity Music Certifications', detail: 'Piano / Keyboard' },
];

/* ------------------------------------------------------------------ */
/*  COMPLETED SYSTEMS — ONLY THESE TWO                                 */
/* ------------------------------------------------------------------ */

export const COMPLETED_SYSTEMS: CompletedSystem[] = [
  {
    id: 'voice-agent',
    slug: 'voice-agent',
    name: 'AI Powered Multi-Lingual Voice Agent',
    badge: 'COMPLETED',
    secondaryBadge: 'VENIXA PRIVATE LIMITED \u2014 INTERNSHIP PROJECT',
    tagline: 'Voice AI \u00b7 Whisper + Groq + FastAPI',
    description:
      'End-to-end multilingual conversational voice system connecting speech recognition, LLM reasoning and text-to-speech into a real-time voice interaction pipeline.',
    longDescription:
      'A production voice assistant that takes live speech, transcribes it with Whisper, reasons with a Groq-hosted LLM and speaks the answer back using neural text-to-speech \u2014 supporting a complete voice booking workflow across multiple Indian languages. Built as the flagship internship project at Venixa Private Limited, the system was engineered for low-latency turn-taking so conversations feel natural rather than robotic.',
    technology: ['Whisper', 'Groq Llama', 'FastAPI', 'React', 'TypeScript', 'Voice AI', 'Edge TTS'],
    capabilities: [
      'Speech-to-Text',
      'LLM-based conversation',
      'Text-to-Speech',
      'Multilingual interaction',
      'Voice booking workflow',
      'Real-time conversational experience',
    ],
    demoUrl: 'https://venixaintern.netlify.app/',
    githubUrl: 'https://github.com/sri-nikesh-1432',
    venue: 'Venixa Private Limited',
    accent: 'blue',
    highlights: [
      'Low-latency streaming voice pipeline (STT \u2192 LLM \u2192 TTS)',
      'Multilingual support designed for English, Telugu, Hindi & Tamil',
      'Conversational state management for booking flows',
      'Deployed and demo-ready on Netlify',
    ],
    architecture: [
      { stage: 'Microphone', detail: 'Live audio captured in the browser' },
      { stage: 'Whisper STT', detail: 'Speech-to-text transcription via Groq Whisper API' },
      { stage: 'Groq Llama LLM', detail: 'Fast inference, prompt-engineered conversation & booking logic' },
      { stage: 'FastAPI Backend', detail: 'Streaming orchestrator and session state' },
      { stage: 'Neural TTS', detail: 'Edge TTS renders a natural spoken response' },
      { stage: 'Speaker', detail: 'Audio streamed back to the user in real time' },
    ],
  },
  {
    id: 'rag-studio',
    slug: 'rag-studio',
    name: 'RAG Studio Pro',
    badge: 'COMPLETED',
    secondaryBadge: 'AI / RAG SYSTEM',
    tagline: 'Retrieval-Augmented Generation \u00b7 Python + React + Groq',
    description:
      'An interactive Retrieval-Augmented Generation platform demonstrating document ingestion, semantic chunking, embeddings, vector search and context-aware LLM responses.',
    longDescription:
      'RAG Studio Pro is a complete retrieval-augmented generation workstation. Upload a PDF, watch it get chunked semantically, embedded into vector space and indexed for retrieval, then ask questions grounded in the document \u2014 with similarity visualization that shows exactly which chunks informed each answer. The system demonstrates the full RAG pipeline transparently: ingestion \u2192 chunking \u2192 embedding \u2192 vector search \u2192 context assembly \u2192 grounded generation.',
    technology: ['Python', 'RAG', 'Groq', 'Embeddings', 'Vector Search', 'React', 'TypeScript', 'FAISS'],
    capabilities: [
      'PDF ingestion',
      'Document chunking',
      'Embedding generation',
      'Semantic retrieval',
      'Similarity visualization',
      'Context retrieval',
      'LLM-powered responses',
    ],
    demoUrl: 'https://ragstudiopro.netlify.app/',
    githubUrl: 'https://github.com/sri-nikesh-1432',
    accent: 'teal',
    highlights: [
      'Full pipeline visibility: chunk, embed, retrieve, answer',
      'Similarity scoring on retrieved context',
      'Grounds every answer in the uploaded document',
      'Deployed and demo-ready on Netlify',
    ],
    architecture: [
      { stage: 'Document Ingestion', detail: 'PDF / text parsed into clean content' },
      { stage: 'Semantic Chunking', detail: 'Overlapping chunks preserve context' },
      { stage: 'Embedding', detail: 'Chunks mapped to dense vector space' },
      { stage: 'Vector Index', detail: 'FAISS index for fast similarity search' },
      { stage: 'Retrieval', detail: 'Top-k relevant chunks retrieved per query' },
      { stage: 'Groq LLM', detail: 'Context-aware, grounded response generation' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  MINI PROJECTS — ML / Data Science projects                          */
/* ------------------------------------------------------------------ */

export const MINI_PROJECTS: MiniProject[] = [
  {
    id: 'house-price',
    title: 'House Price Prediction — ML Real-World Project',
    date: 'May 2026',
    overview: 'Machine Learning project that predicts house prices using a real-world housing dataset from Kaggle. Features include area, bedrooms, bathrooms, stories, and parking.',
    features: [
      'Area-based price prediction',
      'Multi-feature regression model',
      'Feature importance analysis',
      'Correlation heatmap visualization',
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Seaborn', 'Matplotlib', 'Google Colab'],
    concepts: ['Regression', 'Train-Test Split', 'Model Evaluation', 'Feature Importance', 'Prediction System'],
    skills: ['Machine Learning', 'Linear Regression', 'Feature Engineering', 'Model Evaluation'],
    githubUrl: 'https://github.com/sri-nikesh-1432',
  },
  {
    id: 'sales-dashboard',
    title: 'Interactive Sales Dashboard — Data Analytics using Plotly',
    date: 'May 2026',
    overview: 'Interactive business sales dashboard built using Python and Plotly, featuring sales analysis, profit trends, regional insights, and product performance metrics.',
    features: [
      'Sales trend analysis by region',
      'Profit trend visualization',
      'Top-performing category identification',
      'Monthly business trend tracking',
      'Pie chart distribution views',
    ],
    technologies: ['Python', 'Pandas', 'Plotly', 'Google Colab'],
    concepts: ['Data Visualization', 'Dashboard Design', 'Business Analytics', 'Regional Analysis'],
    skills: ['Data Analytics', 'Scatter Plot', 'Python', 'Plotly'],
    githubUrl: 'https://github.com/sri-nikesh-1432',
  },
  {
    id: 'netflix-eda',
    title: 'Netflix Exploratory Data Analysis',
    date: 'May 2026',
    overview: 'Exploratory Data Analysis project on the Netflix dataset using Python. Key findings include content distribution analysis, growth trends, and rating patterns.',
    features: [
      'Content distribution analysis (Movies vs TV Shows)',
      'Country-wise content catalog comparison',
      'Content growth trend analysis (2015+)',
      'Rating distribution insights (TV-MA dominance)',
    ],
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Google Colab'],
    concepts: ['Data Cleaning', 'Exploratory Analysis', 'Data Visualization', 'Insight Generation'],
    skills: ['Data Analytics', 'Foundations of Data Science', 'Python'],
    githubUrl: 'https://github.com/sri-nikesh-1432/Netflix_EDA.git',
  },
  {
    id: 'student-score',
    title: 'Student Score Predictor — ML Pipeline Workflow Project',
    date: 'May 2026',
    overview: 'Machine Learning project that predicts student scores based on study hours using Linear Regression. Demonstrates the complete ML pipeline from data splitting to model evaluation.',
    features: [
      'Study hours vs score prediction',
      'Train-test data splitting',
      'Linear regression model implementation',
      'Model performance evaluation',
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Google Colab'],
    concepts: ['Train-Test Split', 'Linear Regression', 'Model Evaluation', 'Prediction System'],
    skills: ['Machine Learning', 'Data Splitting', 'Linear Regression', 'Model Evaluation', 'Prediction System'],
    githubUrl: 'https://github.com/sri-nikesh-1432/Student_Score_Predictor.ipynb.git',
  },
];

/* ------------------------------------------------------------------ */
/*  BUILDING — YET TO COMPLETE                                         */
/* ------------------------------------------------------------------ */

export const BUILDING_PROJECTS: BuildingProject[] = [
  {
    id: 'stark',
    slug: 'stark',
    name: 'Stark',
    status: 'IN DEVELOPMENT',
    category: 'AI Systems Assistant',
    shortDescription:
      'Personal AI systems assistant designed to interact with computers, files, development environments and digital workflows \u2014 understand natural-language commands, accept files and folders, and code, build, test and ship.',
    currentStage: 'Agent orchestration architecture',
    nextMilestone: 'Computer interaction layer',
    technologies: ['Agentic AI', 'LLMs', 'CLI', 'VS Code', 'File systems', 'Automation'],
    progress: 30,
  },
  {
    id: 'aira',
    slug: 'aira',
    name: 'Aira Multi-Agent System',
    status: 'IN DEVELOPMENT',
    category: 'Multi-Agent Orchestration',
    shortDescription:
      'Multi-agent orchestration architecture where specialized AI agents \u2014 planned as planets with dedicated roles \u2014 coordinate complex tasks, each with its own live workspace page.',
    currentStage: 'Orchestrator design & agent role mapping',
    nextMilestone: 'Per-agent live workspace pages',
    technologies: ['Python', 'Agent frameworks', 'Task planning', 'Realtime UI'],
    progress: 20,
  },
  {
    id: 'mrs-d',
    slug: 'mrs-d',
    name: 'Mrs.D AI Telecalling Agent',
    status: 'IN DEVELOPMENT',
    category: 'Voice AI \u00b7 Conversational Agent',
    shortDescription:
      'Multilingual AI telecalling and educational-services conversational agent with voice interaction, RAG knowledge bases from institutional documents, and full call analytics.',
    currentStage: 'Voice pipeline + RAG knowledge base',
    nextMilestone: 'Call dashboard & analytics',
    technologies: ['Groq Whisper', 'Llama 3', 'Edge TTS', 'RAG', 'FastAPI', 'React'],
    progress: 45,
  },
  {
    id: 'ppl',
    slug: 'ppl',
    name: 'Pothole Premier League',
    status: 'EXPERIMENT',
    category: 'Computer Vision',
    shortDescription:
      'Computer vision project detecting and analyzing road potholes \u2014 an experiment in real-world object detection applied to civic infrastructure.',
    currentStage: 'YOLOv8 detection prototype',
    nextMilestone: 'Dataset expansion & severity classification',
    technologies: ['YOLOv8', 'Python', 'OpenCV', 'AWS Rekognition'],
    progress: 35,
  },
  {
    id: 'polaroid',
    slug: 'polaroid',
    name: 'Polaroid AI Memories',
    status: 'IN DEVELOPMENT',
    category: 'Generative AI \u00b7 Product',
    shortDescription:
      'AI + memories concept that turns personal moments into curated, generative keepsakes \u2014 an experiment at the intersection of generative AI and human experience.',
    currentStage: 'Concept & interaction design',
    nextMilestone: 'Image ingestion + generative pipeline',
    technologies: ['Generative AI', 'React', 'Cloud vision APIs'],
    progress: 15,
  },
  {
    id: 'elevare',
    slug: 'elevare',
    name: 'Elevare',
    status: 'IN DEVELOPMENT',
    category: 'Application',
    shortDescription:
      'Application / platform concept currently being shaped \u2014 product design, architecture and the first prototype.',
    currentStage: 'Product architecture',
    nextMilestone: 'Core prototype build',
    technologies: ['TypeScript', 'React', 'Node.js'],
    progress: 10,
  },
  {
    id: 'swarakanthi',
    slug: 'swarakanthi',
    name: 'Swarakanthi',
    status: 'IN DEVELOPMENT',
    category: 'Audio \u00b7 Creative Tech',
    shortDescription:
      'Karaoke maker \u2014 an audio tool experiment combining vocal processing and creative technology for music creation.',
    currentStage: 'Audio pipeline exploration',
    nextMilestone: 'Vocal isolation & lyric sync',
    technologies: ['Python', 'Audio processing', 'Web Audio'],
    progress: 25,
  },
  {
    id: 'bookwithakki',
    slug: 'bookwithakki',
    name: 'BookWithAkki',
    status: 'IN DEVELOPMENT',
    category: 'Booking Application',
    shortDescription:
      'Booking-related application \u2014 an end-to-end reservation flow product currently under active development.',
    currentStage: 'Booking flow design',
    nextMilestone: 'Backend + availability logic',
    technologies: ['React', 'Node.js', 'Databases'],
    progress: 30,
  },
  {
    id: 'solo-leveling',
    slug: 'solo-leveling',
    name: 'Solo Leveling Game',
    status: 'EXPERIMENT',
    category: 'Game Concept',
    shortDescription:
      'Game / project concept inspired by progression-based roleplay \u2014 an experimental build exploring game mechanics and interactive systems.',
    currentStage: 'Game design exploration',
    nextMilestone: 'Core mechanics prototype',
    technologies: ['Game dev', 'TypeScript', 'Interactive systems'],
    progress: 10,
  },
  {
    id: 'checkmate',
    slug: 'checkmate',
    name: 'CHECKMATE',
    status: 'IN DEVELOPMENT',
    category: 'Strategy \u00b7 AI',
    shortDescription:
      'A strategy-focused project exploring decision systems and intelligent play \u2014 under active construction.',
    currentStage: 'Core logic implementation',
    nextMilestone: 'AI opponent + polish',
    technologies: ['Python', 'Algorithms', 'React'],
    progress: 45,
  },
  {
    id: 'netflix-eda',
    slug: 'netflix-eda',
    name: 'Netflix EDA',
    status: 'EXPERIMENT',
    category: 'Data Science',
    shortDescription:
      'Exploratory data analysis of the Netflix catalogue using Pandas, Matplotlib and Seaborn \u2014 a data-science lab experiment.',
    currentStage: 'Analysis complete as a lab experiment',
    nextMilestone: 'Interactive dashboard version',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    progress: 100,
    notes: 'Analysis complete as a data experiment \u2014 not a product system.',
  },
];

/* ------------------------------------------------------------------ */
/*  RESEARCH                                                           */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  RESEARCH                                                           */
/* ------------------------------------------------------------------ */

type ResearchBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; heading?: string; items: string[] }
  | { type: 'table'; caption: string; headers: string[]; rows: string[][] }
  | { type: 'equations'; items: { label: string; equation: string }[] };

interface ResearchSectionData {
  id: string;
  title: string;
  blocks: ResearchBlock[];
}

export const RESEARCH = {
  id: 'fragrance-research',
  title:
    'AI-IoT Based Fragrance Detection, Analysis & Generation System Using Spectroscopic Learning',
  shortTitle: 'AI-IoT Fragrance Intelligence',
  date: 'August 03, 2026',
  status: 'YET TO BE PUBLISHED',
  statusLine: 'RESEARCH MANUSCRIPT \u2014 PRE-PUBLICATION VERSION',
  field: 'Spectroscopic Learning \u00b7 AI-IoT \u00b7 ML',
  abstract:
    'In this paper, we try to solve a real-world problem which is fragrance detection and understanding. Normally, perfumes are analyzed using expensive laboratory equipment, but here we think in a different way. Instead of relying completely on chemical laboratory techniques, we combine Artificial Intelligence (AI) and the Internet of Things (IoT). The proposed system captures a fragrance droplet using a spectroscopic sensor, converts the spectral response into numerical data, and then applies machine learning algorithms to predict fragrance notes such as citrus, floral, woody, fruity, or oriental. The system also estimates possible chemical ingredients responsible for the detected fragrance. Furthermore, users can generate customized perfume compositions by selecting fragrance notes, allowing the AI model to recommend a possible formulation based on previously learned spectral patterns. This makes the proposed system suitable for smart perfumery, counterfeit perfume detection, fragrance recommendation, and future intelligent fragrance generation applications.',
  statusBadges: ['YET TO BE PUBLISHED', 'PRE-PUBLICATION RESEARCH'],
  keyEquations: [
    { label: 'Photon energy \u2014 Planck', equation: 'E = h\u03bd' },
    { label: 'Beer\u2013Lambert law', equation: 'A = \u03b5cl' },
    { label: 'Spectral mixture', equation: 'S_total = \u03a3 w\u1d62S\u1d62' },
    { label: 'Prediction function', equation: 'y = f(X)' },
  ],
  samples: [
    { sample: 'Perfume A', predicted: 'Citrus', confidence: '95.4%' },
    { sample: 'Perfume B', predicted: 'Floral', confidence: '94.2%' },
    { sample: 'Perfume C', predicted: 'Woody', confidence: '96.8%' },
    { sample: 'Perfume D', predicted: 'Oriental', confidence: '93.5%' },
    { sample: 'Perfume E', predicted: 'Fruity', confidence: '95.9%' },
  ],
  families: ['Citrus', 'Floral', 'Woody', 'Fruity', 'Oriental'],
  notes: [
    'need more independent samples.',
    'raw spectrum \u2192 preprocessing',
    'feature extraction?',
    'CNN?',
    'test with mixed samples',
    'sensor drift?',
    'validate experimentally',
    'temperature & humidity influence',
  ],
  pipeline: [
    { stage: 'Fragrance Sample', detail: 'Perfume droplet on a transparent testing substrate' },
    { stage: 'Spectroscopic Sensor', detail: 'Illumination & spectral response capture' },
    { stage: 'Signal Processing', detail: 'ADC conversion into numerical spectral values' },
    { stage: 'IoT Controller', detail: 'ESP32 / Raspberry Pi transmits data over Wi-Fi' },
    { stage: 'ML Model', detail: 'CNN / classifiers predict family, notes & ingredients' },
    { stage: 'Prediction', detail: 'Fragrance family \u00b7 notes \u00b7 similar perfumes' },
  ],
  references: [
    'C. S. Sell, The Chemistry of Fragrances: From Perfumer to Consumer, 2nd ed., Quest International, Irvine, California, USA, 2006.',
    'Kandhasamy Sowndhararajan and Songmun Kim, \u201cInfluence of Fragrances on Human Psychophysiological Activity: With Special Reference to Human Electroencephalographic Response.\u201d',
    'Karen Rose, Scott Eldridge and Lyman Chapin, \u201cThe Internet of Things: An Overview,\u201d The Internet Society, 2015.',
    'Feinberg, Sheffler, Meoli and Rummel, \u201cThere\u2019s Something Social Happening at the Mall,\u201d Journal of Business and Psychology, Vol. 4, No. 1, pp. 49\u201363, 1989.',
    '\u201cIoT Based Fragrance Tester,\u201d Blue Eyes Intelligence Engineering & Sciences Publication, DOI: 10.35940/IJITEE.A1057.1191S19, 2019.',
    'Lotz, Sherry L., Mary Ann Eastlick and Soyeon Shim, \u201cModeling Patrons\u2019 Activities at Entertainment Malls: A Study in Flow,\u201d AMA Educators\u2019 Proceedings, Vol. 11, pp. 256\u2013257, 2000.',
    'Sonal Kureshi, Vandana Sood and Abraham Koshy, \u201cComprehensive Analysis of Exclusive Brand Store Customer in Indian Market,\u201d Indian Institute of Management Ahmedabad, Working Papers, 2007.',
    'Gangadharaiah D. N., H. N. Ramesh and Y. N. Nagaraju, \u201cRetailing Behavior of Rural and Urban Consumers Towards Organized and Unorganized Retail Outlets,\u201d International Journal of Physical and Social Sciences, Vol. 2, No. 6, pp. 496\u2013506, 2012.',
    'William D. Wells and Douglas J. Tigert, \u201cActivities, Interests and Opinions,\u201d Journal of Advertising Research, Vol. 11, Issue 4, pp. 27\u201335, 1971.',
    'Poonam Kamboj and Surender Kumar Gupta, \u201cIndian Retail Industry: Its Growth, Opportunities and Challenges,\u201d International Journal of Research in IT & Management, Vol. 2, No. 10, 2012.',
    'Woodruffe-Burton H., S. Eccles and R. Elliott, \u201cTowards a Theory of Shopping: A Holistic Framework,\u201d Journal of Consumer Behaviour, pp. 256\u2013266, 2002.',
    'Zanual Bashar Bhutoo, Rambalak Yadav and Vikram Singh, \u201cConsumer Perception of Retail Outlets: A Comparative Study of Big Bazaar and More Mega Stores,\u201d IJNPME Journal, Issue 1, 2012.',
    'Jeremy Blum, Exploring Arduino: Tools and Techniques for Engineering Wizardry, John Wiley & Sons, 2013.',
    'J. M. Hughes, Arduino: A Technical Reference, O\u2019Reilly, 2016.',
    'Java Virtual Machine Tool Interface Specification. Available: http://java.sun.com/javase/6/docs/platform/jvmti/jvmti.html',
  ],
  acknowledgments: {
    intro:
      'The authors sincerely express their gratitude to the faculty members of the Department of Artificial Intelligence and Machine Learning, R.M.D. Engineering College, for their continuous guidance and encouragement throughout this work.',
    people: [
      'Dr. C. S. Anita \u2014 HoD & Professor (Machine Learning)',
      'Mrs. S. Swetha \u2014 Assistant Professor (ML, Gen AI)',
      'Mr. N. Sathish Kumar \u2014 Assistant Professor (AI, Analytics)',
      'Mrs. K. Gayathri Devi \u2014 Assistant Professor (Java)',
      'Mrs. Remya Rose S \u2014 Assistant Professor (DBMS)',
      'Mrs. E. Nalina \u2014 Assistant Professor (React)',
      'Mrs. Monisha \u2014 Assistant Professor (Deep Learning)',
    ],
  },
};

export const RESEARCH_SECTIONS: ResearchSectionData[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    blocks: [
      { type: 'p', text: 'Let us think about a simple question. When we smell a perfume, how do we actually know what is inside it? Humans can only guess based on experience, but machines require measurable data. Traditional fragrance analysis relies on laboratory techniques such as Gas Chromatography (GC) and Mass Spectrometry (MS). Although these methods provide highly accurate chemical analysis, they are expensive, time-consuming, and unsuitable for portable real-time applications.' },
      { type: 'p', text: 'The objective of this research is to develop an AI-IoT based intelligent fragrance analysis system capable of detecting fragrance compounds without requiring a complete laboratory setup. Instead of performing direct chemical analysis, the proposed system uses spectroscopy to obtain the optical characteristics of a fragrance sample. These spectral characteristics are then converted into numerical data suitable for Artificial Intelligence models.' },
      { type: 'p', text: 'The proposed system performs three major functions:' },
      { type: 'list', items: ['Detect fragrance from a liquid perfume sample.', 'Predict fragrance notes and probable ingredients using Machine Learning.', 'Generate customized fragrance compositions according to user-selected notes.'] },
      { type: 'p', text: 'Unlike conventional perfume testing, the proposed approach integrates spectroscopy, Artificial Intelligence, and IoT technologies to build a portable and intelligent fragrance analysis platform suitable for future smart perfumery applications.' },
    ],
  },
  {
    id: 'related-work',
    title: 'Related Work',
    blocks: [
      { type: 'p', text: 'Several research works have focused on fragrance analysis using different sensing technologies.' },
      { type: 'p', text: 'Traditional analytical systems primarily employ Gas Chromatography (GC) and Mass Spectrometry (MS), which provide highly accurate chemical identification. However, these methods require sophisticated laboratory infrastructure, trained professionals, and significant processing time.' },
      { type: 'p', text: 'Electronic Nose (E-Nose) systems have also been proposed for odor recognition. These systems generally use arrays of gas sensors to detect Volatile Organic Compounds (VOCs). Although portable, sensor drift, environmental interference, and limited selectivity often reduce their reliability.' },
      { type: 'p', text: 'Recent Artificial Intelligence research attempts to predict fragrance characteristics directly from molecular structures. While these methods achieve promising results, they depend on pre-existing molecular information and cannot directly analyze an unknown perfume sample.' },
      { type: 'p', text: 'The comparison between existing approaches is summarized below.' },
      { type: 'table', caption: 'Table 1: Comparison of Existing Fragrance Analysis Methods', headers: ['Method', 'Accuracy', 'Real-Time'], rows: [['Gas Chromatography', 'High', 'No'], ['Mass Spectrometry', 'Very High', 'No'], ['Electronic Nose', 'Moderate', 'Yes'], ['AI Molecular Prediction', 'High', 'Limited'], ['Proposed AI-IoT Spectroscopy', 'High', 'Yes']] },
      { type: 'p', text: 'The proposed research combines the advantages of spectroscopy, IoT sensing, and Artificial Intelligence. Spectroscopy provides richer information than conventional gas sensors, while Machine Learning enables intelligent prediction of fragrance notes and ingredient estimation. IoT connectivity further enables real-time monitoring and remote fragrance analysis. This integrated approach aims to overcome the limitations of existing fragrance analysis techniques by providing a portable, intelligent, and scalable solution.' },
    ],
  },
  {
    id: 'methodology',
    title: 'Proposed Methodology',
    blocks: [
      { type: 'p', text: 'The proposed AI-IoT based fragrance analysis system consists of five major stages. The workflow begins with fragrance sample acquisition and ends with fragrance prediction and generation.' },
      { type: 'p', text: 'Step 1 \u2014 Fragrance Sample Collection: A small droplet of perfume is placed on a transparent testing substrate. The sample acts as the input for spectroscopic analysis.' },
      { type: 'p', text: 'Step 2 \u2014 Spectroscopic Analysis: A spectroscopic sensor illuminates the fragrance sample using a controlled light source. Different chemical compounds absorb, transmit, and reflect light at different wavelengths. The resulting spectrum represents the optical fingerprint of the perfume.' },
      { type: 'p', text: 'Step 3 \u2014 Data Acquisition: The spectral response is converted into numerical values through an Analog-to-Digital Converter (ADC). These values are transmitted to the processing unit through an IoT-enabled microcontroller such as ESP32 or Raspberry Pi.' },
      { type: 'p', text: 'Step 4 \u2014 Artificial Intelligence Analysis: The processed spectral data is supplied to a trained Machine Learning model. The AI model compares the unknown spectrum with previously learned fragrance datasets and predicts the dominant fragrance family, top notes, middle notes, base notes, and possible chemical ingredients. Deep learning models such as Convolutional Neural Networks (CNNs) are suitable for identifying hidden spectral patterns and improving classification accuracy.' },
      { type: 'p', text: 'Step 5 \u2014 Fragrance Generation: The proposed system also allows users to create personalized perfumes. Users can select desired fragrance characteristics such as Floral, Citrus, Woody, Oriental, Fruity, or Fresh notes. Based on learned fragrance compositions, the AI model recommends an estimated ingredient combination capable of producing a similar fragrance profile.' },
      { type: 'p', text: 'The overall architecture of the proposed system is illustrated below.' },
      { type: 'list', items: ['Fragrance Sample', 'Spectroscopic Sensor', 'Signal Processing', 'IoT Controller (ESP32 / Raspberry Pi)', 'Machine Learning Model', 'Prediction of Fragrance Family \u00b7 Notes \u00b7 Ingredients \u00b7 Similar Perfumes', 'AI-Based Fragrance Generation'] },
    ],
  },
  {
    id: 'physics',
    title: 'Physics of Spectroscopy',
    blocks: [
      { type: 'p', text: 'Spectroscopy is based on the interaction between electromagnetic radiation and matter. Every chemical compound absorbs specific wavelengths of light depending on its molecular energy levels.' },
      { type: 'p', text: 'According to Planck\u2019s quantum theory,' },
      { type: 'equations', items: [{ label: 'Equation (1) \u2014 Planck', equation: 'E = h\u03bd' }] },
      { type: 'p', text: 'where E is the energy in joules, h is Planck\u2019s constant, and \u03bd is the frequency of light. Different perfume molecules absorb different frequencies of light. Consequently, every fragrance produces a unique absorption spectrum that serves as its optical signature.' },
      { type: 'p', text: 'The Beer-Lambert Law describes the attenuation of light passing through a fragrance sample:' },
      { type: 'equations', items: [{ label: 'Equation (2) \u2014 Beer\u2013Lambert', equation: 'A = \u03b5cl' }] },
      { type: 'p', text: 'where A is absorbance, \u03b5 is molar absorptivity, c is concentration, and l is the optical path length. This principle enables the spectroscopic sensor to estimate the chemical composition of the fragrance.' },
    ],
  },
  {
    id: 'chemistry',
    title: 'Chemistry of Fragrance',
    blocks: [
      { type: 'p', text: 'Perfumes consist of mixtures of volatile organic compounds (VOCs). These compounds evaporate at different rates, producing different fragrance stages.' },
      { type: 'p', text: 'Top notes are perceived immediately after perfume application. They are highly volatile and generally disappear within a few minutes. Examples include Lemon, Orange, Bergamot, and Mint.' },
      { type: 'p', text: 'Middle notes form the main body of the fragrance after the evaporation of top notes. Examples include Rose, Jasmine, Lavender, and Cinnamon.' },
      { type: 'p', text: 'Base notes remain for the longest duration and determine the lasting impression of the perfume. Examples include Sandalwood, Musk, Vanilla, and Amber.' },
      { type: 'p', text: 'The combined fragrance response can be represented mathematically as' },
      { type: 'equations', items: [{ label: 'Equation (3) \u2014 Spectral mixture', equation: 'S_total = \u03a3 w\u1d62S\u1d62' }] },
      { type: 'p', text: 'where S\u1d62 is the spectral response of each compound and w\u1d62 is the relative concentration (weight). Since several compounds overlap within the measured spectrum, Artificial Intelligence is employed to identify hidden relationships and accurately predict fragrance characteristics.' },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Approach',
    blocks: [
      { type: 'p', text: 'Artificial Intelligence acts as the decision-making component of the proposed system. The captured spectroscopic data is converted into feature vectors before being supplied to the Machine Learning model.' },
      { type: 'p', text: 'Let X = [x\u2081, x\u2082, x\u2083, \u2026, x\u2099] represent the extracted spectral feature vector. The prediction function is given by' },
      { type: 'equations', items: [{ label: 'Equation (4) \u2014 Prediction function', equation: 'y = f(X)' }] },
      { type: 'p', text: 'where X is the spectral feature vector, y is the predicted fragrance class, and f(\u00b7) is the Machine Learning model.' },
      { type: 'p', text: 'The proposed system may employ one or more of the following models: Convolutional Neural Network (CNN), Random Forest Classifier, Support Vector Machine (SVM), Artificial Neural Network (ANN), or Gradient Boosting Algorithms. Among these, CNNs are particularly suitable because spectroscopic graphs exhibit local patterns similar to images.' },
      { type: 'p', text: 'The training process consists of:' },
      { type: 'list', items: ['Collection of known perfume spectra', 'Data preprocessing', 'Feature extraction', 'Model training', 'Performance evaluation', 'Prediction of unknown samples'] },
      { type: 'p', text: 'The generated output includes the fragrance family, top notes, middle notes, base notes, estimated ingredients, and similar commercial perfumes.' },
    ],
  },
  {
    id: 'iot-integration',
    title: 'IoT Integration',
    blocks: [
      { type: 'p', text: 'The Internet of Things (IoT) enables communication between the sensing device and cloud-based Artificial Intelligence services.' },
      { type: 'p', text: 'The proposed hardware architecture consists of a Spectroscopic Sensor, ESP32 / Raspberry Pi, ADC Module, Wi-Fi Communication Module, Cloud AI Server, and User Mobile Application.' },
      { type: 'p', text: 'The IoT workflow is summarized below.' },
      { type: 'list', items: ['Fragrance Sample', 'Spectroscopic Sensor', 'ESP32 / Raspberry Pi', 'Wi-Fi / Internet', 'Cloud Database', 'Machine Learning Model', 'Prediction Results'] },
      { type: 'p', text: 'IoT communication enables real-time monitoring, remote fragrance analysis, cloud-based model updates, and centralized dataset storage.' },
    ],
  },
  {
    id: 'results',
    title: 'Results and Analysis',
    blocks: [
      { type: 'p', text: 'A prototype implementation was evaluated using multiple fragrance samples representing different perfume families.' },
      { type: 'p', text: 'The Artificial Intelligence model successfully classified fragrances into their respective categories and identified dominant fragrance notes.' },
      { type: 'p', text: 'The following table summarizes representative prediction results.' },
      { type: 'table', caption: 'Table 2: Sample Prediction Results', headers: ['Sample', 'Predicted Family', 'Confidence (%)'], rows: [['Perfume A', 'Citrus', '95.4'], ['Perfume B', 'Floral', '94.2'], ['Perfume C', 'Woody', '96.8'], ['Perfume D', 'Oriental', '93.5'], ['Perfume E', 'Fruity', '95.9']] },
      { type: 'p', text: 'The prototype demonstrates that combining spectroscopy with Machine Learning can effectively identify fragrance families while maintaining rapid prediction performance.' },
    ],
  },
  {
    id: 'discussion',
    title: 'Discussion',
    blocks: [
      { type: 'p', text: 'The proposed AI-IoT fragrance analysis system offers several advantages over traditional laboratory techniques.' },
      { type: 'list', heading: 'Advantages', items: ['Portable fragrance analysis', 'Real-time prediction', 'AI-assisted learning capability', 'Lower operational cost', 'Remote IoT connectivity', 'Counterfeit perfume detection', 'Personalized fragrance generation'] },
      { type: 'list', heading: 'Limitations', items: ['Performance depends on sensor quality.', 'Mixed fragrance compositions remain challenging.', 'Large labelled spectral datasets are required.', 'Environmental temperature and humidity may influence measurements.'] },
      { type: 'p', text: 'Future improvements may include Deep Learning models, transformer-based architectures, and larger fragrance datasets for improved prediction accuracy.' },
    ],
  },
  {
    id: 'future-scope',
    title: 'Future Scope',
    blocks: [
      { type: 'list', items: ['Integration with robotic perfume manufacturing.', 'AI-based perfume recommendation systems.', 'Mobile fragrance scanning applications.', 'Healthcare applications involving aroma therapy.', 'Counterfeit perfume verification.', 'Smart retail perfume recommendation.', 'Cloud-based fragrance database development.'] },
      { type: 'p', text: 'The combination of spectroscopy, Artificial Intelligence, and IoT provides significant opportunities for future intelligent fragrance technologies.' },
    ],
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    blocks: [
      { type: 'p', text: 'This paper presented an AI-IoT based fragrance detection, analysis, and generation system using spectroscopic learning. Unlike traditional laboratory techniques, the proposed approach combines spectroscopy, Internet of Things devices, and Artificial Intelligence to create a portable, intelligent, and scalable fragrance analysis platform.' },
      { type: 'p', text: 'Experimental evaluation indicates that Machine Learning models can successfully classify fragrance families and estimate perfume notes from spectroscopic data. Furthermore, the proposed fragrance generation module enables personalized perfume design based on learned fragrance compositions.' },
      { type: 'p', text: 'The proposed system demonstrates the feasibility of intelligent fragrance sensing and provides a strong foundation for future research in smart perfumery, chemical sensing, and AI-driven fragrance engineering.' },
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'doneswari',
    role: 'Part-Time AI / SaaS Developer',
    company: 'Doneswari LLP Technologies',
    location: 'Part-Time',
    period: 'Jul 27, 2026 \u2013 Present',
    type: 'work',
    current: true,
    highlights: [
      'Building SaaS products with a focus on practical AI-powered automation and intelligent business workflows.',
      'Developing an AI Telecalling Agent for a specific educational organization \u2014 a conversational AI platform handling realistic voice-based interactions grounded in organization-provided knowledge.',
      'Designing voice-based interaction pipelines that integrate speech-to-text, LLM reasoning and text-to-speech.',
      'Implementing RAG-based knowledge retrieval from organization-provided documents, call initiation flows, and call analytics with conversation summaries.',
      'Building interfaces for managing knowledge sources and call workflows, including multilingual conversational capabilities.',
      'Developing the system toward a production-oriented SaaS architecture.',
    ],
    technologies: ['AI Agents', 'SaaS', 'Voice AI', 'Conversational AI', 'RAG', 'LLMs', 'Automation', 'Python'],
  },
  {
    id: 'venixa',
    role: 'Artificial Intelligence Intern',
    company: 'Venixa Private Limited',
    location: 'Hyderabad, India',
    period: 'Jun 2026 \u2013 Jul 2026',
    type: 'internship',
    highlights: [
      'Built an AI powered multi-lingual voice agent \u2014 an end-to-end STT \u2192 LLM \u2192 TTS conversational system.',
      'Engineered voice booking workflows and real-time multilingual conversation with Whisper + Groq + FastAPI.',
      'Shipped a React + TypeScript interface for the live voice agent.',
    ],
    technologies: ['Voice AI', 'Conversational AI', 'Prompt Engineering', 'Whisper', 'Groq', 'FastAPI', 'React'],
  },
  {
    id: 'viswam',
    role: 'AI Developer Intern',
    company: 'VISWAM.AI \u00b7 IIIT Hyderabad',
    orgUnit: 'SWECHA',
    location: 'Hyderabad, India',
    period: 'May 2025 \u2013 Jun 2025',
    type: 'internship',
    highlights: [
      'Worked on AI and machine learning systems within the SWECHA ecosystem at IIIT Hyderabad.',
      'Developed Python-based ML workflows and contributed to real-world problem solving.',
      'Focused on Telugu language technology \u2014 voice and LLM exploration for Indian-language AI.',
    ],
    technologies: ['AI', 'Machine Learning', 'Python', 'Voice AI', 'Telugu LLM'],
  },
  {
    id: 'education',
    role: 'B.Tech \u2014 Artificial Intelligence & Machine Learning',
    company: 'R.M.D Engineering College',
    location: 'Chennai, India',
    period: 'Sep 2024 \u2013 Jun 2028',
    type: 'education',
    highlights: [
      'Specializing in AI systems, machine learning, generative AI and full-stack AI engineering.',
      'Academic focus on building intelligent systems from models to real products.',
    ],
    technologies: ['AI', 'ML', 'DL', 'Algorithms', 'Mathematics'],
  },
];

/* ------------------------------------------------------------------ */
/*  SKILLS — LinkedIn-style flat list with associated experience        */
/* ------------------------------------------------------------------ */

export const SKILLS: SkillItem[] = [
  { id: 'python', name: 'Python', fullName: 'Python (Programming Language)', category: 'Programming Languages', experience: ['AI Developer Intern at VISWAM.AI', 'AI Powered Multi-Lingual Voice Agent for Spiritual Services', 'HackerRank Certified Python (Basic)', 'Agentic AI Intern at Venixa Private Limited'] },
  { id: 'ai', name: 'Artificial Intelligence', fullName: 'Artificial Intelligence (AI)', category: 'AI & Machine Learning', experience: ['Agentic AI Intern at Venixa', 'AI Developer Intern at VISWAM.AI', 'AI Powered Multi-Lingual Voice Agent for Spiritual Services'] },
  { id: 'ml', name: 'Machine Learning', fullName: 'Machine Learning', category: 'AI & Machine Learning', experience: ['AI Developer Intern at VISWAM.AI', 'R.M.D Engineering College', 'Student Score Predictor — ML Pipeline Workflow Project', 'House Price Prediction — ML Real-World Project'] },
  { id: 'data-science', name: 'Data Science', fullName: 'Data Science', category: 'Data & Analytics', experience: [] },
  { id: 'claude', name: 'Claude Skills', fullName: 'Claude Skills', category: 'AI & Machine Learning', experience: ['Claude 101', 'Claude Code in Action'] },
  { id: 'agentic-automation', name: 'AI Agentic Automation', fullName: 'AI Agentic Automation', category: 'AI & Machine Learning', experience: ['Building AI Agents with MongoDB', 'MongoDB GenAI Developer'] },
  { id: 'voice-agents', name: 'Multi-Lingual Voice Agents', fullName: 'Multi-Lingual Voice Agents', category: 'AI & Machine Learning', experience: ['Agentic AI Intern at Venixa'] },
  { id: 'conversational-ai', name: 'Conversational AI', fullName: 'Conversational AI', category: 'AI & Machine Learning', experience: ['AI Powered Multi-Lingual Voice Agent for Spiritual Services'] },
  { id: 'fastapi', name: 'FastAPI', fullName: 'FastAPI', category: 'Programming Languages', experience: ['AI Powered Multi-Lingual Voice Agent for Spiritual Services'] },
  { id: 'react', name: 'React.js', fullName: 'React.js', category: 'Programming Languages', experience: ['AI Powered Multi-Lingual Voice Agent for Spiritual Services'] },
  { id: 'sql', name: 'SQL', fullName: 'SQL', category: 'Programming Languages', experience: [] },
  { id: 'eda', name: 'Exploratory Data Analysis', fullName: 'Exploratory Data Analysis (EDA)', category: 'Data & Analytics', experience: ['Agentic AI Intern at Venixa'] },
  { id: 'team-coordination', name: 'Team Coordination', fullName: 'Team Coordination', category: 'Professional & Tools', experience: ['Agentic AI Intern at Venixa'] },
  { id: 'aiml', name: 'AI & ML Engineering', fullName: 'Artificial Intelligence and Machine Learning', category: 'AI & Machine Learning', experience: ['AIML Intern at InternPe'] },
  { id: 'scatter-plot', name: 'Scatter Plot', fullName: 'Scatter Plot', category: 'Data & Analytics', experience: ['Interactive Sales Dashboard — Data Analytics using Plotly'] },
  { id: 'feature-engineering', name: 'Feature Engineering', fullName: 'Feature Engineering', category: 'Data & Analytics', experience: ['House Price Prediction — ML Real-World Project'] },
  { id: 'data-analytics', name: 'Data Analytics', fullName: 'Data Analytics', category: 'Data & Analytics', experience: ['House Price Prediction — ML Real-World Project', 'Google Analytics Individual Qualification'] },
  { id: 'prediction-system', name: 'Prediction System', fullName: 'Prediction System', category: 'AI & Machine Learning', experience: ['Student Score Predictor — ML Pipeline Workflow Project'] },
  { id: 'linear-regression', name: 'Linear Regression', fullName: 'Linear Regression', category: 'Data & Analytics', experience: ['Student Score Predictor — ML Pipeline Workflow Project', 'House Price Prediction — ML Real-World Project'] },
  { id: 'matplotlib', name: 'Matplotlib', fullName: 'Matplotlib', category: 'Data & Analytics', experience: ['Student Score Predictor — ML Pipeline Workflow Project'] },
  { id: 'data-splitting', name: 'Data Splitting', fullName: 'Data Splitting', category: 'Data & Analytics', experience: ['Student Score Predictor — ML Pipeline Workflow Project'] },
  { id: 'model-evaluation', name: 'Model Evaluation', fullName: 'Model Evaluation', category: 'Data & Analytics', experience: ['Student Score Predictor — ML Pipeline Workflow Project'] },
  { id: 'github-fundamentals', name: 'GitHub Fundamentals', fullName: 'GitHub Fundamentals', category: 'Professional & Tools', experience: ['Agentic AI Intern at Venixa', 'Netflix Exploratory Data Analysis'] },
  { id: 'data-science-foundations', name: 'Foundations of Data Science', fullName: 'Foundations of Data Science', category: 'Data & Analytics', experience: ['Netflix Exploratory Data Analysis', 'R.M.D Engineering College'] },
  { id: 'google-colab', name: 'Google Colab', fullName: 'Google Colab', category: 'Professional & Tools', experience: ['Netflix Exploratory Data Analysis'] },
  { id: 'mysql', name: 'MySQL', fullName: 'MySQL', category: 'Programming Languages', experience: ['HackerRank Certified SQL (Basic)'] },
  { id: 'generative-ai', name: 'Generative AI', fullName: 'Generative AI', category: 'AI & Machine Learning', experience: ['Oracle Cloud Infrastructure 2025 Certified Generative AI Professional'] },
  { id: 'data-structures', name: 'Data Structures', fullName: 'Data Structures', category: 'Programming Languages', experience: ['R.M.D Engineering College'] },
  { id: 'nlp', name: 'Natural Language Processing', fullName: 'Natural Language Processing (NLP)', category: 'AI & Machine Learning', experience: [] },
  { id: 'computer-vision', name: 'Computer Vision', fullName: 'Computer Vision', category: 'AI & Machine Learning', experience: [] },
  { id: 'deep-learning', name: 'Deep Learning', fullName: 'Deep Learning', category: 'AI & Machine Learning', experience: ['AI Developer Intern at VISWAM.AI'] },
  { id: 'engineering', name: 'Engineering', fullName: 'Engineering', category: 'Professional & Tools', experience: ['R.M.D Engineering College'] },
  { id: 'soft-skills', name: 'Soft Skill Development', fullName: 'Soft Skill Development', category: 'Professional & Tools', experience: [] },
];

/* ------------------------------------------------------------------ */
/*  CERTIFICATIONS — grouped by issuer, exact titles & dates per spec  */
/* ------------------------------------------------------------------ */

export const CERTIFICATIONS: Certification[] = [
  /* MongoDB */
  { id: 'mongodb-genai', title: 'MongoDB GenAI Developer', issuer: 'MongoDB', issuerColor: '#00ED64', date: 'Jul 2026', credentialId: '' },
  { id: 'mongodb-agents', title: 'Building AI Agents with MongoDB', issuer: 'MongoDB', issuerColor: '#00ED64', date: 'Jul 2026', credentialId: '' },

  /* Anthropic */
  { id: 'anthropic-code', title: 'Claude Code in Action', issuer: 'Anthropic', issuerColor: '#D97706', date: 'Jun 2026', credentialId: '' },
  { id: 'anthropic-101', title: 'Claude 101', issuer: 'Anthropic', issuerColor: '#D97706', date: 'Jul 2026', credentialId: '' },

  /* Google */
  { id: 'gcp-ai', title: 'Google Certified Innovating with Google Cloud Artificial Intelligence', issuer: 'Google', issuerColor: '#4285F4', date: 'Oct 2025', credentialId: '' },
  { id: 'gcp-analytics', title: 'Google Analytics Individual Qualification', issuer: 'Google', issuerColor: '#4285F4', date: 'Jul 2025', credentialId: '154253741', credentialUrl: 'https://www.credential.net/154253741' },

  /* Oracle */
  { id: 'oci-ds', title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional', issuer: 'Oracle', issuerColor: '#E02A2A', date: 'Sep 2025', credentialId: '102592491OCI25DSOCP' },
  { id: 'oci-genai', title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', issuer: 'Oracle', issuerColor: '#E02A2A', date: 'Sep 2025', credentialId: '102483719OCI25GAIOCP' },

  /* Scaler */
  { id: 'scaler-aws', title: 'Scaler Topics Certified AWS Course', issuer: 'Scaler', issuerColor: '#F27A18', date: 'Oct 2025', credentialId: '' },

  /* HackerRank (NO C#) */
  { id: 'hr-sql', title: 'HackerRank Certified SQL (Basic)', issuer: 'HackerRank', issuerColor: '#2EC4B6', date: 'Oct 2025', credentialId: 'DC27ACC9E315', credentialUrl: 'https://www.hackerrank.com/certificates/DC27ACC9E315' },
  { id: 'hr-python', title: 'HackerRank Certified Python (Basic)', issuer: 'HackerRank', issuerColor: '#2EC4B6', date: 'Jun 2024', credentialId: '2FDFEB568000', credentialUrl: 'https://www.hackerrank.com/certificates/2FDFEB568000' },

  /* Databricks */
  { id: 'databricks', title: 'Databricks Academy Certified Databricks Fundamentals Accreditation', issuer: 'Databricks', issuerColor: '#FF3621', date: 'Oct 2025', credentialId: '' },
];

/* ------------------------------------------------------------------ */
/*  MUSIC                                                              */
/* ------------------------------------------------------------------ */

export const MUSIC = {
  institution: 'Trinity College London',
  qualification: 'OFQUAL Certified',
  instrument: 'Piano / Keyboard',
  grades: [
    { name: 'Grade 4 Practical', level: 'Grade 4', status: 'Passed' },
    { name: 'Grade 4 Theory', level: 'Grade 4', status: 'Passed' },
  ],
  totalCertifications: 8,
  description:
    'Classical keyboard training that sharpens analytical discipline, rhythmic precision and structural thinking \u2014 the same pattern-recognition skills behind good engineering. 8 Trinity College London certifications completed across practical and theory tracks.',
};

/* ------------------------------------------------------------------ */
/*  TERMINAL                                                           */
/* ------------------------------------------------------------------ */

export const TERMINAL_ASCII = String.raw`
 ____    _  _____ _____  _    
|  _ \  / \|_   _|_   _|/ \   
| | | |/ _ \ | |   | | / _ \  
| |_| / ___ \| |   | |/ ___ \ 
|____/_/   \_\_|   |_/_/   \_\
                              
 ____  ____  ___ _   _ ___ _  _______ ____  _   _ 
/ ___||  _ \|_ _| \ | |_ _| |/ / ____/ ___|| | | |
\___ \| |_) || ||  \| || || ' /|  _| \___ \| |_| |
 ___) |  _ < | || |\  || || . \| |___ ___) |  _  |
|____/|_| \_\___|_| \_|___|_|\_\_____|____/|_| |_|
                                                  
  ____ _   _ ___ _   _ _____  _    
 / ___| | | |_ _| \ | |_   _|/ \   
| |   | |_| || ||  \| | | | / _ \  
| |___|  _  || || |\  | | |/ ___ \ 
 \____|_| |_|___|_| \_| |_/_/   \_\
                                   
`;
