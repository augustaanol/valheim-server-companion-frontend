import { NextResponse } from "next/server";
import dgram from "dgram";

export async function GET() {
  const host = process.env.VALHEIM_HOST!;
  const ports = [2456, 2457, 2458, 27015, 27016];

  const A2S_INFO = Buffer.from([
    0xFF, 0xFF, 0xFF, 0xFF,
    0x54,
    ...Buffer.from("Source Engine Query"),
    0x00,
  ]);

  async function testPort(port: number) {
    return new Promise<{ port: number; ok: boolean }>((resolve) => {
      const socket = dgram.createSocket("udp4");

      socket.send(A2S_INFO, port, host);

      let returned = false;

      socket.once("message", () => {
        returned = true;
        socket.close();
        resolve({ port, ok: true });
      });

      socket.once("error", () => {
        socket.close();
        resolve({ port, ok: false });
      });

      setTimeout(() => {
        if (!returned) {
          socket.close();
          resolve({ port, ok: false });
        }
      }, 800);
    });
  }

  const results = [];
  for (const p of ports) results.push(await testPort(p));

  return NextResponse.json(results);
}
