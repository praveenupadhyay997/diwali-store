import { NextResponse } from 'next/server';
import products from '@/data/products';

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
