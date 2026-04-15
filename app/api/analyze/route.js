import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return NextResponse.json({
      waterDetected: true,
      confidence: 0.82,
      overlayImage: "/demo/overlay.png" // Mock overlay
    });
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
