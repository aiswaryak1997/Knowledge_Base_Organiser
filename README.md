# Knowledge base organizer

This is a multistep Next.js app to convert raw text into structured knowledge base data and enrich it using OpenAI's API.

# Features
-Upload multiple files or paste raw text (Step 1)
-View structured data (Step 2)
-Can view the structerd and enriched sections side by side where user can accept the enriched version or keep structured version as it is and save the content (Step 3)

# Technologies used
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/)
- React Hooks (useState, useEffect)
- Markdown Rendering (`react-markdown`)

# Set up

1. Clone the repository
    - Open git bash
    - git clone https://github.com/aiswaryak1997/Knowledge_Base_Organiser.git
    - cd Knowledge_Base_Organiser

2. Install Dependencies
    Make sure you have Node.js (18+ recommended) and npm installed. Then run:
    - npm install

3. Set up Environment variables
    - Create a .env.local file in the root directory:
     touch .env.local
    - Use .env.local.example to know what variables are required
    - Add you API secret key in .env.local
4. Run the Development Server
    - npm run dev
    App will be available at:
    - http://localhost:3000

# API Key Handling
This project uses process.env.OPENAI_API_KEY only in server-side API routes under /app/api/.

- The OpenAI key is never exposed to the client/browser
- All calls to OpenAI are made via secure backend endpoints
- The .env.local file is git-ignored
- .env.local.example is provided for clarity without risking secrets

# Prompt Engineering
The app uses OpenAI to enrich structured text with clear, context-aware prompts that guide the model.

Prompts are written to:
- Add clarity and completeness to knowledge base content
- Preserve tone and structure
- Be deterministic and repeatable
- Example prompt used in app/api/enrichedSection:
    You're an assistant improving documentation.
        Instructions:
            - Rewrite the section heading to be clearer or more descriptive, if necessary.
            - Improve the content for clarity and professionalism.
            - Keep the original intent of both the heading and the body.
            - Do not remove the section heading; always include one.
            - Output only the enriched version with the heading followed by a blank line and improved content.
            Original section: + structuredData

# Output Handling
- Each section is enriched individually
- Users can compare original and enriched side-by-side
- Users decide whether to accept or reject each suggestion based on check button provided
- Final content is built from the user's decisions

# Best Practices Followed
- API Key is hidden from frontend using .env.local
- OpenAI calls are server-side only
- Prompt engineering is controlled and purposeful
- Sensitive info is git-ignored
- Clear step-by-step UX
- Modular, reusable React components

# Author
Aiswarya Kizhakkadath
https://github.com/aiswaryak1997