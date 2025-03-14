import { 
  xmlParse 
} from "../deps.ts";

export async function executeXmlToJSON(
  inputFilePath: string,
  outputFilePath: string,
): Promise<void> {
  try {
    const contentXML = await Deno.readTextFile(inputFilePath);
    const parsedJSON = xmlParse(contentXML); // Używa funkcji `parse` do konwersji XML na JSON
    await Deno.writeTextFile(
      outputFilePath,
      JSON.stringify(parsedJSON, null, 2),
    );
    console.log(`Skonwertowano ${inputFilePath} na ${outputFilePath}`);
  } catch (error) {
    console.error(`Błąd podczas konwersji ${inputFilePath} na JSON:`, error);
  }
}
