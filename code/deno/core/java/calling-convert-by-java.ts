import { PATH, JAVA, FileName, executeCommand, sleep } from "../mod.ts";



export async function convert_step1(
  file: File,
  delay: number,
  ...args: unknown[]
): Promise<void> {
  //const pathToJingTrang = PATH(args[0] as string).string;

  try {
    // Przetwarzanie pliku RNG
    const rngCode = await executeCommand(
      (await PATH(JAVA.trangJAR, true)).pathAbsolute,
      "rng", // input format
      "xsd", // output format
      (await PATH(`${file.fileDIR}/${FileName.RNG}`, true)).pathAbsolute, // input file
      (await PATH(`${file.fileDIR}/${FileName.XSD_RNG}`, false, true))
        .pathAbsolute, // output file
    );
    if (rngCode !== 0) return; // Zakończ przetwarzanie w przypadku błędu
    await sleep(delay);

    // Przetwarzanie pliku DTD
    const dtdCode = await executeCommand(
      (await PATH(JAVA.trangJAR, true)).pathAbsolute,
      "dtd", // input format
      "xsd", // output format
      (await PATH(`${file.fileDIR}/${FileName.DTD}`, true)).pathAbsolute, // input file
      (await PATH(`${file.fileDIR}/${FileName.XSD_DTD}`, false, true))
        .pathAbsolute, // output file
    );
    if (dtdCode !== 0) return; // Zakończ przetwarzanie w przypadku błędu
    await sleep(delay);
  } catch (error) {
    console.error(
      `Błąd w funkcji convert_step1: ${(error as Error).message}`,
    );
  }
}
