// Importowanie modułów do obsługi sieci, plików i parsowania XML
import { ensureDir } from "@std/fs";
import { parse } from "@libs/xml";

// Lista plików do przetwarzania
const files = [
    {input: "./model/grampsxml@v1.7.2/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.7.2/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.7.1/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.7.1/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.6.0/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.6.0/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.5.1/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.5.1/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.5.0/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.5.0/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.5.0/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.5.0/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.4.0/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.4.0/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.3.0/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.3.0/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.2.0/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.2.0/grampsxml.dtd.xsd.json",},
    {input: "./model/grampsxml@v1.1.4/grampsxml.dtd.xsd", output: "./model/grampsxml@v1.1.4/grampsxml.dtd.xsd.json"}
];


// Funkcja konwertująca XML na JSON
async function convertXmlToJson(inputPath: string, outputPath: string): Promise<void> {
    try {
        // Wczytanie pliku XML jako tekst
        const xmlContent = await Deno.readTextFile(inputPath);

        // Parsowanie XML do obiektu JSON
        const jsonContent = parse(xmlContent);

        // Tworzenie folderu, jeśli nie istnieje
        const outputDir = outputPath.substring(0, outputPath.lastIndexOf("/"));
        await ensureDir(outputDir);

        // Zapisanie wyniku do pliku JSON
        await Deno.writeTextFile(outputPath, JSON.stringify(jsonContent, null, 2));

        console.log(`Skonwertowano: ${inputPath} -> ${outputPath}`);
    } catch (error) {
        console.error(`Błąd podczas konwersji ${inputPath} do JSON:`, error);
    }
}

// Główna funkcja przetwarzania wszystkich plików
async function processFiles(): Promise<void> {
    for (const file of files) {
        await convertXmlToJson(file.input, file.output);
    }
}

// Uruchomienie procesu
processFiles();
