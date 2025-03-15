import {
  type IGrampsConfigLocal,
  type IGrampsConfigRemote,
  mergeMaps,
  noEmptyString,
  PATH,
  type TGrampsConfig,
  type TGrampsVersionMap,
  type TGrampsxmlConfig,
  type TGrampsxmlVersionMap,
	type TProcessGrampsData,
	type TProcessGrampsSuspend,
} from "../mod.ts";
import { pathJoin } from "../deps.ts";

export class GrampsConfig {
  grampsVersion: TGrampsVersionMap = new Map();
  grampsxmlVersion: TGrampsxmlVersionMap = new Map();

  dirBinJarJAVA: {
    dtdinst: string;
    trang: string;
    jing: string;
  } = {
    dtdinst: "java/dtdinst.jar",
    trang: "java/trang.jar",
    jing: "java/jing.jar",
  };
  dirGrampsxmlModel: string = "model";
  dirsGrampsxmlModel: Map<string, string> = new Map();

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
        TGrampsConfig[string]
      >(
        mapL,
        mapR,
        (valueL, valueR) => ({ ...valueL, ...valueR }),
      );

      // Tworzymy pustą mapę do przechowywania wyników w formacie `TGrampsxmlVersionMap`
      const resultMap2: TGrampsxmlVersionMap = new Map();

      // Sortujemy wynikową mapę `resultMap` według daty commitDate od najnowszej do najstarszej
      const sortedEntries = Array.from(resultMap.entries()).sort(
        ([, valueA], [, valueB]) =>
          new Date(valueB.commitDate).getTime() -
          new Date(valueA.commitDate).getTime(),
      );

      // Iterujemy po posortowanych wpisach
      for (const [, entry] of sortedEntries) {
        // Jeśli `versionGrampsxml` jeszcze nie istnieje w `resultMap2`, dodajemy wpis
        if (!resultMap2.has(entry.versionGrampsxml)) {
          resultMap2.set(entry.versionGrampsxml, entry);
        }
      }
      // Sortowanie `resultMap` alfabetycznie według klucza
      const sortedResultMap = new Map(
        Array.from(resultMap.entries()).sort(([keyA], [keyB]) =>
          keyA.localeCompare(keyB)
        ),
      );

      // Sortowanie `resultMap2` alfabetycznie według klucza
      const sortedResultMap2 = new Map(
        Array.from(resultMap2.entries()).sort(([keyA], [keyB]) =>
          keyA.localeCompare(keyB)
        ),
      );

      const modelDir = (
        await PATH(pathJoin(Deno.cwd(), this.dirGrampsxmlModel), false, true)
      ).pathAbsolute;

      const javaJarBinDir = {
        dtdinst:
          (await PATH(pathJoin(Deno.cwd(), this.dirBinJarJAVA.dtdinst), true))
            .pathAbsolute,
        trang:
          (await PATH(pathJoin(Deno.cwd(), this.dirBinJarJAVA.trang), true))
            .pathAbsolute,
        jing: (await PATH(pathJoin(Deno.cwd(), this.dirBinJarJAVA.jing), true))
          .pathAbsolute,
      };

      // Uzyskanie tablicy kluczy
      const keysArray = Array.from(sortedResultMap2.keys());
      const modelDirs: Map<string, string> = new Map();

      // Użyj `for...of` dla obsługi asynchronicznego `await` w pętli
      for (const key of keysArray) {
        const modelDirK = (
          await PATH(
            pathJoin(Deno.cwd(), this.dirGrampsxmlModel, `grampsxml@${key}`),
            false,
            true,
          )
        ).pathAbsolute;
        modelDirs.set(key, modelDirK);
      }

      this.grampsVersion = sortedResultMap;
      this.grampsxmlVersion = sortedResultMap2;
      this.dirGrampsxmlModel = modelDir;
      this.dirsGrampsxmlModel = modelDirs;
      this.dirBinJarJAVA = javaJarBinDir;
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
   * @param versiongramps Wersja Gramps, np. "v6.0.0-rc1".
   * @returns Obiekt danych dla podanej wersji lub `undefined`, jeśli wersja nie istnieje.
   */
  public getGrampsVersion(
    versiongramps: string,
  ): TGrampsConfig[string] | undefined {
    // Sprawdź, czy klucz istnieje w mapie
    if (this.grampsVersion.has(versiongramps)) {
      return this.grampsVersion.get(versiongramps);
    } else {
      console.warn(`Dane dla wersji ${versiongramps} nie zostały znalezione.`);
      return undefined;
    }
  }

  /**
   * Pobiera dane dla określonej wersji Gramps.
   * @param versiongrampsxml Wersja Grampsxml, np. "v1.7.2".
   * @returns Obiekt danych dla podanej wersji lub `undefined`, jeśli wersja nie istnieje.
   */
  public getGrampsxmlVersion(
    versiongrampsxml: string,
  ): TGrampsxmlConfig[string] | undefined {
    // Sprawdź, czy klucz istnieje w mapie
    if (this.grampsxmlVersion.has(versiongrampsxml)) {
      return this.grampsxmlVersion.get(versiongrampsxml);
    } else {
      console.warn(
        `Dane dla wersji ${versiongrampsxml} nie zostały znalezione.`,
      );
      return undefined;
    }
  }

  /**
   * Iteruje po `this.grampsxmlVersion` i wykonuje podany callback dla każdej pozycji.
   * @param callback Funkcja do wykonania dla każdej pozycji .
   */
  public forEachGrampsxmlVersion(
    callback: (
      Q: TProcessGrampsData,
    ) => void,
  ): void {
    for (const [key, value] of this.grampsxmlVersion.entries()) {
      const X = this.dirsGrampsxmlModel.get(key) ?? "";
      callback({ ...value, dirOfModel: X, JAVA: this.dirBinJarJAVA });
    }
  }

  /**
   * Iteruje po `this.grampsxmlVersion` i wykonuje wiele funkcji callback dla każdej pozycji.
   *
   * @param operations Tablica funkcji callback do wykonania dla każdej pozycji.
   * @param executionSuspendDelay Funkcja wstrzymująca na określoną liczbę milisekund.
   * @param extraArgs Tablica zawierająca dodatkowe argumenty dla każdego callback-a w formie jednego obiektu.
   *
   */
  public async processGrampsxmlVersion(
    operations: ((
      Q: TProcessGrampsData,
      executionSuspendDelay: TProcessGrampsSuspend,
      extraArg: any, //...args: unknown[]
    ) => Promise<void>)[],
    extraArgs: any[], //...args: unknown[]
  ): Promise<void> {
    for (const [key, value] of this.grampsxmlVersion.entries()) {
      const dirOfModel = this.dirsGrampsxmlModel.get(key) ?? "";

      // Tworzymy obiekt dla callbacków
      const callbackData = { ...value, dirOfModel, JAVA: this.dirBinJarJAVA };

      // Wykonujemy wszystkie operacje
      //for (const operation of operations) {
      //  await operation(callbackData, this.executionSuspendDelay, ...args);
      //}
      // Iterujemy przez operacje i ich odpowiadające argumenty
      for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const extraArg = extraArgs[i]; // Pobranie odpowiedniego argumentu z tablicy
        await operation(callbackData, this.executionSuspendDelay, extraArg);
      }
    }
  }

  /**
   * Wstrzymuje wykonanie na określoną liczbę milisekund.
   * @param ms Liczba milisekund do wstrzymania.
   * @returns Obietnica rozwiązywana po określonym czasie.
   */
  private executionSuspendDelay(millisecond: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecond));
  }
}
