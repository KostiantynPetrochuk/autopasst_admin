import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { locale } = await req.json();

  cookies().set({
    name: "locale",
    value: locale,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  return new NextResponse(
    JSON.stringify({
      message: "Locale set",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
