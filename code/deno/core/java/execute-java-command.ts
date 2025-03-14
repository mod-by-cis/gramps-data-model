
export async function executeCommand(
  pathToJingTrang: string,
  inputFormat: string,
  outputFormat: string,
  inputFile: string,
  outputFile: string,
): Promise<number> {
  const command = new Deno.Command("java", {
    args: [
      "-jar",
      pathToJingTrang,
      "-I",
      inputFormat,
      "-O",
      outputFormat,
      inputFile,
      outputFile,
    ],
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
  });

  const output = await command.output();
  if (output.code === 0) {
    console.log(`Utworzono ${outputFile} z pliku ${inputFile}`);
  } else {
    console.error(
      `Błąd podczas przetwarzania ${inputFile}:`,
      new TextDecoder().decode(output.stderr),
    );
  }
  return output.code;
}