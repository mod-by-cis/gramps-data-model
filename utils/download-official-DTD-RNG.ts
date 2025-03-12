// Importowanie modułów do obsługi sieci, plików i parsowania XML
import { ensureDir } from "@std/fs";
import { parse } from "@libs/xml";

// Definicja interfejsu dla danych pliku
interface FileDetails {
  saveIN: string;
  saveAS: string;
  fromURL: string;
}

// Tablica z informacjami o plikach
const files: FileDetails[] = [
    {saveIN: "./model/grampsxml@v1.7.2", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v6.0.0-rc1/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.7.2", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v6.0.0-rc1/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.7.1", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v5.1.6/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.7.1", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v5.1.6/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.6.0", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.1.3/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.6.0", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.1.3/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.5.1", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.4/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.5.1", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.4/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.5.0", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.1/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.5.0", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v4.0.1/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.5.0", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.4.5/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.5.0", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.4.5/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.4.0", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.3.1/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.4.0", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.3.1/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.3.0", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.2.6/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.3.0", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.2.6/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.2.0", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.0.4/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.2.0", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v3.0.4/data/grampsxml.rng"},
    {saveIN: "./model/grampsxml@v1.1.4", saveAS:"grampsxml.dtd", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v2.2.10/data/grampsxml.dtd"},
    {saveIN: "./model/grampsxml@v1.1.4", saveAS:"grampsxml.rng", fromURL:"https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/v2.2.10/data/grampsxml.rng"}
];

// Funkcja opóźniająca (sleep)
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// Funkcja pobierająca plik z sieci i zapisująca go w określonym folderze
async function downloadAndProcessFile(file: FileDetails): Promise<void> {
  try {
    const response = await fetch(file.fromURL);

    if (!response.ok) {
      console.error(`Nie udało się pobrać pliku z URL: ${file.fromURL}`);
      return;
    }

    const data = await response.text(); // Pobranie danych jako tekst
    const folderPath = file.saveIN;
    const filePath = `${folderPath}/${file.saveAS}`;

    // Tworzenie folderu, jeśli nie istnieje
    await ensureDir(folderPath);

    // Zapis pliku .rng
    await Deno.writeTextFile(filePath, data);
    console.log(`Pobrano i zapisano plik: ${filePath}`);

    // Jeśli plik to .rng, konwertuj go do JSON
    if (file.saveAS.endsWith(".rng")) {
      const json = parse(data); // Konwersja XML -> JSON
      const jsonPath = `${filePath}.json`; // Ścieżka dla pliku JSON
      await Deno.writeTextFile(jsonPath, JSON.stringify(json, null, 2));
      console.log(`Skonwertowano plik XML -> JSON i zapisano jako: ${jsonPath}`);
    }
  } catch (error) {    
    const err = error as Error;
    console.error(`Błąd podczas przetwarzania pliku z URL: ${file.fromURL} - ${err.message}`);
  }
}

// Główna funkcja iterująca przez wszystkie pliki
async function processFiles(): Promise<void> {
  for (const file of files) {
    await downloadAndProcessFile(file);

    // Opóźnienie między kolejnymi żądaniami (np. 2 sekundy)
    await sleep(2000);
  }
}

// Uruchomienie procesu
processFiles();
