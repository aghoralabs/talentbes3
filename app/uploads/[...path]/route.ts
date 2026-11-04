import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.TALENTBES_API_URL || "http://localhost:8080";

// Public proxy for uploaded files. talentbes-api is never reachable directly
// from the browser (it's internal-only on the deployment network); this
// route lets the browser request "/uploads/<path>" from this app's own
// public origin, fetches the bytes from the private API server-to-server,
// and streams them back. The API host/port is never exposed to the client.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const upstream = `${API_URL}/uploads/${path.map(encodeURIComponent).join("/")}`;

  let res: Response;
  try {
    res = await fetch(upstream);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
  if (!res.ok) {
    return new NextResponse("Not found", { status: res.status === 404 ? 404 : 502 });
  }

  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/octet-stream",
      // Uploaded files (stored in PocketBase) get a unique filename each
      // time, so the same URL always means the same bytes — safe to cache
      // forever, in the browser and in any CDN in front of this.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
