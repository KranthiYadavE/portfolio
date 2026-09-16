export const profile = {
  name: "Kranthi Kumar Elupula",
  shortName: "Kranthi",
  title: "Generative AI Engineer",
  location: "Charlotte, North Carolina",
  email: "kranthiyadav1997@gmail.com",
  github: "https://github.com/KranthiYadavE",
  linkedin: "https://www.linkedin.com/in/kranthikumar333/",
  headline:
    "I build ML systems that run in production — RAG pipelines, GPU inference, and backend platforms that hold up under real traffic.",
  summary:
    "Right now at Cloud Nest IT I design RAG systems over clinical documents, fine-tune models for pharmacovigilance, and ship multi-agent workflows with FastAPI, Docker, and Kubernetes. Before that I kept fraud models honest at 1,200 req/sec, then spent years on Amazon's e-commerce billing stack through Accenture. MS CS, Texas A&M–Corpus Christi.",
};

export const metrics = [
  { value: "500K+", label: "clinical docs in RAG", detail: "sub-3s semantic search" },
  { value: "1,200", label: "predictions / sec", detail: "P99 under 300ms" },
  { value: "5M", label: "monthly shoppers", detail: "Amazon billing platform" },
  { value: "Ace", label: "Award at Accenture", detail: "critical memory leak" },
];

export const experience = [
  {
    company: "Cloud Nest IT",
    role: "Generative AI Engineer",
    dates: "Jan 2026 — Present",
    location: "Austin, TX",
    bullets: [
      "Built an end-to-end RAG pipeline with LangChain and Pinecone over 500K+ clinical documents, with sub-3 second search and 94% reviewer-validated relevance.",
      "Fine-tuned a GPT-4-class model with LoRA/PEFT on 18 months of clinical data, lifting domain terminology accuracy by 31% in pharmacovigilance reports.",
      "Shipped a LlamaIndex multi-agent layer with tool-calling that cut medical affairs turnaround time by 40% on multi-step literature review.",
      "Enforced HIPAA/FDA output checks with Guardrails AI (87% fewer non-compliant responses) and deployed FastAPI inference on AKS at 99.7% uptime.",
    ],
  },
  {
    company: "Axitemus",
    role: "Software Engineer — ML",
    dates: "Jan 2025 — Dec 2025",
    location: "Texas, United States",
    bullets: [
      "Traced a 17-point precision drop in a production XGBoost fraud classifier to a silent schema change; retrained and restored precision from 0.74 to 0.89.",
      "Held P99 latency under 300ms through a 3× traffic spike by tuning Kubernetes HPA and batching inference — ~1,200 req/sec, zero dropped predictions.",
      "Replaced fragile cron jobs with a Spark + Kafka feature pipeline on AWS processing ~8M records daily, killing weekly stale-feature incidents.",
      "Owned MLflow staging-to-prod gates and Prometheus/Grafana + PagerDuty, cutting incident detection from ~45 minutes to under 5.",
    ],
  },
  {
    company: "Accenture · Amazon",
    role: "Associate Software Engineer",
    dates: "Jan 2021 — Dec 2023",
    location: "Hyderabad, India",
    bullets: [
      "Contributed to Amazon's e-commerce billing and conversion-tracking platform (Java, TensorFlow) serving 5M monthly active shoppers.",
      "Shipped multi-tier backend modules with Redis caching, serving user-profile reads under 40ms.",
      "Automated metric extraction in Python (+30% throughput) and tightened SQL/connection pooling by 20%.",
      "Won the Ace Award for diagnosing a critical infrastructure memory leak, saving 15% in direct cloud operating costs.",
    ],
  },
  {
    company: "Infosys",
    role: "System Engineer",
    dates: "Jan 2020 — Dec 2021",
    location: "Hyderabad, India",
    bullets: [
      "Supported a healthcare analytics platform with Python and SQL for cleaning and validating medical datasets.",
      "Built a real-time KPI dashboard and helped stand up GitLab + Docker CI/CD for faster, more reliable releases.",
    ],
  },
];

