export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ message: "User registered!" }), {
    status: 200,
  });
}
