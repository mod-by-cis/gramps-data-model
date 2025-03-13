// Importowanie modułów do obsługi sieci, plików i parsowania XML
import { ensureDir } from "@std/fs";
import { parse } from "@libs/xml";

// Ścieżka do pliku `trang.jar`
const pathToJingTrang = "C:/JAVA-UTIL-JING-TRANG/trang.jar";

// Lista plików do przetwarzania
const files = [
    {input: "./model/grampsxml@v1.7.2/grampsxml.rng", outputXML: "./model/grampsxml@v1.7.2/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.7.2/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.7.1/grampsxml.rng", outputXML: "./model/grampsxml@v1.7.1/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.7.1/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.6.0/grampsxml.rng", outputXML: "./model/grampsxml@v1.6.0/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.6.0/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.5.1/grampsxml.rng", outputXML: "./model/grampsxml@v1.5.1/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.5.1/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.5.0/grampsxml.rng", outputXML: "./model/grampsxml@v1.5.0/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.5.0/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.5.0/grampsxml.rng", outputXML: "./model/grampsxml@v1.5.0/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.5.0/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.4.0/grampsxml.rng", outputXML: "./model/grampsxml@v1.4.0/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.4.0/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.3.0/grampsxml.rng", outputXML: "./model/grampsxml@v1.3.0/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.3.0/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.2.0/grampsxml.rng", outputXML: "./model/grampsxml@v1.2.0/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.2.0/grampsxml.rng.xsd.json",},
    {input: "./model/grampsxml@v1.1.4/grampsxml.rng", outputXML: "./model/grampsxml@v1.1.4/grampsxml.rng.xsd", outputJSON: "./model/grampsxml@v1.1.4/grampsxml.rng.xsd.json"}
];

// Funkcja wykonująca polecenie `java -jar`
async function runJavaCommand(input: string, outputXML: string): Promise<void> {
    const command = new Deno.Command("java", {
        args: [
            "-jar",
            pathToJingTrang,
            "-I", "rng",
            "-O", "xsd",
            input,
            outputXML,
        ],
        stdin: "null",
        stdout: "piped",
        stderr: "piped",
    });

    const { code, stdout, stderr } = await command.output();

    if (code === 0) {
        console.log(`Utworzono ${outputXML} z pliku ${input}`);
    } else {
        console.error(`Błąd podczas przetwarzania ${input}:`, new TextDecoder().decode(stderr));
    }
}

// Funkcja konwertująca plik XML na JSON
async function convertXmlToJson(outputXML: string, outputJSON: string): Promise<void> {
    try {
        const xmlContent = await Deno.readTextFile(outputXML);
        const jsonContent = parse(xmlContent);

        // Tworzenie folderu docelowego, jeśli nie istnieje
        const outputDir = outputJSON.substring(0, outputJSON.lastIndexOf("/"));
        await ensureDir(outputDir);

        // Zapis pliku JSON
        await Deno.writeTextFile(outputJSON, JSON.stringify(jsonContent, null, 2));
        console.log(`Skonwertowano ${outputXML} na ${outputJSON}`);
    } catch (error) {
        console.error(`Błąd podczas konwersji ${outputXML} na JSON:`, error);
    }
}

// Funkcja główna przetwarzająca wszystkie pliki
async function processFiles(): Promise<void> {
    for (const file of files) {
        console.log(`Przetwarzanie pliku: ${file.input}`);
        await runJavaCommand(file.input, file.outputXML); // Generowanie pliku XML
        await convertXmlToJson(file.outputXML, file.outputJSON); // Konwersja XML -> JSON
    }
}

// Uruchomienie procesu
processFiles();
