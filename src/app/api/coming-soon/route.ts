import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface SubscriberRecord {
  email: string;
  vipCode: string;
  queueNumber: number;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'subscribers.json');

async function getSubscribers(): Promise<SubscriberRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: SubscriberRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email format.' },
        { status: 400 }
      );
    }

    const subscribers = await getSubscribers();
    const existing = subscribers.find((s) => s.email === trimmedEmail);

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Welcome back. Your VIP reservation is already confirmed.',
        queueNumber: existing.queueNumber,
        vipCode: existing.vipCode,
        isExisting: true,
      });
    }

    // Base VIP number starts at 100 for prestige feeling
    const queueNumber = 100 + subscribers.length + 1;
    const randomHash = Math.random().toString(36).substring(2, 6).toUpperCase();
    const vipCode = `KLS-02-${String(queueNumber).padStart(4, '0')}-${randomHash}`;

    const newRecord: SubscriberRecord = {
      email: trimmedEmail,
      vipCode,
      queueNumber,
      timestamp: new Date().toISOString(),
    };

    subscribers.push(newRecord);
    await saveSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      message: 'Exclusive Drop 02 VIP allocation reserved successfully.',
      queueNumber,
      vipCode,
      isExisting: false,
    });
  } catch (error) {
    console.error('Coming soon submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error while reserving your allocation.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({
      totalSubscribers: 100 + subscribers.length,
      dropCode: 'DROP-002-MONOLITH',
      status: 'PRE_LAUNCH_ACQUISITION',
    });
  } catch {
    return NextResponse.json({
      totalSubscribers: 100,
      dropCode: 'DROP-002-MONOLITH',
      status: 'PRE_LAUNCH_ACQUISITION',
    });
  }
}
