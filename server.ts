import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory registrations store for player applications
interface InquiryRecord {
  id: string;
  playerName: string;
  age: number | string;
  guardianName: string;
  phone: string;
  email: string;
  program: string;
  experience: string;
  preferredSchedule: string;
  notes: string;
  timestamp: string;
  status: 'Received' | 'Reviewing' | 'Scheduled';
}

const inquiries: InquiryRecord[] = [];

// Initialize Gemini SDK with User-Agent
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Academy Inquiries / Registration API
app.post('/api/inquiries', (req, res) => {
  try {
    const {
      playerName,
      age,
      guardianName,
      phone,
      email,
      program,
      experience,
      preferredSchedule,
      notes,
    } = req.body;

    if (!playerName || !phone || !email || !program) {
      return res.status(400).json({
        error: 'Missing required registration fields (Player Name, Phone, Email, Program)',
      });
    }

    const newInquiry: InquiryRecord = {
      id: `HFWB-${Date.now().toString(36).toUpperCase()}`,
      playerName,
      age: age || 'Not specified',
      guardianName: guardianName || 'Self / Guardian',
      phone,
      email,
      program,
      experience: experience || 'Beginner',
      preferredSchedule: preferredSchedule || 'Flexible',
      notes: notes || '',
      timestamp: new Date().toISOString(),
      status: 'Received',
    };

    inquiries.unshift(newInquiry);

    return res.status(201).json({
      success: true,
      inquiry: newInquiry,
      message: 'Registration inquiry recorded successfully by Hazik\'s Academy Admissions.',
    });
  } catch (err: any) {
    console.error('Registration inquiry error:', err);
    return res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

app.get('/api/inquiries', (_req, res) => {
  return res.json({ inquiries });
});

// 2. Multi-turn Gemini Chatbot API
app.post('/api/gemini/chat', async (req, res) => {
  try {
    if (!aiClient) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please verify GEMINI_API_KEY in environment secrets.',
      });
    }

    const { messages, model = 'gemini-3.5-flash', role = 'Technical Director & Academy Advisor' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemInstruction = `You are the Official Technical Director & Player Development Advisor for "HAZIK’S FOOTSTEP WITH BALL" Football Academy.
Academy Motto: "Every Great Player Starts With a Step."
Secondary Slogan: "Train With Purpose. Play With Passion. Rise With Every Step."

Brand Personality: Premium, athletic, ambitious, disciplined, inspiring, youthful, trustworthy.
Your role: Provide expert coaching advice, tactical drills, training recommendations for parents and players, age-appropriate guidance (Foundation 5-8, Youth Development 9-12, Elite Academy 13-18), and help them select the right academy program.
Programs offered:
1. Foundation Training (Touch, balance, love for football)
2. Ball Control & Technical Skills (First touch, close dribbling, 1v1 execution)
3. Speed & Agility (Explosive acceleration, footwork, reaction kinetics)
4. Tactical Awareness (Game reading, positioning, spatial decision-making)
5. Team Training (Passing geometry, defensive pressing, transitions)
6. Advanced Player Development (High-intensity match play, mental fortitude, scouting preparation)

Tone: Authoritative yet warm, encouraging, highly structured, grounded in genuine sports coaching pedagogy. Keep answers concise, actionable, and formatted cleanly with bullet points where appropriate. Always reflect Hazik's Footstep With Ball philosophy.`;

    // Convert messages to history for ai.chats.create
    // Last user message is sent via sendMessage
    const previousMessages = messages.slice(0, -1);
    const lastUserMessage = messages[messages.length - 1];

    const formattedHistory = previousMessages.map((m: { role: 'user' | 'model'; text: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const chat = aiClient.chats.create({
      model: model || 'gemini-3.5-flash',
      config: {
        systemInstruction,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({
      message: lastUserMessage.text,
    });

    return res.json({
      reply: response.text,
      modelUsed: model,
    });
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate response from Gemini',
    });
  }
});

// 3. High-Quality Image Generation API (gemini-3-pro-image-preview with 1K, 2K, 4K)
app.post('/api/gemini/generate-image', async (req, res) => {
  try {
    if (!aiClient) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in environment secrets.',
      });
    }

    const {
      prompt,
      imageSize = '1K',
      aspectRatio = '1:1',
      category = 'player_card',
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Enhance prompt with football academy visual style
    const enhancedPrompt = `High-end professional football sports photography for "Hazik's Footstep with Ball" Academy: ${prompt}. Atmospheric stadium floodlights, crisp athletic details, obsidian black and deep forest green color grading, vibrant electric green turf highlights, 8k professional sports studio broadcast quality.`;

    // As specified in user requirements: use gemini-3-pro-image-preview with imageSize (1K, 2K, 4K)
    const response = await aiClient.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || '1:1',
          imageSize: imageSize || '1K',
        },
      },
    });

    let imageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      return res.status(502).json({
        error: 'No image data was returned by the model.',
      });
    }

    return res.json({
      imageUrl,
      imageSize,
      aspectRatio,
      prompt,
    });
  } catch (err: any) {
    console.error('Gemini image generation error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate image',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Hazik's Footstep with Ball server running on port ${PORT}`);
  });
}

startServer();
