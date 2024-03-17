import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIObjectForAssistant } from '@/app/api/utils';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const openai = (await getOpenAIObjectForAssistant(req, prisma)) as OpenAI;

    let assistantId = req.headers.get('X-Assistant-Id');

    let metadata: any = {};
    let fingerprint = req.headers.get('X-Fingerprint');
    if (fingerprint) {
      metadata['fingerprint'] = fingerprint;
    }

    try {
      let createThreadResponse = await openai.beta.threads.create({
        metadata: metadata,
      });

      await prisma.thread.upsert({
        where: {
          id: createThreadResponse.id,
        },
        update: {
          id: createThreadResponse.id,
          assistantId: assistantId,
          object: createThreadResponse as any,
        },
        create: {
          id: createThreadResponse.id,
          assistantId: assistantId,
          object: createThreadResponse as any,
        },
      });

      return Response.json(createThreadResponse, { status: 201 });
    } catch (err: any) {
      console.log(err);
      return Response.json({ message: err.message }, { status: err.status });
    }
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
