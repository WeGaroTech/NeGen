# NEGen  
### Indigenous Language AI Assistant for North-East India

NEGen is a domain-focused Generative AI assistant designed to improve access to public information for communities in North-East India by reducing language and information barriers.

The system provides conversational explanations for government services, education guidance, and basic health awareness using a responsible, constrained AI approach.

---

## Problem Statement

Public information in North-East India is primarily available in English or Hindi.  
This creates accessibility barriers for indigenous and tribal communities, especially in rural regions.

As a result:
- Awareness of government schemes remains low
- Eligibility and benefits are often misunderstood
- Education and career guidance is hard to access
- Health awareness information does not reach people effectively

Most existing solutions rely on static content and do not support interactive explanations or follow-up questions.

---

## Solution Overview

NEGen provides a conversational AI interface that explains verified public information in a simple, guided manner.

The system is intentionally **domain-constrained** to ensure accuracy, safety, and trust.

### Supported Domains
- **Government** – Scheme information, eligibility, benefits, documents, and application steps
- **Education** – Career guidance, learning pathways, and concept explanations
- **Health** – Basic health awareness and advisory information (non-diagnostic)

---

## Key Design Principles

- Indigenous-language-first architecture
- Verified and curated data sources
- Conversational explanations instead of static text
- Responsible AI with strict scope boundaries
- Modular and future-ready system design

---

## AI Architecture

NEGen uses a constrained Generative AI pipeline to balance usability and safety.

### Core Components
- **Large Language Model (LLM)** for reasoning and explanation
- **Retrieval-Augmented Generation (RAG)** to ground responses in verified data
- **Optional Translation Layer** for indigenous language interaction

### High-Level Flow
User Query ↓ Domain Selection (Government / Education / Health) ↓ Context Retrieval (RAG) ↓ LLM Reasoning & Explanation ↓ (Optional Translation Layer) ↓ Response to User

---

## Machine Translation (Current Status)

There is currently no publicly available, production-ready machine translation model for many indigenous languages of North-East India, including Garo.

NEGen is designed with a **modular translation layer** that allows:
- Research-based translation experiments
- Future integration with government or community-supported MT models
- Seamless upgrades without redesigning the system

The current focus is on building a correct and extensible AI architecture.

---

## Data Strategy

- Uses curated, verified public information
- Avoids unverified real-time sources to prevent misinformation
- Supports structured knowledge storage for reliable retrieval
- Designed for future integration with official APIs when available

---

## Responsible AI & Privacy

NEGen follows privacy-by-design and responsible AI principles:

- No user authentication
- No personal data collection
- No conversation storage
- Session-based processing only
- Clear scope limitations, especially for health-related content

The system is designed to support awareness and guidance, not decision-making or diagnosis.

---

## Technology Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Python
- FastAPI

### AI & NLP
- Large Language Model (LLM)
- Retrieval-Augmented Generation (RAG)
- Optional Machine Translation layer

### Deployment
- Local or on-premise execution
- CPU-friendly design
- No mandatory cloud dependency

---

## Disclaimer

NEGen is an informational AI system intended to improve awareness and accessibility.  
It does not replace official government sources or professional medical advice.

---

## Future Scope

- Indigenous language machine translation integration
- Expansion to additional North-East states
- Voice-based interaction
- Official API integration
- Community-driven data contributions
