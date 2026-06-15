import json

file = "quiz_question.json"

product = [
  {
    
  },
  {
    "question": "What is the capital city of France?",
    "options": [
      { "text": "Rome", "correct": False },
      { "text": "Madrid", "correct": False },
      { "text": "Paris", "correct": True },
      { "text": "Berkin", "correct": False },
    ],
  },
  {
    "question": "Which symbol represents O2",
    "options": [
      { "text": "Gold", "correct": False },
      { "text": "Silver", "correct": False },
      { "text": "Oxygen", "correct": True },
      { "text": "Iron", "correct": False },
    ],
  },
  {
    "question": "Who wrote the play 'Romeo and Juliet'?",
    "options": [
      { "text": "Charles Dickens", "correct": False },
      { "text": "Jane Austen", "correct": False },
      { "text": "Mark Twain", "correct": False },
      { "text": "William Shakespeare", "correct": True },
    ],
  },
  {
    "question": "What is the largest mammal in the world?",
    "options": [
      { "text": "African Elephant", "correct": False },
      { "text": "Blue Whale", "correct": True },
      { "text": "Giraffe", "correct": False },
      { "text": "Great White Shark", "correct": False },
    ],
  },
]

with open(file, "a") as f:
    json.dump(question, f)