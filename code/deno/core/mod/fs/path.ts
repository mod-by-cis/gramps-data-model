// # "./mod/fs/path.ts"
// # from "@-/core/fs/path"
// --------------------------

import { dirname, isAbsolute, join, toFileUrl } from "@std/path";
import { ensureDir, ensureDirSync, exists, existsSync } from "@std/fs";

/**
 * Tryby operacji na ścieżce
 */
enum E_PathMode {
  NONE = "none", // Brak trybu, brak akcji
  WHEN_EXIST_DO = "pathExist", // Sprawdzanie, czy ścieżka istnieje
  WHEN_NOT_EXIST_DO = "pathNotExist", // Sprawdzanie, czy ścieżka nie istnieje
  WHEN_NOT_EXIST_ERROR = "pathNotExistError", // Sprawdzanie, czy ścieżka nie istnieje
  WHEN_NOT_EXIST_CREATE_DIR = "createDir", // Tworzenie katalogu, jeśli nie istnieje
  WHEN_NOT_EXIST_CREATE_FILE = "createFile", // Tworzenie pliku, jeśli nie istnieje

  CREATE_DIR = "createDir", // Tworzenie katalogu, jeśli nie istnieje
  CREATE_FILE = "createFile", // Tworzenie pliku, jeśli nie istnieje
  IS_EXISTS = "pathNotExist", // Sprawdzanie, czy ścieżka istnieje
}

/**
 * Struktura wyniku operacji na ścieżce
 */
interface I_Path {
  abs: string; // Absolutna ścieżka
  url: string; // URL pliku
}

type T_Path = string | URL | I_Path;
/**
 *  Opcjonalne callbacki dla operacji na ścieżce
 */
interface I_PathCallbacks {
  whenErrorDo?: (path: I_Path, error: Error) => void;
  whenPathExistDo?: (path: I_Path) => void;
  whenPathNotExistDo?: (path: I_Path) => void;
}

/**
 * Klasa zarządzająca operacjami na ścieżkach
 */
class C_Path {
  
  /**
   * Funkcja synchroniczna
   */
  static f_pathSync(
    path: T_Path | T_Path[],
    mode: E_PathMode = E_PathMode.NONE,
    callbacks?: I_PathCallbacks,
  ): I_Path {
    path = this.#f_pathTESTING(path) as I_Path;
    try {
      const pathExists = existsSync(path.abs);
      this.#f_handleModeAndCallbacks(path, mode, pathExists, callbacks);
    } catch (error) {
      this.#f_handleErrorAndCallback(error, path, callbacks);
    }

    return path;
  }

  /**
   * Funkcja asynchroniczna
   */
  static async f_pathAsync(
    path: T_Path | T_Path[],
    mode: E_PathMode = E_PathMode.NONE,
    callbacks?: I_PathCallbacks,
  ) {
    path = this.#f_pathTESTING(path) as I_Path;
    try {
      const pathExists = await exists(path.abs);
      this.#f_handleModeAndCallbacks(path, mode, pathExists, callbacks);
    } catch (error) {
      this.#f_handleErrorAndCallback(error, path, callbacks);
    }

    return path;
  }

