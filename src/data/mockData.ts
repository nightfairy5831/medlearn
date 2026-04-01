export interface Question {
  id: number;
  text: string;
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  year: number;
  source: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
}

export interface Exam {
  id: number;
  title: string;
  description: string;
  subject: string;
  questionCount: number;
  duration: number;
  difficulty: "easy" | "medium" | "hard" | "mixed";
  status: "available" | "in_progress" | "completed";
  score?: number;
  totalScore?: number;
  completedAt?: string;
  attempts: number;
  avgScore: number;
}

export interface StudyTrail {
  id: number;
  title: string;
  description: string;
  subject: string;
  totalModules: number;
  completedModules: number;
  progress: number;
  estimatedHours: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  modules: { id: number; title: string; type: "video" | "reading" | "quiz" | "practice"; duration: number; completed: boolean }[];
  aiRecommended: boolean;
  tags: string[];
}

export interface ContentItem {
  id: number;
  title: string;
  type: "video" | "pdf" | "article" | "presentation";
  subject: string;
  topic: string;
  duration: string;
  size?: string;
  author: string;
  uploadDate: string;
  views: number;
  rating: number;
  thumbnail: string;
  description: string;
}

export interface StudentMetrics {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  studyHours: number;
  examsCompleted: number;
  avgScore: number;
  streak: number;
  rank: number;
  totalStudents: number;
  weeklyProgress: number[];
  subjectPerformance: { subject: string; score: number; total: number }[];
  recentActivity: { action: string; detail: string; time: string; type: string }[];
}

export interface AdminMetrics {
  totalStudents: number;
  activeStudents: number;
  totalInstitutions: number;
  totalQuestions: number;
  totalExams: number;
  totalContent: number;
  monthlyRevenue: number;
  avgSessionTime: number;
  newSignups: number;
  retentionRate: number;
}

export const subjects = [
  "Anatomy", "Physiology", "Biochemistry", "Pathology",
  "Pharmacology", "Microbiology", "Internal Medicine",
  "Surgery", "Pediatrics", "Obstetrics & Gynecology",
  "Cardiology", "Neurology",
];

