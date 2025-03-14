import { PATH, JAVA } from "../mod.ts";

export async function executeCommandJavaTrang(
  inputFormat: string, // Format wejściowy (rng, rnc, dtd, xsd)
  outputFormat: string, // Format wyjściowy (rng, rnc, dtd, xsd)
  inputFile: string, // Plik wejściowy
  outputFile: string, // Plik wyjściowy
): Promise<void> {
  const command = new Deno.Command("java", {
    args: [
      "-jar",
      (await PATH(JAVA.trangJAR, true)).pathAbsolute,
      "-I",
      inputFormat, // Format wejściowy
      "-O",
      outputFormat, // Format wyjściowy
      (await PATH(inputFile, true)).pathAbsolute, // Plik wejściowy
      (await PATH(outputFile, false, true)).pathAbsolute, // Plik wyjściowy
    ],
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
  });

  const output = await command.output();
  if (output.code === 0) {
    console.log(`Pomyślnie przekonwertowano ${inputFile} na ${outputFile}`);
  } else {
    console.error(
      `Błąd podczas konwersji ${inputFile}:`,
      new TextDecoder().decode(output.stderr),
    );
  }
}
