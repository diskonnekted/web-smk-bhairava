import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Initialize the Groq client using @ai-sdk/openai
const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? '',
  baseURL: 'https://api.groq.com/openai/v1', // Groq's API base URL
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await streamText({
            model: groq('llama3-8b-8192'),
            messages,
            system: `You are Bhairava AI, the official AI assistant for SMK Bhairava, a vocational high school in Indonesia.
- Your tone is professional, helpful, and slightly enthusiastic.
- You must answer questions based on the school's context using the tools provided.
- If the user asks about majors, news, or events, use the 'get_school_info' tool.
- Do not answer questions outside of this context. If asked about unrelated topics, politely state that you are an assistant for SMK Bhairava and can only answer school-related questions.
- All responses must be in Bahasa Indonesia.
- When you use a tool, you will be given the data. Then, you must use that data to formulate your final answer to the user.`,
            tools: {
                get_school_info: {
                    description: "Get information about the school's majors, latest news, or upcoming events.",
                    parameters: z.object({
                        query_type: z.enum(["majors", "news", "events"]).describe("The type of information to retrieve."),
                        major_name: z.string().optional().describe("The name of the major to get details for, if any.")
                    }),
                    execute: async ({ query_type, major_name }: any) => {
                        let tool_response_content = "";

                        if (query_type === 'majors') {
                            if (major_name) {
                                const majors = await prisma.major.findMany();
                                const major = majors.find(m => m.name.toLowerCase().includes(major_name.toLowerCase()));
                                if (major) {
                                    tool_response_content = `Details for ${major.name}: ${major.description}`;
                                } else {
                                    tool_response_content = `Major '${major_name}' not found.`;
                                }
                            } else {
                                const majors = await prisma.major.findMany({ select: { name: true, category: true } });
                                tool_response_content = `SMK Bhairava has the following majors: ${majors.map(m => m.name).join(', ')}. Categories are: ${[...new Set(majors.map(m => m.category))].join(', ')}.`;
                            }
                        } else if (query_type === 'news') {
                            const news = await prisma.news.findMany({ take: 3, orderBy: { createdAt: 'desc' }, select: { title: true, category: true } });
                            tool_response_content = `Here are the latest news: ${news.map(n => `${n.title} (${n.category})`).join('. ')}`;
                        } else if (query_type === 'events') {
                            const events = await prisma.event.findMany({ take: 3, orderBy: { startDate: 'asc' }, where: { startDate: { gte: new Date() } }, select: { title: true, startDate: true } });
                            tool_response_content = `Upcoming events: ${events.map(e => `${e.title} on ${e.startDate.toDateString()}`).join('. ')}`;
                        }

                        return tool_response_content;
                    }
                }
            },
            maxSteps: 5,
        } as any);

        return (result as any).toDataStreamResponse();

    } catch (error) {
        console.error('Groq Chat API error:', error);
        return NextResponse.json({ error: 'Failed to connect to AI service.' }, { status: 500 });
    }
}