export const projects = [
  {
    featured: true,
    title: "GPU Inference Lab",
    tag: "Inference · CUDA · vLLM",
    description:
      "A full climb of the GPU inference stack on an RTX 4050 6GB: tokenization, KV cache, CUDA/Triton kernels, AWQ quantization, then vLLM, Ray Serve, and TensorRT-LLM. Measured ~301 tok/s aggregate offline with vLLM 0.23.",
    points: [
      "Prefill vs decode, TTFT, ITL, p50/p95/p99, VRAM math",
      "Triton matmul + fused attention vs cuBLAS",
      "Serving, guardrails, and a benchmark dashboard",
    ],
    stack: ["PyTorch", "CUDA", "Triton", "vLLM", "TensorRT-LLM", "AWQ"],
    href: "https://github.com/KranthiYadavE/GPU_Inference",
  },
  {
    featured: true,
    title: "Financial Multi-Agent System",
    tag: "Agents · RAG · Kafka",
    description:
      "Production-style fintech agents with no paid APIs: text-to-SQL, RAG over policy docs, DLP/PII masking, Kafka routing, Redis caching, and Prometheus/Grafana — all local via Ollama, Qdrant, and Docker.",
    points: [
      "Orchestrator routes intents onto Kafka topics + DLQ",
      "SELECT-only SQL, row-level security, output masking",
      "Medallion data (bronze/silver/gold) + K8s manifests",
    ],
    stack: ["FastAPI", "Ollama", "Qdrant", "PostgreSQL", "Kafka", "Redis"],
    href: "https://github.com/KranthiYadavE/Financial_MultiAgent",
  },
  {
    featured: false,
    title: "LLM Panel Interview Simulator",
    tag: "Multi-agent · Gradio",
    description:
      "Three LLM interviewers (Tech, Behavioral, Wildcard) plus a moderator that picks who speaks next from conversation context. Built with GPT-4 and Gradio.",
    stack: ["Python", "OpenAI", "Gradio"],
    href: "https://github.com/KranthiYadavE/LLM-Panel-Interview-Simulator",
  },
  {
    featured: false,
    title: "EmotiveChat",
    tag: "NLP · Transformers",
    description:
      "Sentiment-aware chatbot: DistilBERT on GoEmotions for 27 emotion classes, DialoGPT for replies, Gradio UI with live confidence bars. ~52% accuracy across 7 grouped emotions.",
    stack: ["PyTorch", "Hugging Face", "Gradio"],
    href: "https://github.com/KranthiYadavE/Chat_bot",
  },
  {
    featured: false,
    title: "Triton kNN (L2 Distance)",
    tag: "GPU kernels",
    description:
      "Custom Triton kernels for tiled L2 distance on ~20K vectors, wired into a PyTorch kNN API, checked against a CPU reference, and benchmarked across batch sizes.",
    stack: ["Triton", "PyTorch", "CUDA"],
    href: "https://github.com/KranthiYadavE/GPU_Inference",
  },
  {
    featured: false,
    title: "System Design Patterns",
    tag: "Java · LLD",
    description:
      "Hands-on Java implementations of creational, structural, and behavioral patterns — Factory, Builder, Adapter, Strategy, Observer — for LLD interview prep.",
    stack: ["Java", "OOP", "LLD"],
    href: "https://github.com/KranthiYadavE/System_design",
  },
];

export const skills = [
  {
    group: "Inference & GPU",
    items: [
      "vLLM",
      "TensorRT-LLM",
      "CUDA",
      "Triton kernels",
      "KV cache",
      "AWQ / GPTQ / QLoRA",
      "ONNX",
    ],
  },
  {
    group: "LLMs & Agents",
    items: [
      "LangChain",
      "LlamaIndex",
      "LangGraph",
      "RAG",
      "LoRA / PEFT",
      "Guardrails",
      "Ollama",
    ],
  },
  {
    group: "ML & Data",
    items: [
      "PyTorch",
      "TensorFlow",
      "XGBoost",
      "MLflow",
      "Spark",
      "Kafka",
      "scikit-learn",
    ],
  },
  {
    group: "Backend & Cloud",
    items: [
      "Python",
      "C++",
      "Java",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
  },
];

export const education = [
  {
    school: "Texas A&M University–Corpus Christi",
    credential: "M.S. Computer Science",
    dates: "2023 — 2025",
  },
  {
    school: "MVSR Engineering College",
    credential: "B.E. Information Technology",
    dates: "2016 — 2020",
  },
];

export const certifications = [
  {
    name: "AWS Certified AI Practitioner (AIF-C01)",
    issuer: "Udemy",
    href: "https://udemy.com/certificate/UC-a8529d92-24d3-4085-aaaa-bffba94ab1a3/",
  },
  {
    name: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Udemy",
    href: "https://udemy-certificate.s3.amazonaws.com/image/UC-9ea1a735-bddb-416f-84af-b9b125e3aaa4.jpg",
  },
  {
    name: "LLM Engineering: Master AI, Large Language Models & Agents",
    issuer: "Udemy",
    href: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-ed471769-21c8-4d7a-8143-b612094417a1.pdf",
  },
];
