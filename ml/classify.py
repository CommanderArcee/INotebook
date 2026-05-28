from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import pickle
import os

app = FastAPI()

model_path = r'C:\Users\krris\INotebook\ml\model'

tokenizer = DistilBertTokenizer.from_pretrained(model_path)
model = DistilBertForSequenceClassification.from_pretrained(model_path)
model.eval()

with open(os.path.join(model_path, 'label_encoder.pkl'), 'rb') as f:
    le = pickle.load(f)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

class NoteInput(BaseModel):
    text: str

@app.post("/classify")
def classify_note(note: NoteInput):
    inputs = tokenizer(
        note.text,
        return_tensors='pt',
        max_length=128,
        padding='max_length',
        truncation=True
    )
    input_ids = inputs['input_ids'].to(device)
    attention_mask = inputs['attention_mask'].to(device)

    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        pred = outputs.logits.argmax(dim=1).item()
        label = le.inverse_transform([pred])[0]
        confidence = torch.softmax(outputs.logits, dim=1).max().item()

    return {"category": label, "confidence": round(confidence, 2)}

@app.get("/health")
def health():
    return {"status": "ok"}