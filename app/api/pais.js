// Devolve só o país do visitante, que a Vercel já identifica pelo IP
// (cabeçalho x-vercel-ip-country). O IP em si não é lido nem guardado.
export function GET(request) {
  return Response.json(
    { pais: request.headers.get("x-vercel-ip-country") || null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
