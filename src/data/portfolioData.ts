import type {
  BuildingProject,
  Certification,
  CompletedSystem,
  ExperienceItem,
  SkillCategory,
} from '../types';

/* ------------------------------------------------------------------ */
/*  IDENTITY                                                            */
/* ------------------------------------------------------------------ */

export const PERSONAL = {
  name: 'Datta Srinikesh Chinta',
  firstName: 'Srinikesh',
  role: 'AI Systems Engineer',
  headline: 'I build intelligent systems that can see, speak, reason and act.',
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
  { value: '02', label: 'Completed Projects', detail: 'Ready to demonstrate' },
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

export const RESEARCH = {
  id: 'fragrance-research',
  title: 'AI-IoT Based Fragrance Detection, Analysis & Generation System Using Spectroscopic Learning',
  shortTitle: 'AI-IoT Fragrance Intelligence',
  status: 'YET TO BE PUBLISHED',
  statusLine: 'RESEARCH MANUSCRIPT \u2014 PRE-PUBLICATION VERSION',
  field: 'Spectroscopic Learning \u00b7 AI-IoT \u00b7 ML',
  abstract:
    'This research proposes an AI-IoT framework for the detection, analysis and generation of fragrance using spectroscopic learning. A fragrance sample is illuminated and its optical absorbance spectrum \u2014 governed by the Beer\u2013Lambert law (A = \u03b5cl) \u2014 is captured by a spectroscopic sensor connected to an ESP32-class IoT controller. Spectral data is preprocessed and classified by a 1D convolutional neural network into fragrance families including Citrus, Floral, Woody, Fruity and Oriental, while top-note / middle-note / base-note structure informs an AI generation stage that composes balanced scent profiles. Preliminary classification results demonstrate high confidence across tested samples, with ongoing work focused on sensor drift compensation, dataset expansion and independent validation.',
  statusBadges: ['YET TO BE PUBLISHED', 'PRE-PUBLICATION RESEARCH'],
  keyEquations: [
    { label: 'Photon energy', equation: 'E = h\u03bd' },
    { label: 'Beer\u2013Lambert law', equation: 'A = \u03b5cl' },
    { label: 'Spectral mixture', equation: 'S_total = \u03a3 w\u1d62S\u1d62' },
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
    'Need more independent samples.',
    'raw spectrum \u2192 preprocessing',
    'feature extraction?',
    'CNN?',
    'test with mixed samples',
    'need larger dataset',
    'sensor drift?',
    'optical fingerprint',
    'absorption depends on molecular structure',
    'validate experimentally',
  ],
  pipeline: [
    { stage: 'Sample', detail: 'Fragrance droplet on spectroscopic sensor' },
    { stage: 'Optics', detail: 'Light passes through / interacts with sample' },
    { stage: 'Spectrum', detail: 'Spectral waveform / absorption graph captured' },
    { stage: 'IoT', detail: 'ESP32 / Raspberry Pi reads sensor data' },
    { stage: 'AI Model', detail: '1D CNN classification from spectral features' },
    { stage: 'Output', detail: 'Fragrance family \u00b7 note structure \u00b7 generation' },
  ],
};

export const RESEARCH_SECTIONS = [
  {
    id: 'abstract',
    title: 'Abstract',
    body:
      'Fragrance analysis traditionally depends on costly chromatographic instrumentation. This work investigates whether compact spectroscopic sensing combined with machine learning can detect, classify and generate fragrance profiles from optical absorbance data. An ESP32-class IoT controller captures spectral signatures, which are preprocessed and passed to a 1D convolutional neural network. The model classifies samples into five fragrance families and, together with top/middle/base-note structure, supports an AI generation stage for composing new scent profiles.',
  },
  {
    id: 'introduction',
    title: 'Introduction',
    body:
      'The sense of smell is one of the most complex human senses to replicate computationally. Fragrance consists of volatile molecules whose absorption of light follows the Beer\u2013Lambert law, producing a spectral \u201coptical fingerprint\u201d unique to each molecular structure. Advances in low-cost spectroscopy, edge IoT hardware and deep learning make it feasible to build an automated system that sees a fragrance\u2019s spectrum and reasons about its character \u2014 opening applications in quality control, perfumery, assistive technology and education.',
  },
  {
    id: 'methodology',
    title: 'Proposed Methodology',
    body:
      'A fragrance droplet is placed on a spectroscopic sensor. Light passes through the sample and the resulting absorption spectrum is recorded. The signal is preprocessed (denoising, normalization, baseline correction) before feature extraction. A 1D convolutional neural network learns to map spectral features to fragrance families. Separately, the top-note / middle-note / base-note profile is modeled so that the generation stage can compose balanced mixtures, represented as a weighted sum of spectral signatures: S_total = \u03a3 w\u1d62S\u1d62.',
  },
  {
    id: 'results',
    title: 'Results & Analysis',
    body:
      'Preliminary results show strong separation between fragrance families, with per-sample classification confidence between 93.5% and 96.8% on the current dataset. The absorption fingerprint approach performs best on Woody and Fruity families, which present more distinct spectral envelopes. Remaining challenges include sensor drift over time, ambient lighting variation and the need for more independent samples to validate generalization.',
  },
  {
    id: 'future',
    title: 'Future Scope',
    body:
      'Planned work includes expanding the dataset with independent samples, adding drift-compensation calibration, comparing the 1D CNN against spectral transformer baselines, and deploying the pipeline to a portable IoT device with on-device inference. The ultimate goal is a complete fragrance analysis-and-generation instrument that is both affordable and reproducible.',
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                         */
/* ------------------------------------------------------------------ */

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
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

export const SKILLS: SkillCategory[] = [
  {
    id: 'programming',
    category: 'Programming',
    skills: [
      { name: 'Python', level: 5, note: 'Core language for AI/ML, FastAPI backends & automation' },
      { name: 'TypeScript', level: 4, note: 'Typed full-stack frontend with React' },
      { name: 'JavaScript', level: 4, note: 'Web & interactive systems' },
      { name: 'SQL', level: 4, note: 'Querying & data modeling' },
      { name: 'Java', level: 3, note: 'Object-oriented programming' },
    ],
  },
  {
    id: 'ai-ml',
    category: 'AI & ML',
    skills: [
      { name: 'Machine Learning', level: 5, note: 'Scikit-learn, model evaluation, feature engineering' },
      { name: 'Deep Learning', level: 4, note: 'CNNs & neural architectures' },
      { name: 'Generative AI', level: 5, note: 'LLMs, prompt engineering, generation workflows' },
      { name: 'RAG', level: 5, note: 'Chunking, embeddings, vector retrieval, grounded answers' },
      { name: 'Voice AI', level: 5, note: 'STT \u2192 LLM \u2192 TTS real-time pipelines' },
      { name: 'Computer Vision', level: 4, note: 'YOLOv8, detection & classification' },
      { name: 'AI Agents', level: 4, note: 'Agentic AI, orchestration & automation' },
      { name: 'NLP', level: 4, note: 'Semantic search, embeddings, multilingual' },
    ],
  },
  {
    id: 'frameworks',
    category: 'Frameworks & Stack',
    skills: [
      { name: 'FastAPI', level: 5, note: 'Async Python backends & streaming APIs' },
      { name: 'React', level: 5, note: 'Component-driven UIs & dashboards' },
      { name: 'Node.js', level: 3, note: 'JavaScript runtimes & tooling' },
      { name: 'Pandas / NumPy', level: 5, note: 'Data analysis & numerical computing' },
      { name: 'Plotly / Matplotlib / Seaborn', level: 4, note: 'Visualization & EDA' },
    ],
  },
  {
    id: 'cloud-tools',
    category: 'Cloud, Models & Tools',
    skills: [
      { name: 'Groq', level: 5, note: 'Whisper + Llama fast inference' },
      { name: 'OpenAI / Hugging Face', level: 4, note: 'Model ecosystem & embeddings' },
      { name: 'AWS', level: 3, note: 'EC2, S3, Lambda, Rekognition' },
      { name: 'Deployment', level: 4, note: 'Netlify, Render, GitHub' },
      { name: 'Git & GitHub', level: 5, note: 'Version control & collaboration' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  CERTIFICATIONS                                                     */
/* ------------------------------------------------------------------ */

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'oci-genai',
    title: 'OCI 2025 Generative AI Professional',
    issuer: 'Oracle',
    issuerColor: '#E02A2A',
    date: '2025',
    description: 'Generative AI architecture and OCI services.',
  },
  {
    id: 'oci-ds',
    title: 'OCI Data Science Professional',
    issuer: 'Oracle',
    issuerColor: '#E02A2A',
    date: '2025',
    description: 'End-to-end data science on Oracle Cloud.',
  },
  {
    id: 'mongodb-genai',
    title: 'GenAI Developer',
    issuer: 'MongoDB',
    issuerColor: '#00ED64',
    date: '2025',
    description: 'Building GenAI applications on MongoDB.',
  },
  {
    id: 'mongodb-agents',
    title: 'Building AI Agents',
    issuer: 'MongoDB',
    issuerColor: '#00ED64',
    date: '2025',
    description: 'Autonomous agent patterns & memory.',
  },
  {
    id: 'anthropic-101',
    title: 'Claude 101',
    issuer: 'Anthropic',
    issuerColor: '#D97706',
    date: '2025',
    description: 'Fundamentals of Claude & LLM prompting.',
  },
  {
    id: 'anthropic-code',
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    issuerColor: '#D97706',
    date: '2025',
    description: 'Agentic coding workflows with Claude.',
  },
  {
    id: 'gcp-ai',
    title: 'Google Cloud AI',
    issuer: 'Google',
    issuerColor: '#4285F4',
    date: '2025',
    description: 'Cloud AI & machine learning services.',
  },
  {
    id: 'gcp-analytics',
    title: 'Google Analytics',
    issuer: 'Google',
    issuerColor: '#4285F4',
    date: '2025',
    description: 'Digital analytics & measurement.',
  },
  {
    id: 'databricks',
    title: 'Databricks Fundamentals',
    issuer: 'Databricks',
    issuerColor: '#FF3621',
    date: '2025',
    description: 'Lakehouse platform & data workflows.',
  },
  {
    id: 'hr-python',
    title: 'Python (Basic)',
    issuer: 'HackerRank',
    issuerColor: '#2EC4B6',
    date: '2025',
    description: 'Core Python problem solving.',
  },
  {
    id: 'hr-sql',
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    issuerColor: '#2EC4B6',
    date: '2025',
    description: 'Relational querying & joins.',
  },
  {
    id: 'hr-csharp',
    title: 'C# (Basic)',
    issuer: 'HackerRank',
    issuerColor: '#2EC4B6',
    date: '2025',
    description: 'C# fundamentals & logic.',
  },
  {
    id: 'scaler-aws',
    title: 'AWS Fundamentals',
    issuer: 'Scaler',
    issuerColor: '#F27A18',
    date: '2025',
    description: 'AWS cloud fundamentals program.',
  },
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
    ____        _   _   _
   / ___|  __ _| |_| |_(_)_ __   __ _
   \___ \ / _` + '`' + ` | __| __| | '_ \ / _` + '`' + ` |
    ___) | (_| | |_| |_| | | | | (_| |
   |____/ \__,_|\__|\__|_|_| |_|\__, |
                                |___/
`;
