// src/app/api/active-players/route.ts
import { NextResponse } from "next/server";
import dgram from "dgram";

export async function GET() {
  const host = process.env.VALHEIM_HOST!;
  const port = Number(process.env.VALHEIM_QUERY_PORT) || 27015;

  const A2S_INFO = Buffer.concat([
    Buffer.from([0xFF, 0xFF, 0xFF, 0xFF, 0x54]),
    Buffer.from("Source Engine Query\0", "utf8"),
  ]);

  try {
    const response = await new Promise<Buffer>((resolve, reject) => {
      const socket = dgram.createSocket("udp4");

      const timeout = setTimeout(() => {
        socket.close();
        reject(new Error("Timeout"));
      }, 4000);

      socket.once("error", (err) => {
        clearTimeout(timeout);
        socket.close();
        reject(err);
      });

      socket.once("message", (msg) => {
        clearTimeout(timeout);
        socket.close();
        resolve(msg);
      });

      socket.send(A2S_INFO, port, host, (err) => {
        if (err) {
          clearTimeout(timeout);
          socket.close();
          reject(err);
        }
      });
    });

    let offset = 6;

    const readString = () => {
      const end = response.indexOf(0x00, offset);
      const str = response.toString("utf8", offset, end);
      offset = end + 1;
      return str;
    };

    const serverName = readString();
    const map = readString();
    const folder = readString();
    const game = readString();

    const players = response.readUInt8(offset);
    const maxPlayers = response.readUInt8(offset + 1);

    return NextResponse.json({
      serverName,
      map,
      folder,
      game,
      players,
      maxPlayers,
    });
  } catch (err: unknown) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.error("VALHEIM QUERY ERROR:", message);
    return NextResponse.json({ error: true, players: 0 });
  }
}
