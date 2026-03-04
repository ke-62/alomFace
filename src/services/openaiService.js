import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '../constants';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function fetchFaceAnalysis(base64Image) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: [
          { type: 'text', text: '이 사람의 관상을 봐주시오.' },
          { type: 'image_url', image_url: { url: base64Image } },
        ],
      },
    ],
    max_completion_tokens: 2000,
  });
  return response.choices[0].message.content;
}
