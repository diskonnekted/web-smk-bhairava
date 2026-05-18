import { streamText, StreamTextResult } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
// import { getSchoolContext } from '@/lib/ai-context'; // Removed import
import { CoreMessage } from 'ai';

// Initialize the Groq client using @ai-sdk/openai
const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? '',
  baseURL: 'https://api.groq.com/openai/v1', // Groq's API base URL
});

const getSchoolInfoParams = z.object({
    query_type: z.enum(["majors", "news", "events", "teachers", "projects"]).describe("The type of information to retrieve."),
    major_name: z.string().optional().describe("The name of the major to get details for, if any.")
});

type GetSchoolInfoParams = z.infer<typeof getSchoolInfoParams>;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        // const schoolContext = await getSchoolContext(); // Removed call
        const staticSchoolContext = `SMK Bhairava adalah Sekolah Menengah Kejuruan di Indonesia dengan fokus pada teknologi dan bisnis.`; // Static placeholder

        const result: StreamTextResult = await streamText({
            model: groq('llama3-8b-8192'),
            messages: messages as CoreMessage[],
            system: `You are Bhairava AI, the official AI assistant for SMK Bhairava, a vocational high school in Indonesia.
- Your tone is professional, helpful, and slightly enthusiastic.
- Use the following school context as your primary source of truth:
---
${staticSchoolContext}
---
- If the user asks about majors, news, or events, prioritize the context provided above.
- If you need more specific details not in the context, use the 'get_school_info' tool.
- Do not answer questions outside of this context. If asked about unrelated topics, politely state that you are an assistant for SMK Bhairava and can only answer school-related questions.
- All responses must be in Bahasa Indonesia.
- Maintain a modern, digital-first attitude consistent with a tech-focused school.`,
            tools: {
                get_school_info: {
                    description: "Get information about the school's majors, latest news, or upcoming events.",
                    parameters: getSchoolInfoParams,
                    execute: async ({ query_type, major_name }: GetSchoolInfoParams) => {
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
                        } else if (query_type === 'teachers') {
                            const teachers = await prisma.teacher.findMany({ take: 5, select: { name: true, subjects: true } });
                            tool_response_content = `Some of our teachers: ${teachers.map(t => `${t.name} (teaches: ${t.subjects || 'General'})`).join(', ')}`;
                        } else if (query_type === 'projects') {
                            const projects = await prisma.project.findMany({ take: 3, include: { major: true }, select: { title: true, major: { select: { name: true } } } });
                            tool_response_content = `Recent student projects: ${projects.map(p => `${p.title} (${p.major.name})`).join(', ')}`;
                        }

                        return tool_response_content;
                    }
                }
            },
            maxSteps: 5,
        });

        return result.toDataStreamResponse();

    } catch (error: unknown) {
        console.error('Groq Chat API error:', error);
        return NextResponse.json({ error: 'Failed to connect to AI service.' }, { status: 500 });
    }
}
