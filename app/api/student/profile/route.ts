// File: pages/api/students/profile.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    // Validate content type
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { message: 'Invalid content type' },
        { status: 400 }
      );
    }

    const backendURL = 'http://localhost:5000/api/students/student/profile';
    const response = await fetch(backendURL, {
      method: 'PUT',
      headers: { 'content-type': contentType },
      body: request.body,
      mode: 'cors',
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = 'Backend error';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = responseText;
      }
      return NextResponse.json({ message: errorMessage }, { status: response.status });
    }

    try {
      return NextResponse.json(JSON.parse(responseText), { status: response.status });
    } catch {
      return NextResponse.json({ message: responseText }, { status: response.status });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}