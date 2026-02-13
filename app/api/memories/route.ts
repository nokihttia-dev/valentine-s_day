import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

export async function GET() {
  try {
    const memoriesDir = path.join(process.cwd(), 'public', 'images', 'memories');
    const entries = await fs.readdir(memoriesDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .map((name) => `/images/memories/${name}`);

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] }, { status: 500 });
  }
}
