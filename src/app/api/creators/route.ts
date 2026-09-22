import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import {
  syncCreatorApplicationToShopify,
  CreatorApplicationParams,
} from '@/lib/commerce/shopify-customers';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'creator-applications.json');

async function getApplications(): Promise<CreatorApplicationParams[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveApplications(applications: CreatorApplicationParams[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      address,
      customCode,
      seedingSize,
      socials,
      portfolioUrl,
      note,
    } = body;

    // Required Field Validations
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full legal name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ error: 'WhatsApp number is required.' }, { status: 400 });
    }

    if (
      !address ||
      typeof address !== 'object' ||
      !address.street ||
      !address.city ||
      !address.postalCode ||
      !address.country
    ) {
      return NextResponse.json(
        { error: 'Complete delivery address (Street, City, Postal Code, Country) is required for garment seeding.' },
        { status: 400 }
      );
    }

    if (!customCode || typeof customCode !== 'string' || !customCode.trim()) {
      return NextResponse.json(
        { error: 'Please specify your requested community discount code (e.g. ALEX10).' },
        { status: 400 }
      );
    }

    if (!socials || typeof socials !== 'object' || !socials.instagram || !socials.instagram.trim()) {
      return NextResponse.json(
        { error: 'Instagram profile handle or link is compulsory.' },
        { status: 400 }
      );
    }

    // Sanitize custom code: digits/alphabets only, uppercase, max 12 chars
    const sanitizedCode = customCode
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 12);

    if (sanitizedCode.length < 3 || sanitizedCode.length > 12) {
      return NextResponse.json(
        { error: 'Custom code must be between 3 and 12 digits/alphabets (e.g. ARYAN10).' },
        { status: 400 }
      );
    }

    const applications = await getApplications();
    const cleanEmail = email && typeof email === 'string' && email.trim() ? email.trim().toLowerCase() : undefined;
    const cleanInstagram = socials.instagram.trim().toLowerCase();

    // Check for existing application with same email or instagram handle
    const existing = applications.find(
      (app) =>
        (cleanEmail && app.email === cleanEmail) ||
        (app.socials?.instagram && app.socials.instagram.toLowerCase() === cleanInstagram)
    );
    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Your creator application is already on file and under curatorial review.',
        applicationId: existing.applicationId,
        customCode: existing.customCode,
        isExisting: true,
      });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `KLS-CREATOR-${randomSuffix}-APP`;

    const record: CreatorApplicationParams = {
      name: name.trim(),
      email: cleanEmail,
      phone: phone && typeof phone === 'string' && phone.trim() ? phone.trim() : undefined,
      address: {
        street: address.street.trim(),
        city: address.city.trim(),
        state: address.state?.trim() || '',
        postalCode: address.postalCode.trim(),
        country: address.country.trim(),
      },
      customCode: sanitizedCode,
      seedingSize: seedingSize || 'L',
      socials: {
        instagram: socials.instagram.trim(),
        youtube: socials.youtube?.trim() || undefined,
        facebook: socials.facebook?.trim() || undefined,
        linkedin: socials.linkedin?.trim() || undefined,
      },
      portfolioUrl: portfolioUrl?.trim() || undefined,
      note: note?.trim() || undefined,
      applicationId,
    };

    // Save locally
    applications.push(record);
    await saveApplications(applications);

    // Sync to Shopify Admin Customers API
    const shopifyResult = await syncCreatorApplicationToShopify(record);

    return NextResponse.json({
      success: true,
      message: 'Application lodged successfully.',
      applicationId,
      customCode: sanitizedCode,
      syncedToShopify: shopifyResult.synced,
      isExisting: false,
    });
  } catch (error) {
    console.error('Error in /api/creators:', error);
    return NextResponse.json(
      { error: 'Internal server error while lodging application.' },
      { status: 500 }
    );
  }
}