export const questions: Question[] = [
  {
    id: 1, text: "Which of the following muscles is primarily responsible for abduction of the arm at the shoulder joint?",
    subject: "Anatomy", topic: "Upper Limb", difficulty: "easy", year: 2025, source: "USMLE Step 1",
    options: [{ label: "A", text: "Deltoid" }, { label: "B", text: "Pectoralis Major" }, { label: "C", text: "Latissimus Dorsi" }, { label: "D", text: "Teres Major" }],
    correctAnswer: "A", explanation: "The deltoid muscle, particularly its middle fibers, is the primary abductor of the arm at the shoulder joint. It is responsible for arm abduction from 15 to 90 degrees.",
    tags: ["musculoskeletal", "upper limb", "shoulder"],
  },
  {
    id: 2, text: "What is the primary function of the sinoatrial (SA) node in the heart?",
    subject: "Physiology", topic: "Cardiovascular", difficulty: "easy", year: 2025, source: "USMLE Step 1",
    options: [{ label: "A", text: "Contracts the atria" }, { label: "B", text: "Acts as the primary pacemaker" }, { label: "C", text: "Regulates blood pressure" }, { label: "D", text: "Controls valve opening" }],
    correctAnswer: "B", explanation: "The SA node is the natural pacemaker of the heart, generating electrical impulses at a rate of 60-100 bpm that initiate each cardiac cycle.",
    tags: ["cardiac", "electrophysiology", "pacemaker"],
  },
  {
    id: 3, text: "Which enzyme is rate-limiting in glycolysis?",
    subject: "Biochemistry", topic: "Metabolism", difficulty: "medium", year: 2025, source: "USMLE Step 1",
    options: [{ label: "A", text: "Hexokinase" }, { label: "B", text: "Phosphofructokinase-1" }, { label: "C", text: "Pyruvate kinase" }, { label: "D", text: "Aldolase" }],
    correctAnswer: "B", explanation: "Phosphofructokinase-1 (PFK-1) is the rate-limiting enzyme of glycolysis. It catalyzes the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate and is allosterically regulated.",
    tags: ["metabolism", "glycolysis", "enzymes"],
  },
  {
    id: 4, text: "Which type of necrosis is most commonly associated with myocardial infarction?",
    subject: "Pathology", topic: "Cell Injury", difficulty: "medium", year: 2024, source: "Board Review",
    options: [{ label: "A", text: "Liquefactive necrosis" }, { label: "B", text: "Coagulative necrosis" }, { label: "C", text: "Caseous necrosis" }, { label: "D", text: "Fat necrosis" }],
    correctAnswer: "B", explanation: "Coagulative necrosis is the most common type associated with ischemic injury, including myocardial infarction. The tissue architecture is preserved as ghost outlines.",
    tags: ["necrosis", "cardiac", "ischemia"],
  },
  {
    id: 5, text: "Which class of antibiotics inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins?",
    subject: "Pharmacology", topic: "Antibiotics", difficulty: "easy", year: 2025, source: "USMLE Step 1",
    options: [{ label: "A", text: "Aminoglycosides" }, { label: "B", text: "Beta-lactams" }, { label: "C", text: "Fluoroquinolones" }, { label: "D", text: "Macrolides" }],
    correctAnswer: "B", explanation: "Beta-lactam antibiotics (penicillins, cephalosporins, carbapenems) bind to penicillin-binding proteins (PBPs) and inhibit transpeptidation, the final step in bacterial cell wall synthesis.",
    tags: ["antibiotics", "cell wall", "mechanism"],
  },
  {
    id: 6, text: "Which organism is the most common cause of community-acquired pneumonia?",
    subject: "Microbiology", topic: "Respiratory Infections", difficulty: "easy", year: 2024, source: "Board Review",
    options: [{ label: "A", text: "Staphylococcus aureus" }, { label: "B", text: "Streptococcus pneumoniae" }, { label: "C", text: "Haemophilus influenzae" }, { label: "D", text: "Mycoplasma pneumoniae" }],
    correctAnswer: "B", explanation: "Streptococcus pneumoniae (pneumococcus) is the most common cause of community-acquired pneumonia in adults, accounting for approximately 25-35% of cases.",
    tags: ["pneumonia", "bacteria", "respiratory"],
  },
  {
    id: 7, text: "A 55-year-old male presents with crushing chest pain radiating to the left arm. ECG shows ST elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    subject: "Cardiology", topic: "Acute Coronary Syndrome", difficulty: "hard", year: 2025, source: "Clinical Case",
    options: [{ label: "A", text: "Left anterior descending" }, { label: "B", text: "Left circumflex" }, { label: "C", text: "Right coronary artery" }, { label: "D", text: "Left main coronary" }],
    correctAnswer: "C", explanation: "ST elevation in leads II, III, and aVF indicates an inferior myocardial infarction, most commonly caused by occlusion of the right coronary artery (RCA), which supplies the inferior wall of the heart.",
    tags: ["MI", "ECG", "coronary", "acute care"],
  },
  {
    id: 8, text: "Which neurotransmitter is primarily deficient in Parkinson disease?",
    subject: "Neurology", topic: "Movement Disorders", difficulty: "easy", year: 2024, source: "USMLE Step 2",
    options: [{ label: "A", text: "Acetylcholine" }, { label: "B", text: "Serotonin" }, { label: "C", text: "Dopamine" }, { label: "D", text: "GABA" }],
    correctAnswer: "C", explanation: "Parkinson disease is characterized by loss of dopaminergic neurons in the substantia nigra pars compacta, leading to dopamine deficiency in the basal ganglia.",
    tags: ["neurodegenerative", "dopamine", "basal ganglia"],
  },
  {
    id: 9, text: "In a child presenting with recurrent infections, absence of tonsils, and very low immunoglobulin levels, which condition is most likely?",
    subject: "Pediatrics", topic: "Immunodeficiency", difficulty: "hard", year: 2025, source: "Board Review",
    options: [{ label: "A", text: "DiGeorge syndrome" }, { label: "B", text: "Bruton agammaglobulinemia" }, { label: "C", text: "Common variable immunodeficiency" }, { label: "D", text: "Selective IgA deficiency" }],
    correctAnswer: "B", explanation: "Bruton agammaglobulinemia (X-linked agammaglobulinemia) presents in males after 6 months with recurrent bacterial infections, absent tonsils, and very low levels of all immunoglobulins due to a defect in BTK gene.",
    tags: ["immunodeficiency", "pediatric", "B-cell"],
  },
  {
    id: 10, text: "Which structure passes through the foramen ovale of the skull?",
    subject: "Anatomy", topic: "Head & Neck", difficulty: "medium", year: 2024, source: "USMLE Step 1",
    options: [{ label: "A", text: "Maxillary nerve (V2)" }, { label: "B", text: "Mandibular nerve (V3)" }, { label: "C", text: "Middle meningeal artery" }, { label: "D", text: "Optic nerve (CN II)" }],
    correctAnswer: "B", explanation: "The mandibular nerve (V3), the third division of the trigeminal nerve, passes through the foramen ovale along with the accessory meningeal artery and lesser petrosal nerve.",
    tags: ["cranial nerves", "skull foramina", "head neck"],
  },
  {
    id: 11, text: "Which drug is the first-line treatment for status epilepticus?",
    subject: "Pharmacology", topic: "CNS Drugs", difficulty: "medium", year: 2025, source: "Clinical Guidelines",
    options: [{ label: "A", text: "Phenytoin" }, { label: "B", text: "Lorazepam" }, { label: "C", text: "Valproic acid" }, { label: "D", text: "Levetiracetam" }],
    correctAnswer: "B", explanation: "Benzodiazepines (lorazepam or diazepam) are first-line treatment for status epilepticus. Lorazepam IV is preferred due to its longer duration of action in the CNS.",
    tags: ["epilepsy", "emergency", "benzodiazepines"],
  },
  {
    id: 12, text: "A 28-year-old woman in her first pregnancy at 32 weeks gestation presents with severe hypertension, proteinuria, and headache. What is the most likely diagnosis?",
    subject: "Obstetrics & Gynecology", topic: "Hypertensive Disorders", difficulty: "medium", year: 2025, source: "Clinical Case",
    options: [{ label: "A", text: "Gestational hypertension" }, { label: "B", text: "Preeclampsia with severe features" }, { label: "C", text: "Chronic hypertension" }, { label: "D", text: "HELLP syndrome" }],
    correctAnswer: "B", explanation: "Preeclampsia with severe features is diagnosed when hypertension (>160/110) occurs after 20 weeks with proteinuria and symptoms like severe headache. First pregnancy and 32 weeks are typical risk factors.",
    tags: ["pregnancy", "hypertension", "preeclampsia"],
  },
];

