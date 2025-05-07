import type { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return new Response(
      JSON.stringify({ error: 'Missing name param' }),
      { status: 400 }
    )
  }
  return new Response(JSON.stringify({ note: `this is "${name}" Note.` }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
