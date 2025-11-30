import { NextResponse } from 'next/server';
import { getApiUrl } from '@/lib/api';

export async function GET() {
  try {
    // Use server-side API URL (Docker service name works here)
    const apiUrl = getApiUrl();
    
    const res = await fetch(`${apiUrl}/categories`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Backend responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