export const exams: Exam[] = [
  { id: 1, title: "Anatomy Comprehensive", description: "Complete anatomy review covering all body systems", subject: "Anatomy", questionCount: 40, duration: 60, difficulty: "mixed", status: "available", attempts: 0, avgScore: 72 },
  { id: 2, title: "Physiology Final Review", description: "Cardiovascular, respiratory, and renal physiology", subject: "Physiology", questionCount: 35, duration: 50, difficulty: "medium", status: "completed", score: 28, totalScore: 35, completedAt: "2026-03-28", attempts: 2, avgScore: 68 },
  { id: 3, title: "Biochemistry Metabolism", description: "Glycolysis, TCA cycle, oxidative phosphorylation", subject: "Biochemistry", questionCount: 30, duration: 45, difficulty: "hard", status: "available", attempts: 0, avgScore: 55 },
  { id: 4, title: "Pathology Board Prep", description: "High-yield pathology topics for board examination", subject: "Pathology", questionCount: 50, duration: 75, difficulty: "hard", status: "in_progress", attempts: 1, avgScore: 62 },
  { id: 5, title: "Pharmacology Essentials", description: "Drug mechanisms, side effects, and interactions", subject: "Pharmacology", questionCount: 40, duration: 60, difficulty: "medium", status: "completed", score: 34, totalScore: 40, completedAt: "2026-03-25", attempts: 1, avgScore: 70 },
  { id: 6, title: "Clinical Medicine Simulation", description: "Case-based clinical decision-making scenarios", subject: "Internal Medicine", questionCount: 25, duration: 45, difficulty: "hard", status: "available", attempts: 0, avgScore: 58 },
  { id: 7, title: "Microbiology Quick Review", description: "Bacteria, viruses, fungi, and parasites", subject: "Microbiology", questionCount: 30, duration: 40, difficulty: "easy", status: "completed", score: 27, totalScore: 30, completedAt: "2026-03-20", attempts: 1, avgScore: 75 },
  { id: 8, title: "Cardiology Deep Dive", description: "Advanced cardiac pathophysiology and management", subject: "Cardiology", questionCount: 20, duration: 30, difficulty: "hard", status: "available", attempts: 0, avgScore: 52 },
];

