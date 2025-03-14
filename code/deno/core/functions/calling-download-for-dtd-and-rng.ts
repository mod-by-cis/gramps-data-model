import { downloadAndSaveFile, FileName, PATH } from "../mod.ts";


export async function fileDTD_fileRNG_download(
  file: File,
  delay: number,
): Promise<void> {
  try {
    // Pobieranie i zapisywanie pliku DTD
    await downloadAndSaveFile(
      `${file.fromURL}/${FileName.DTD}`,
      (await PATH(`${file.fileDIR}/${FileName.DTD}`, false, true)).pathAbsolute,
      delay,
    );

    // Pobieranie i zapisywanie pliku RNG
    await downloadAndSaveFile(
      `${file.fromURL}/${FileName.RNG}`,
      (await PATH(`${file.fileDIR}/${FileName.RNG}`, false, true)).pathAbsolute,
      delay,
    );
  } catch (error) {
    console.error(
      `Błąd w funkcji fileDTD_fileRNG_download: ${(error as Error).message}`,
    );
  }
}

