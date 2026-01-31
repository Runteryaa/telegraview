import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const apiKey = '2e6b7819609a4b2ebc35920f5ff8634c7c022458';
  const apiUrl = `https://exe.io/api?api=${apiKey}&url=${encodeURIComponent(url)}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'success' && data.shortenedUrl) {
      return NextResponse.json({ shortenedUrl: data.shortenedUrl });
    } else {
      console.error('exe.io API error:', data);
      return NextResponse.json({ error: 'Failed to shorten URL', details: data }, { status: 500 });
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
