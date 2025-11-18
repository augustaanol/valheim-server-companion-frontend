// src/app/api/active-players/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const host = process.env.VALHEIM_HOST;
  const port = process.env.VALHEIM_STATUS_PORT; // np. 8090

  // --- 1. Sprawdzenie Zmiennych Środowiskowych ---
  if (!host || !port) {
    console.error("Missing VALHEIM_HOST or VALHEIM_STATUS_PORT env vars");
    // Zwracamy server_active: false w przypadku błędu konfiguracji
    return NextResponse.json({
      error: true,
      online: null,
      server_active: false // <--- NOWY ELEMENT
    });
  }

  const url = `http://${host}:${port}/status.json`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    // --- 2. Sprawdzenie Odpowiedzi HTTP ---
    if (!res.ok) {
      // Jeśli serwer zwróci błąd HTTP (np. 500), rzucamy wyjątek
      throw new Error(`Status server error: ${res.status}`);
    }

    const data = await res.json();

    // --- 3. Pomyślne Przetwarzanie Danych ---
    // Zwracamy server_active: true tylko, gdy wszystkie kroki się powiodły
    return NextResponse.json({
      online: data.player_count ?? 0,
      maxPlayers: data.max_players ?? null,
      world: data.world_name ?? null,
      serverName: data.server_name ?? null,
      raw: data,
      server_active: true // <--- NOWY ELEMENT
    });
  } catch (err) {
    // --- 4. Obsługa Błędów (Sieć, HTTP) ---
    console.error("VALHEIM STATUS API ERROR:", err);
    // Zwracamy server_active: false w przypadku błędu połączenia lub statusu HTTP
    return NextResponse.json({
      error: true,
      online: null,
      server_active: false // <--- NOWY ELEMENT
    });
  }
}