export const studyTrails: StudyTrail[] = [
  {
    id: 1, title: "Cardiovascular System Mastery", description: "From basic cardiac anatomy to advanced pathophysiology and clinical management",
    subject: "Cardiology", totalModules: 8, completedModules: 5, progress: 62, estimatedHours: 24, difficulty: "intermediate", aiRecommended: true,
    tags: ["heart", "ECG", "cardiac drugs"],
    modules: [
      { id: 1, title: "Cardiac Anatomy Review", type: "video", duration: 45, completed: true },
      { id: 2, title: "Cardiac Electrophysiology", type: "reading", duration: 30, completed: true },
      { id: 3, title: "ECG Interpretation Basics", type: "video", duration: 60, completed: true },
      { id: 4, title: "ECG Practice Quiz", type: "quiz", duration: 20, completed: true },
      { id: 5, title: "Heart Failure Pathophysiology", type: "reading", duration: 40, completed: true },
      { id: 6, title: "Cardiac Pharmacology", type: "video", duration: 50, completed: false },
      { id: 7, title: "Acute Coronary Syndromes", type: "reading", duration: 35, completed: false },
      { id: 8, title: "Comprehensive Cardiology Quiz", type: "practice", duration: 30, completed: false },
    ],
  },
  {
    id: 2, title: "Neuroscience Foundations", description: "Comprehensive neuroscience covering neuroanatomy, physiology, and clinical correlations",
    subject: "Neurology", totalModules: 6, completedModules: 2, progress: 33, estimatedHours: 18, difficulty: "advanced", aiRecommended: true,
    tags: ["brain", "neurotransmitters", "clinical neuro"],
    modules: [
      { id: 1, title: "Neuroanatomy Overview", type: "video", duration: 50, completed: true },
      { id: 2, title: "Neurotransmitter Systems", type: "reading", duration: 35, completed: true },
      { id: 3, title: "Cerebrovascular Anatomy", type: "video", duration: 40, completed: false },
      { id: 4, title: "Movement Disorders", type: "reading", duration: 30, completed: false },
      { id: 5, title: "Neuro Pharmacology", type: "video", duration: 45, completed: false },
      { id: 6, title: "Neurology Case Studies", type: "practice", duration: 25, completed: false },
    ],
  },
  {
    id: 3, title: "Pharmacology Board Review", description: "High-yield pharmacology review organized by drug class and mechanism",
    subject: "Pharmacology", totalModules: 10, completedModules: 7, progress: 70, estimatedHours: 30, difficulty: "intermediate", aiRecommended: false,
    tags: ["drugs", "mechanisms", "side effects"],
    modules: [
      { id: 1, title: "Autonomic Pharmacology", type: "video", duration: 40, completed: true },
      { id: 2, title: "Cardiovascular Drugs", type: "reading", duration: 35, completed: true },
      { id: 3, title: "CNS Pharmacology", type: "video", duration: 45, completed: true },
      { id: 4, title: "Antimicrobial Agents", type: "reading", duration: 40, completed: true },
      { id: 5, title: "Anti-inflammatory Drugs", type: "video", duration: 30, completed: true },
      { id: 6, title: "Endocrine Pharmacology", type: "reading", duration: 35, completed: true },
      { id: 7, title: "Chemotherapy Agents", type: "video", duration: 40, completed: true },
      { id: 8, title: "Drug Interactions Quiz", type: "quiz", duration: 20, completed: false },
      { id: 9, title: "Toxicology Essentials", type: "reading", duration: 25, completed: false },
      { id: 10, title: "Comprehensive Pharm Exam", type: "practice", duration: 30, completed: false },
    ],
  },
  {
    id: 4, title: "Anatomy Quick Start", description: "Essential anatomy for first-year medical students with visual guides",
    subject: "Anatomy", totalModules: 6, completedModules: 6, progress: 100, estimatedHours: 15, difficulty: "beginner", aiRecommended: false,
    tags: ["musculoskeletal", "organs", "systems"],
    modules: [
      { id: 1, title: "Body Systems Overview", type: "video", duration: 30, completed: true },
      { id: 2, title: "Musculoskeletal System", type: "reading", duration: 40, completed: true },
      { id: 3, title: "Thorax & Abdomen", type: "video", duration: 45, completed: true },
      { id: 4, title: "Head & Neck", type: "reading", duration: 35, completed: true },
      { id: 5, title: "Neuroanatomy Basics", type: "video", duration: 40, completed: true },
      { id: 6, title: "Anatomy Final Assessment", type: "practice", duration: 25, completed: true },
    ],
  },
  {
    id: 5, title: "Internal Medicine Cases", description: "Case-based approach to common internal medicine presentations",
    subject: "Internal Medicine", totalModules: 8, completedModules: 3, progress: 37, estimatedHours: 22, difficulty: "advanced", aiRecommended: true,
    tags: ["clinical cases", "diagnosis", "management"],
    modules: [
      { id: 1, title: "Approach to Chest Pain", type: "video", duration: 35, completed: true },
      { id: 2, title: "Dyspnea Workup", type: "reading", duration: 30, completed: true },
      { id: 3, title: "Acute Abdominal Pain", type: "video", duration: 40, completed: true },
      { id: 4, title: "Altered Mental Status", type: "reading", duration: 35, completed: false },
      { id: 5, title: "Electrolyte Disorders", type: "video", duration: 45, completed: false },
      { id: 6, title: "Acid-Base Disorders", type: "reading", duration: 30, completed: false },
      { id: 7, title: "Infectious Disease Cases", type: "video", duration: 40, completed: false },
      { id: 8, title: "IM Case Simulation", type: "practice", duration: 30, completed: false },
    ],
  },
];

