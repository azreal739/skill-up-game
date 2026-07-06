# 20 — Example Content Files

This document gives Claude Code concrete examples of the intended data-driven content style.

## Example Campaign Definition

```json
{
  "id": "foundations",
  "title": "Foundations of the Platform",
  "subtitle": "Begin your Academy journey",
  "description": "Learn the Angular, TypeScript, SCSS and Git basics needed to work safely on the platform.",
  "tags": ["angular", "typescript", "scss", "git"],
  "missions": [
    "foundations-001-welcome",
    "foundations-002-first-component",
    "foundations-003-type-safety"
  ],
  "rewards": [
    {
      "type": "badge",
      "id": "platform-initiate",
      "label": "Platform Initiate"
    }
  ]
}
```

## Example Mission Definition

```json
{
  "id": "foundations-001-welcome",
  "campaignId": "foundations",
  "title": "Welcome to the Academy",
  "summary": "Inspect your first platform component and confirm the data model.",
  "difficulty": "intro",
  "learningObjectives": [
    "Understand how missions work",
    "Recognise TypeScript interfaces",
    "Connect typed data to Angular components"
  ],
  "briefing": [
    {
      "speaker": "AI Mentor",
      "text": "Welcome to Engineering Academy. Your first task is to inspect a dashboard card and make sure the data model is safe."
    }
  ],
  "contextArtefacts": [
    {
      "id": "customer-data",
      "type": "code",
      "title": "Customer Data",
      "language": "ts",
      "content": "const customer = { name: 'Avery', score: 720 };"
    }
  ],
  "challenges": [
    {
      "id": "foundations-001-c1",
      "type": "multiple-choice",
      "title": "Choose the Interface",
      "difficulty": "intro",
      "tags": ["typescript"],
      "storyContext": "The dashboard card needs a typed customer model.",
      "prompt": "Which interface best describes the customer data?",
      "options": [
        {
          "id": "a",
          "label": "interface Customer { name: string; score: number; }",
          "isCorrect": true,
          "feedback": "Correct. The shape matches the data."
        },
        {
          "id": "b",
          "label": "interface Customer { name: number; score: string; }",
          "isCorrect": false,
          "feedback": "The property types are reversed."
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "Look at the value types",
          "content": "Avery is text and 720 is a number."
        }
      ],
      "rewards": [
        {
          "type": "xp",
          "amount": 10,
          "label": "Interface selected"
        }
      ],
      "consequences": [],
      "helpLinks": [
        {
          "topicId": "typescript.interfaces",
          "label": "TypeScript Interfaces"
        }
      ]
    }
  ]
}
```

## Example Help Topic

```json
{
  "id": "zod.safeParse",
  "title": "Zod safeParse",
  "tags": ["zod", "api"],
  "summary": "safeParse validates data without throwing an exception.",
  "content": "Use safeParse when you want to validate unknown runtime data and handle success or failure explicitly."
}
```

## Important

The exact schema may change during implementation, but the spirit must remain:
- Data-driven.
- Validated.
- Cross-linked.
- Easy to extend.
