import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const source = searchParams.get('source') ?? 'en';
  const target = searchParams.get('target') ?? 'zh';

  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'Missing translation text.' }, { status: 400 });
  }

  try {
    const apiUrl = `${process.env.TRANSLATION_API_URL || 'https://api.mymemory.translated.net/get'}?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'EnglishQuest/1.0'
      }
    });

    if (!response.ok) {
      throw new Error('Translation API request failed');
    }

    const data = await response.json();
    const translatedText = data?.responseData?.translatedText || data?.matches?.[0]?.translation || text;

    return NextResponse.json({
      translation: translatedText,
      source,
      target,
      raw: data
    });
  } catch (error) {
    console.error('Translation error:', error);

    const fallbackDictionary: Record<string, string> = {
      hello: '你好',
      travel: '旅行',
      study: '學習',
      friend: '朋友',
      learn: '學習',
      language: '語言',
      practice: '練習',
      understand: '理解'
    };

    const fallback = fallbackDictionary[text.toLowerCase()] || '已添加';

    return NextResponse.json({
      translation: fallback,
      source,
      target,
      fallback: true
    });
  }
}
