import { PATH, JAVA } from "../mod.ts";

export async function executeCommandJavaDtdinc(
  inputFileDTD: string, // Plik wejściowy DTD
  outputFileXSD: string, // Plik wyjściowy XSD
): Promise<void> {
  const command = new Deno.Command("java", {
    args: [
      "-jar",
      (await PATH(JAVA.dtdinstJAR, true)).pathAbsolute,
      (await PATH(inputFileDTD, true)).pathAbsolute,
    ],
    stdin: "null",
    stdout: "piped", // Przekierowanie wyjścia do pamięci
    stderr: "piped", // Przekierowanie błędów
  });

  const output = await command.output();
  if (output.code === 0) {
    // Zapis wynikowego wyjścia do pliku
    await Deno.writeFile(
      (await PATH(outputFileXSD, false, true)).pathAbsolute,
      output.stdout, // Zawartość wyjścia programu
    );
    console.log(`Pomyślnie przetworzono ${inputFileDTD} do ${outputFileXSD}`);
  } else {
    console.error(
      `Błąd podczas przetwarzania ${inputFileDTD}:`,
      new TextDecoder().decode(output.stderr), // Dekodowanie błędów
    );
  }
}
