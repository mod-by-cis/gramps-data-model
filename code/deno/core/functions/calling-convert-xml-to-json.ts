import { PATH, FileName, sleep, executeXmlToJSON } from "../mod.ts";

export async function convert_step2(
  file: File,
  delay: number,
): Promise<void> {
  const filePaths = [
    {
      input: (await PATH(`${file.fileDIR}/${FileName.RNG}`, true)).pathAbsolute,
      output:
        (await PATH(`${file.fileDIR}/${FileName.JSON_RNG}`, false, true))
          .pathAbsolute,
    },
    {
      input:
        (await PATH(`${file.fileDIR}/${FileName.XSD_RNG}`, true)).pathAbsolute,
      output:
        (await PATH(`${file.fileDIR}/${FileName.JSON_XSD_RNG}`, false, true))
          .pathAbsolute,
    },
    {
      input:
        (await PATH(`${file.fileDIR}/${FileName.XSD_DTD}`, true)).pathAbsolute,
      output:
        (await PATH(`${file.fileDIR}/${FileName.JSON_XSD_DTD}`, false, true))
          .pathAbsolute,
    },
  ];

  for (const filePath of filePaths) {
    await executeXmlToJSON(filePath.input, filePath.output);
    await sleep(delay); // Dodanie opóźnienia po każdym przetwarzaniu pliku
  }
}
