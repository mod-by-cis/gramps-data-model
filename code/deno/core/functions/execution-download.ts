import { sleep } from "../mod.ts";

export async function downloadAndSaveFile(
  fromURL: string,
  savePath: string,
  delay: number,
): Promise<void> {
  try {
    const response = await fetch(fromURL);
    if (!response.ok) {
      console.error(`Nie udało się pobrać pliku z URL: ${fromURL}`);
      return;
    }
    const data = await response.text(); // Pobranie danych jako tekst
    await Deno.writeTextFile(savePath, data); // Zapis pliku
    console.log(`Pobrano i zapisano plik: ${savePath} z adresu: ${fromURL}`);
    await sleep(delay); // Dodanie opóźnienia
  } catch (error) {
    console.error(
      `Błąd podczas przetwarzania pliku z URL: ${fromURL} - ${
        (error as Error).message
      }`,
    );
  }
}