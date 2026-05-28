# INotebook — AI-Powered Notes App

A full-stack notes application built with React, Node.js, and SQLite, featuring multiple AI capabilities including LLM-powered summarization, auto-tagging, retrieval-augmented generation (RAG), and a fine-tuned DistilBERT classification model.

---

## Features

### Core
- User authentication (Signup, Login, JWT-based sessions)
- Create, read, update, and delete notes
- Tag-based filtering and search

### AI Features
- **✨ Summarize** — Condenses any note into 2-3 sentences using the Gemini LLM API
- **🏷️ Auto-tag** — Suggests a relevant tag for a note based on its content using Gemini
- **🤖 Ask Your Notes** — RAG-based Q&A that lets you ask questions across all your notes
- **🧠 Classify** — Categorizes notes using a fine-tuned DistilBERT model trained with PyTorch

---

## Tech Stack

**Frontend**
- React, Redux Toolkit, Bootstrap

**Backend**
- Node.js, Express, Sequelize ORM, SQLite

**AI/ML**
- Gemini API (summarization, auto-tagging, RAG)
- HuggingFace Transformers + PyTorch (DistilBERT fine-tuning)
- FastAPI + Uvicorn (model serving)

---

## Architecture

```
Frontend (React)
      ↓
Backend (Node.js/Express) ←→ Gemini API
      ↓
FastAPI Server ←→ Fine-tuned DistilBERT Model
      ↓
SQLite Database
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- Gemini API key (free at aistudio.google.com)

### 1. Clone the repo
```bash
git clone https://github.com/CommanderArcee/INotebook.git
cd INotebook/inotebook
```

### 2. Setup the frontend
```bash
npm install
```

Create a `.env` file in `inotebook/`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Setup the backend
```bash
cd inotebook-backend
npm install
```

Create a `.env` file in `inotebook-backend/`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Train and serve the classification model
```bash
cd ../../ml
pip install torch transformers scikit-learn pandas fastapi uvicorn
jupyter notebook  # Run FineTunedLLM.ipynb to train and save the model
uvicorn classify:app --port 8000
```

### 5. Run the app
```bash
# Terminal 1 - Backend
cd inotebook/inotebook-backend
node app.js

# Terminal 2 - Frontend
cd inotebook/inotebook
npm start
```

App runs at `http://localhost:3000`

---

## ML Model Details

The classification model is a fine-tuned **DistilBERT** (distilbert-base-uncased) for multi-class note categorization.

- **Task**: Multi-class text classification (Study, Career, Personal, Ideas, Gaming)
- **Framework**: PyTorch + HuggingFace Transformers
- **Training data**: 60 labeled note samples
- **Validation accuracy**: 83%
- **Served via**: FastAPI on port 8000

To retrain the model, open `ml/FineTunedLLM.ipynb` and run all cells.

---

## Project Structure

```
INotebook/
├── inotebook/
│   ├── inotebook-backend/    # Node.js/Express API
│   │   ├── routes/           # auth, notes, ai routes
│   │   ├── models/           # Sequelize models
│   │   └── middleware/       # JWT auth middleware
│   └── src/                  # React frontend
│       ├── component/        # NotesCard, Login, Signup etc.
│       ├── pages/            # Home page
│       └── redux/            # State management
└── ml/
    ├── FineTunedLLM.ipynb    # Training notebook
    ├── classify.py           # FastAPI model server
    └── model/                # Saved model (not in repo, regenerate locally)
```

---

## Author

**Krrishnav Gupta** — Third-year B.Tech student at Delhi Technological University  
[GitHub](https://github.com/CommanderArcee)