  /**
   * Funkcja pomocnicza do sprawdzenia poprawności ścieżki synchronicznie
   */
  static f_pathValidSync(xxx: unknown): boolean {
    // Sprawdzanie typu przed dalszym użyciem
    if (
      typeof xxx === "string" || xxx instanceof URL ||
      this.#f_isValidTypePath(xxx)
    ) {
      const xxBoolean = this.#f_validatedPath(xxx)[0];
      const xxTestCorrect = (() => {
        try {
          this.f_pathSync(this.#f_validatedPath(xxx)[1]);
          return true;
        } catch (_error) {
          return false;
        }
      })();
      // Zwracamy true, jeśli oba testy są poprawne
      return xxBoolean && xxTestCorrect;
    }
    return false; // Jeśli xxx nie jest odpowiedniego typu
  }

  /**
   * Funkcja pomocnicza do sprawdzenia poprawności ścieżki asynchronicznie
   */
  static async f_pathValidAsync(xxx: unknown): Promise<boolean> {
    // Sprawdzanie typu przed dalszym użyciem
    if (
      typeof xxx === "string" || xxx instanceof URL ||
      this.#f_isValidTypePath(xxx)
    ) {
      const xxBoolean = this.#f_validatedPath(xxx)[0];
      const xxTestCorrect = await (async () => {
        try {
          await this.f_pathAsync(this.#f_validatedPath(xxx)[1]);
          return true;
        } catch (_error) {
          return false;
        }
      })();
      // Zwracamy true, jeśli oba testy są poprawne
      return xxBoolean && xxTestCorrect;
    }
    return false; // Jeśli xxx nie jest odpowiedniego typu
  }

  static f_join(path: T_Path | T_Path[]): string {
    const [path1, ...paths] = Array.isArray(path) ? path : [path];
    // ! Upewnij się, że path1 nie jest undefined
    // !const basePath = path1 && isAbsolute(path1) ? path1 : Deno.cwd();
     // Używamy `#f_validatedPath` do walidacji i konwersji `path1`
    const basePath = this.#f_validatedPath(path1)[1] || Deno.cwd();
    // Walidacja ścieżek
    const validatedPaths = paths.map((p) => this.#f_validatedPath(p)[1]);
    // Połącz bazową ścieżkę z pozostałymi
    return join(basePath, ...validatedPaths);
  }

  /* * ========================= METODY POMOCNICZE ======================================= */
  /* * ========================= OBSŁUGA TRYBU FUNKCJI ZWROTNYCH ========================= */

  static #f_handleModeAndCallbacks(
    path: I_Path,
    mode: E_PathMode,
    pathExists: boolean,
    callbacks?: I_PathCallbacks,
  ): void {
    switch (mode) {
      case E_PathMode.WHEN_NOT_EXIST_ERROR:
        // Błąd! jeśli ścieżka nie istnieje
        if (!pathExists) {
          throw new Error(`❌ Ścieżka nie istnieje: ${path.url}`);
        }
        break;

      case E_PathMode.WHEN_NOT_EXIST_DO:
        // Wywołanie callbacka, jeśli ścieżka nie istnieje
        if (!pathExists && callbacks?.whenPathNotExistDo) {
          callbacks.whenPathNotExistDo(path);
        }
        break;

      case E_PathMode.WHEN_EXIST_DO:
        if (pathExists && callbacks?.whenPathExistDo) {
          callbacks.whenPathExistDo(path); // Wywołanie callbacka, jeśli ścieżka istnieje
        }
        break;

      case E_PathMode.CREATE_DIR:
        if (!pathExists) {
          ensureDirSync(path.abs);
          console.log(`📂 Utworzono katalog: ${path.url}`);
        }
        break;

      case E_PathMode.CREATE_FILE:
        if (!pathExists) {
          ensureDirSync(dirname(path.abs));
          Deno.writeTextFileSync(path.abs, ""); // Tworzymy pusty plik
          console.log(`📄 Utworzono plik: ${path.url}`);
        }
        break;

      case E_PathMode.NONE:
      default:
        // Nie wykonujemy żadnej dodatkowej akcji, tylko zwracamy ścieżkę
        break;
    }
  }

  static #f_handleErrorAndCallback(
    error: unknown,
    path: I_Path,
    callbacks?: I_PathCallbacks,
  ) {
    if (error instanceof Error) {
      console.error(`🚨 Błąd przy operacji na ścieżce: ${path.url}\n`, error);
      // Jeśli callback jest podany, wywołujemy go
      if (callbacks?.whenErrorDo) {
        callbacks.whenErrorDo(path, error);
      }
    } else {
      console.error(
        `🚨 Niezidentyfikowany błąd przy operacji na ścieżce: ${path.url}`,
      );
    }
  }
  
  /* * ========================= METODY POMOCNICZE ======================================= */
  /* * ========================= OBSŁUGA WALIDACJI I NORMALIZACJI ======================== */

  static #f_isValidTypePath(path: unknown): path is I_Path {
    return typeof path === "object" && path !== null &&
      Object.keys(path).length === 2 &&
      "abs" in path && typeof (path as I_Path).abs === "string" &&
      "url" in path && typeof (path as I_Path).url === "string";
  }

  static #f_validatedPath2(path: T_Path): [boolean, string] {
    // Sprawdzamy, czy ścieżka jest poprawna
    const isValid = this.#f_isValidTypePath(path) || path instanceof URL ||
      (typeof path === "string" && path.trim().length > 0);

    // Jeśli ścieżka jest niepoprawna, zwracamy [false, '']
    if (!isValid) {
      return [false, ""];
    }

    // Zwracamy [true, ścieżka jako string]
    const validatedPath = this.#f_isValidTypePath(path)
      ? path.abs
      : path instanceof URL
      ? path.pathname
      : path;

    return [true, validatedPath];
  }
  static #f_validatedPath(path: T_Path | T_Path[]): [boolean, string] {
    // Jeśli `path` jest tablicą, weź pierwszy element
    const singlePath = Array.isArray(path) ? path[0] : path;

    // Sprawdzamy, czy ścieżka jest poprawna
    const isValid = this.#f_isValidTypePath(singlePath) || singlePath instanceof URL ||
        (typeof singlePath === "string" && singlePath.trim().length > 0);

    // Jeśli ścieżka jest niepoprawna, zwracamy [false, '']
    if (!isValid) {
        return [false, ""];
    }

    // Konwersja na string
    const validatedPath = this.#f_isValidTypePath(singlePath)
        ? singlePath.abs
        : singlePath instanceof URL
        ? singlePath.pathname
        : singlePath;

    return [true, validatedPath];
}


  static #f_normalizePathForWin(path: string): string {
    // Normalizacja dla Windows (zamiana "\" na "/")
    if (Deno.build.os === "windows") {
      return path.replace(/\\/g, "/");
    } else {
      return path;
    }
  }

  static #f_normalizePathReturn(path: string): I_Path {
    return {
      abs: path,
      url: toFileUrl(path).href,
    };
  }  

  static #f_pathTESTING(path: T_Path | T_Path[]) {
    path = this.#f_validatedPath(path)[1]; // Użycie #f_validatedPath dla walidacji
    let absolutePath = this.f_join(path); // Połącz ścieżki
    absolutePath = this.#f_normalizePathForWin(absolutePath); // Normalizowanie ścieżki

    return this.#f_normalizePathReturn(absolutePath);
  }

}

export { C_Path, E_PathMode, type I_Path, type I_PathCallbacks, type T_Path };
