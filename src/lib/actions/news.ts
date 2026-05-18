'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function createNews(data: { title: string; content: string; category: string; image?: string; isDraft?: boolean; }) {
  const news = await prisma.news.create({ data });
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
  return news;
}

export async function updateNews(id: string, data: { title?: string; content?: string; category?: string; image?: string; isDraft?: boolean; }) {
  const news = await prisma.news.update({ where: { id }, data });
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
  return news;
}

export async function deleteNews(id: string) {
  await prisma.news.delete({ where: { id } });
  revalidatePath('/admin/news');
  revalidatePath('/news');
  revalidatePath('/');
}

export async function generateNewsDraft(title: string): Promise<{ content: string; category: string; image: string }> {
  console.log("--- Generating AI Draft for title:", title);

  const systemPrompt = `You are a professional content writer for a high-tech vocational school, SMK Bhairava. 
  Your task is to generate a news article draft based on a given title.
  The output MUST be a valid JSON object with three keys: "content", "category", and "image".
  - "content": A concise and engaging news article in Bahasa Indonesia (2-3 paragraphs).
  - "category": Suggest ONE category from this list: ANNOUNCEMENT, EVENT, ACHIEVEMENT.
  - "image": Provide a relevant, royalty-free image URL from 'images.unsplash.com'.

  Example based on title "Siswa SMK Bhairava Juara Lomba Robotik Nasional":
  {
    "content": "Tim robotik SMK Bhairava kembali menorehkan prestasi gemilang dengan meraih Juara 1 dalam ajang Lomba Kompetensi Siswa (LKS) tingkat Nasional bidang Robotika. Kemenangan ini membuktikan kualitas pendidikan berbasis proyek dan teknologi terapan yang diusung sekolah. Tim yang terdiri dari tiga siswa jurusan AI & Machine Learning ini berhasil menciptakan robot sortir otomatis yang mampu mengalahkan puluhan tim dari seluruh Indonesia.",
    "category": "ACHIEVEMENT",
    "image": "https://images.unsplash.com/photo-1678559837773-5582a83a93a3"
  }`;

  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate a news draft for the title: "${title}"` }
      ],
      response_format: { type: 'json_object' },
    });

    const jsonResponse = JSON.parse(response.choices[0].message.content || '{}');
    console.log("--- AI Response Received ---", jsonResponse);
    return jsonResponse;

  } catch (error) {
    console.error("Groq Draft generation error:", error);
    throw new Error("Gagal menghubungi layanan AI. Silakan coba lagi.");
  }
}