export const contentLibrary: ContentItem[] = [
  { id: 1, title: "Cardiac Anatomy - 3D Visualization", type: "video", subject: "Anatomy", topic: "Cardiovascular", duration: "45 min", author: "Dr. Maria Santos", uploadDate: "2026-03-15", views: 12450, rating: 4.8, thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop", description: "Interactive 3D visualization of cardiac anatomy with clinical correlations" },
  { id: 2, title: "ECG Interpretation Guide", type: "pdf", subject: "Cardiology", topic: "Diagnostics", duration: "32 pages", size: "4.2 MB", author: "Dr. Carlos Mendes", uploadDate: "2026-03-10", views: 8920, rating: 4.9, thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop", description: "Comprehensive guide to ECG interpretation from basics to advanced patterns" },
  { id: 3, title: "Pharmacology Mechanisms Map", type: "pdf", subject: "Pharmacology", topic: "Drug Mechanisms", duration: "48 pages", size: "6.8 MB", author: "Dr. Ana Rodrigues", uploadDate: "2026-03-05", views: 15670, rating: 4.7, thumbnail: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=250&fit=crop", description: "Visual pharmacology map covering all major drug classes and their mechanisms" },
  { id: 4, title: "Pathology of Inflammation", type: "video", subject: "Pathology", topic: "Inflammation", duration: "38 min", author: "Dr. Pedro Lima", uploadDate: "2026-02-28", views: 9340, rating: 4.6, thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop", description: "Detailed lecture on acute and chronic inflammation with histological examples" },
  { id: 5, title: "Microbiology Review Charts", type: "presentation", subject: "Microbiology", topic: "Bacteria", duration: "24 slides", author: "Dr. Fernanda Costa", uploadDate: "2026-02-20", views: 11200, rating: 4.5, thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop", description: "High-yield microbiology charts covering bacteria, viruses, and fungi" },
  { id: 6, title: "Neuroanatomy - Brain Regions", type: "video", subject: "Neurology", topic: "Neuroanatomy", duration: "52 min", author: "Dr. Roberto Alves", uploadDate: "2026-02-15", views: 7850, rating: 4.8, thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop", description: "Comprehensive brain anatomy lecture with MRI correlations and clinical cases" },
  { id: 7, title: "Obstetrics Essentials", type: "article", subject: "Obstetrics & Gynecology", topic: "Pregnancy", duration: "15 min read", author: "Dr. Julia Ferreira", uploadDate: "2026-02-10", views: 6430, rating: 4.4, thumbnail: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=250&fit=crop", description: "Essential concepts in obstetrics including prenatal care and high-risk conditions" },
  { id: 8, title: "Surgery - Wound Healing", type: "video", subject: "Surgery", topic: "Wound Care", duration: "28 min", author: "Dr. Marco Souza", uploadDate: "2026-01-30", views: 5120, rating: 4.3, thumbnail: "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=400&h=250&fit=crop", description: "Phases of wound healing, factors affecting healing, and surgical considerations" },
];

export const studentMetrics: StudentMetrics = {
  totalQuestions: 1847,
  correctAnswers: 1385,
  accuracy: 74.9,
  studyHours: 342,
  examsCompleted: 12,
  avgScore: 76.5,
  streak: 15,
  rank: 23,
  totalStudents: 1250,
  weeklyProgress: [65, 72, 68, 78, 82, 75, 80],
  subjectPerformance: [
    { subject: "Anatomy", score: 85, total: 100 },
    { subject: "Physiology", score: 78, total: 100 },
    { subject: "Biochemistry", score: 65, total: 100 },
    { subject: "Pathology", score: 72, total: 100 },
    { subject: "Pharmacology", score: 80, total: 100 },
    { subject: "Microbiology", score: 88, total: 100 },
    { subject: "Internal Medicine", score: 70, total: 100 },
    { subject: "Surgery", score: 68, total: 100 },
    { subject: "Cardiology", score: 82, total: 100 },
    { subject: "Neurology", score: 60, total: 100 },
  ],
  recentActivity: [
    { action: "Completed Exam", detail: "Microbiology Quick Review - 90%", time: "2 hours ago", type: "exam" },
    { action: "Study Trail Progress", detail: "Cardiovascular System - Module 5 completed", time: "5 hours ago", type: "trail" },
    { action: "Question Practice", detail: "25 Pharmacology questions - 84% accuracy", time: "Yesterday", type: "question" },
    { action: "Content Viewed", detail: "ECG Interpretation Guide (PDF)", time: "Yesterday", type: "content" },
    { action: "Completed Exam", detail: "Pharmacology Essentials - 85%", time: "3 days ago", type: "exam" },
    { action: "Study Trail Started", detail: "Neuroscience Foundations", time: "4 days ago", type: "trail" },
    { action: "Question Practice", detail: "30 Anatomy questions - 90% accuracy", time: "5 days ago", type: "question" },
  ],
};

export const adminMetrics: AdminMetrics = {
  totalStudents: 12450,
  activeStudents: 8920,
  totalInstitutions: 45,
  totalQuestions: 15680,
  totalExams: 342,
  totalContent: 1280,
  monthlyRevenue: 285000,
  avgSessionTime: 47,
  newSignups: 1240,
  retentionRate: 87.5,
};

export const pricingPlans = [
  { name: "Student", price: 49, period: "month", features: ["Full question bank access", "Unlimited exams", "3 study trails", "Basic analytics", "Mobile access"], highlighted: false },
  { name: "Pro", price: 99, period: "month", features: ["Everything in Student", "AI-powered study trails", "Advanced analytics", "Personalized recommendations", "Priority support", "Content downloads"], highlighted: true },
  { name: "Institution", price: 499, period: "month", features: ["Everything in Pro", "Unlimited student seats", "Custom exam creation", "Institution dashboard", "API access", "Dedicated support", "White-label option"], highlighted: false },
];

export const testimonials = [
  { name: "Dr. Ana Paula", role: "Resident - Cardiology", text: "MedLearn transformed my board preparation. The AI-powered study trails identified my weak areas and created a personalized plan that boosted my score by 15%.", avatar: "AP" },
  { name: "Prof. Carlos Eduardo", role: "Medical School Director", text: "Our institution adopted MedLearn for all students. The analytics dashboard gives us real-time insights into student performance and helps us improve our curriculum.", avatar: "CE" },
  { name: "Lucas Mendes", role: "4th Year Medical Student", text: "The question bank with detailed explanations is incredible. I practice every day and the adaptive difficulty keeps me challenged. Passed my boards on the first try!", avatar: "LM" },
];

export const platformStats = [
  { label: "Active Students", value: "12,450+", description: "Studying on MedLearn" },
  { label: "Questions", value: "15,680+", description: "In our question bank" },
  { label: "Pass Rate", value: "94.2%", description: "Board exam success" },
  { label: "Institutions", value: "45+", description: "Trust MedLearn" },
];

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value);
}
