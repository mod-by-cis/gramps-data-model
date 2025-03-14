import {
  type IGrampsConfig,
  type IGrampsConfigLocal,
  type IGrampsConfigRemote,
  mergeMaps,
  noEmptyString,
  PATH,
} from "../mod.ts";
import { pathJoin } from "../deps.ts";

export class GrampsConfig {
  versionGramps: Map<string, IGrampsConfig[string]> = new Map();

  /**
   * Asynchronicznie ładuje dane konfiguracyjne.
   */
  async loadConfigs(): Promise<void> {
    try {
      const mapL = await this.loadAndFilterConfig<IGrampsConfigLocal>(
        "data/github-gramps-config-local.json",
      );
      const mapR = await this.loadAndFilterConfig<IGrampsConfigRemote>(
        "data/github-gramps-config-remote.json",
      );

      const resultMap = mergeMaps<
        string,
        IGrampsConfigLocal[string],
        IGrampsConfigRemote[string],
        IGrampsConfig[string]
      >(
        mapL,
        mapR,
        (valueL, valueR) => ({ ...valueL, ...valueR }),
      );

      this.versionGramps = resultMap;
    } catch (error) {
      console.error("Błąd podczas ładowania plików konfiguracyjnych:", error);
    }
  }

  /**
   * Wczytuje i filtruje dane konfiguracyjne.
   * @param relativePath Ścieżka relatywna do pliku konfiguracyjnego.
   * @returns Mapa przefiltrowanych danych.
   */
  private async loadAndFilterConfig<
    T extends Record<string, Record<string, string>>,
  >(
    relativePath: string,
  ): Promise<Map<string, T[keyof T]>> {
    try {
      // Pobierz pełną ścieżkę do pliku
      const absolutePath = (
        await PATH(pathJoin(Deno.cwd(), relativePath), true)
      ).pathAbsolute;

      // Wczytaj dane z pliku
      const textData = await Deno.readTextFile(absolutePath);

      // Sparsuj dane i upewnij się, że są zgodne z oczekiwanym typem
      const parsedData: T = JSON.parse(textData);

      // Filtruj wpisy, usuwając te z pustymi wartościami
      const filteredEntries = Object.entries(parsedData).filter(([_, value]) =>
        noEmptyString(Object.values(value))
      ) as [string, T[keyof T]][]; // Użycie rzutowania, by wymusić typ [string, T[keyof T]]

      // Konwertuj dane do Map
      return new Map(filteredEntries);
    } catch (error) {
      console.error(`Błąd podczas wczytywania pliku: ${relativePath}`, error);
      return new Map(); // Zwraca pustą mapę w przypadku błędu
    }
  }
  /**
   * Pobiera dane dla określonej wersji Gramps.
   * @param version Wersja Gramps, np. "v5.0.0".
   * @returns Obiekt danych dla podanej wersji lub `undefined`, jeśli wersja nie istnieje.
   */
  public getData(version: string): IGrampsConfig[string] | undefined {
    // Sprawdź, czy klucz istnieje w mapie
    if (this.versionGramps.has(version)) {
      return this.versionGramps.get(version);
    } else {
      console.warn(`Dane dla wersji ${version} nie zostały znalezione.`);
      return undefined;
    }
  }
}
