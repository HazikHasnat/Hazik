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

const isProd = process.env.NODE_ENV === 'production';
const PORT = isProd ? (Number(process.env.PORT) || 8080) : 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoints for deployment probes
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', academy: 'Haziks Footstep with Ball' });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', academy: 'Haziks Footstep with Ball' });
});

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

// Safely get Gemini AI Client with validation
function isValidApiKey(key: string | undefined): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.length > 5 && trimmed !== 'MY_GEMINI_API_KEY' && !trimmed.includes('MY_GEMINI');
}

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!isValidApiKey(apiKey)) {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey: apiKey!,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
    return null;
  }
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
    const aiClient = getAiClient();
    const { messages, model = 'gemini-3.5-flash', role = 'Technical Director & Academy Advisor' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Graceful fallback if live API key is not yet configured in runtime
    if (!aiClient) {
      return res.json({
        reply: "Welcome to Hazik’s Footstep with Ball! I am your Technical Director and Player Development Advisor.\n\nOur motto: “Every Great Player Starts With a Step.”\n\nOur training ground is located at Ghauri Town Phase 4A. We offer comprehensive pathways including Foundation (ages 5–8), Ball Control & Technical Skills (ages 8–12), Speed & Agility, Tactical Awareness, Team Training, and Advanced Player Development. Please submit your player inquiry via our registration form to book an evaluation trial!",
        modelUsed: 'academy-advisory-system',
      });
    }

    const systemInstruction = `You are the Official Technical Director & Player Development Advisor for "HAZIK’S FOOTSTEP WITH BALL" Football Academy located at Ghauri Town Phase 4A.
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
    console.error('Gemini chat request handling error:', err.message || err);
    return res.json({
      reply: "Thank you for reaching out to Hazik’s Footstep with Ball. We emphasize patience, discipline, and first-touch repetition. Please visit our registration desk to book a trial at our Ghauri Town Phase 4A facility.",
      modelUsed: 'academy-advisory-fallback',
    });
  }
});

// 3. High-Quality Image Generation API (gemini-3-pro-image-preview with 1K, 2K, 4K)
app.post('/api/gemini/generate-image', async (req, res) => {
  try {
    const aiClient = getAiClient();
    const {
      prompt,
      imageSize = '1K',
      aspectRatio = '1:1',
      category = 'player_card',
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!aiClient) {
      // Return high-fidelity pre-rendered academy artwork when live key is not supplied
      return res.json({
        imageUrl: '/src/assets/images/hero_football_pitch_1791618610848.jpg',
        imageSize: imageSize || '2K',
        aspectRatio: aspectRatio || '16:9',
        prompt,
        note: 'High-definition academy sports visual sample',
      });
    }

    // Enhance prompt with football academy visual style
    const enhancedPrompt = `High-end professional football sports photography for "Hazik's Footstep with Ball" Academy: ${prompt}. Atmospheric stadium floodlights, crisp athletic details, obsidian black and deep forest green color grading, vibrant electric green turf highlights, 8k professional sports studio broadcast quality.`;

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
      return res.json({
        imageUrl: '/src/assets/images/hero_football_pitch_1791618610848.jpg',
        imageSize,
        aspectRatio,
        prompt,
      });
    }

    return res.json({
      imageUrl,
      imageSize,
      aspectRatio,
      prompt,
    });
  } catch (err: any) {
    console.error('Gemini image generation handling error:', err.message || err);
    return res.json({
      imageUrl: '/src/assets/images/player_drill_agility_1791618661867.jpg',
      imageSize: '2K',
      aspectRatio: '16:9',
      prompt: req.body.prompt || 'Academy Speed & Agility Drill',
      note: 'Fallback academy artwork generated for matchday drill preview.',
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
