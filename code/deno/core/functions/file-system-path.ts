import { 
  ensureDir, 
  exists,
  isAbsolute,
  pathJoin,
  normalize,
  pathParse,
  type ParsedPath,
  relative,
  toFileUrl,
  xmlParse 
} from "../deps.ts";

export async function PATH(
  string: string,
  required: boolean = true,
  dirEnsure: boolean = false,
): Promise<{
  string: string;
  urlFile: URL;
  path: ParsedPath;
  pathRelative: string;
  pathAbsolute: string;
  pathNormalize: string;
  pathExists: undefined | true | false;
}> {
  try {
    // Walidacja parametru `string`
    if (!string || typeof string !== "string" || string.trim() === "") {
      console.error(
        "Błąd: Podany parametr string jest pusty lub nieprawidłowy.",
      );
      Deno.exit(1);
    }

    // Jeśli ścieżka nie jest absolutna, zmień ją na absolutną za pomocą `Deno.cwd()`
    const pathAbsolute = isAbsolute(string)
      ? string
      : pathJoin(Deno.cwd(), string);

    // Normalizacja ścieżki (niezależnie od systemu plików)
    const pathNormalize = normalize(pathAbsolute);

    // Parsowanie ścieżki przy użyciu aliasu `pathParse`
    const path = pathParse(pathNormalize);

    // Domyślnie zmienna pathExists jest ustawiona jako `undefined`
    let pathExists: undefined | true | false = undefined;

    // Wykonanie ensureDir, jeśli dirEnsure = true
    if (dirEnsure) {
      await ensureDir(toFileUrl(pathNormalize)); // Tworzy katalog, jeśli nie istnieje
    }

    // Sprawdzenie, czy katalog (lub plik) istnieje, jeśli required = true
    if (required) {
      pathExists = await exists(pathNormalize);
      if (!pathExists) {
        console.error(`Błąd: Ścieżka ${pathNormalize} nie istnieje.`);
        Deno.exit(1);
      }
    }

    // Tworzenie URL na podstawie normalizowanej ścieżki
    const urlFile = toFileUrl(pathNormalize);

    // Wyliczanie ścieżki relatywnej względem katalogu roboczego
    const pathRelative = relative(Deno.cwd(), pathNormalize);

    // Zwracanie wszystkich przetworzonych danych
    return {
      string,
      urlFile,
      path,
      pathRelative,
      pathAbsolute,
      pathNormalize,
      pathExists,
    };
  } catch (error) {
    console.error(`Błąd w funkcji PATH: ${(error as Error).message}`);
    Deno.exit(1);
  }
}
