## Project Overview

This project is a **Retrieval-Augmented Generation (RAG) chatbot** that allows users to ask questions and receive accurate answers based only on internal documents.

For this personal project, I used a **coffee shop** as a sample use case, where documents such as _About Us_ and _FAQs_ stored in Google Docs serve as the chatbot’s knowledge base.

The system uses **n8n** to handle document ingestion and chat requests, while a **Next.js frontend** provides the user interface. All responses are generated strictly from the indexed documents, helping reduce hallucinations and ensuring the chatbot only answers using approved information.

---

## Key Features

- Document-based question answering (RAG)
- Automatic document ingestion from Google Drive
- Semantic search using vector embeddings
- LLM-powered responses with strict grounding rules
- Session-based conversational memory
- API-first design for frontend integration
- Secure access via API key validation

---

## High-Level Architecture

```
Google Drive
│
▼
[n8n Ingestion Workflow]
├─ Download documents
├─ Split text into chunks
├─ Generate embeddings
└─ Store vectors in a vector database
│
▼
[n8n RAG Chat API Workflow]
├─ API key & input validation
├─ Retrieve relevant document chunks
├─ Generate response using an LLM
└─ Return structured API response
│
▼
[Next.js Frontend]
```

---

## Technology Stack

- **Frontend:** Next.js (React)
- **Workflow Engine:** n8n
- **LLM & Embeddings:** Google Gemini
- **Vector Database:** Pinecone
- **Document Source:** Google Drive
- **Database:** PostgreSQL (for n8n persistence)
- **Infrastructure:** Docker & Docker Compose

---

## High-Level Setup

1. Clone the repository
2. Configure required environment variables (API keys and service configs)
3. Start backend services using Docker Compose
4. Import and activate the n8n workflows
   - Document ingestion workflow
   - RAG chat API workflow
5. Run the Next.js frontend and connect it to the RAG API

Once running, documents added or updated in the connected Google Drive folder are automatically indexed and immediately available for chat queries.
