import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { syncSubscriberToShopify } from '@/lib/commerce/shopify-customers';

interface EarlySubscriber {
  name: string;
  email: string;
  phone: string;
  vipCode: string;
  queueNumber: number;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'subscribers.json');

async function getSubscribers(): Promise<EarlySubscriber[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: EarlySubscriber[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ error: 'Please provide your contact number.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    const subscribers = await getSubscribers();
    const existing = subscribers.find((s) => s.email === trimmedEmail);

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Welcome back. Your allocation is already confirmed.',
        name: existing.name || trimmedName,
        queueNumber: existing.queueNumber,
        vipCode: existing.vipCode,
        isExisting: true,
      });
    }

    const queueNumber = 100 + subscribers.length + 1;
    const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase();
    const vipCode = `KLS-02-${String(queueNumber).padStart(4, '0')}-${randomHash}`;

    const newRecord: EarlySubscriber = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      vipCode,
      queueNumber,
      timestamp: new Date().toISOString(),
    };

    subscribers.push(newRecord);
    await saveSubscribers(subscribers);

    // Synchronize to Shopify Customers database if configured
    await syncSubscriberToShopify({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      vipCode,
      queueNumber,
    });

    return NextResponse.json({
      success: true,
      message: 'Allocation secured successfully.',
      name: trimmedName,
      queueNumber,
      vipCode,
      isExisting: false,
    });
  } catch (error) {
    console.error('Error in /api/early:', error);
    return NextResponse.json(
      { error: 'Internal server error while reserving allocation.' },
      { status: 500 }
    );
  }
}
