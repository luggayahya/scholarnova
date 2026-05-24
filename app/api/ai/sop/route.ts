import { openai } from '@/lib/openai';
import { createClient } from '@/lib/supabase';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await req.json();
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: body.prompt }],
      stream: true,
    });

    // Streaming logic here (simplified)
    return new Response('AI streaming started');
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}