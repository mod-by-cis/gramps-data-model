export interface IGrampsConfigLocal {
  [versionGramps: string]: {
    versionGramps: string; // (np. "v1.0.0", "v1.0.0-beta")
    commitHash: string; // Hash commita powiązanego z tagiem
    commitDate: string; // Data commita w formacie ISO (np. "2008-01-17T05:34:29Z")
    urlGithubGramps: string; // URL do tagu na GitHubie
  };
}

export interface IGrampsConfigRemote {
  [versionGramps: string]: {
    urlFileDTD: string; // URL do pliku DTD (lub pusty string, jeśli plik nie istnieje)
    urlFileRNG: string; // URL do pliku RNG (lub pusty string, jeśli plik nie istnieje)
    versionGrampsxml: string; // Wersja Gramps XML (np. "v1.7.2"), lub pusty string, jeśli brak informacji
  };
}

export type TGrampsConfig = {
  [versionGramps: string]:
    & IGrampsConfigLocal[string]
    & IGrampsConfigRemote[string];
};
export type TGrampsxmlConfig = {
  [versionGrampsxml: string]: {
    versionGrampsxml: string; // Wersja Gramps XML (np. "v1.7.2"), lub pusty string, jeśli brak informacji
    versionGramps: string; // (np. "v1.0.0", "v1.0.0-beta")
    commitHash: string; // Hash commita powiązanego z tagiem
    commitDate: string; // Data commita w formacie ISO (np. "2008-01-17T05:34:29Z")
    urlGithubGramps: string; // URL do tagu na GitHubie
    urlFileDTD: string; // URL do pliku DTD (lub pusty string, jeśli plik nie istnieje)
    urlFileRNG: string; // URL do pliku RNG (lub pusty string, jeśli plik nie istnieje)
  };
};

export type TGrampsVersionMap = Map<string, TGrampsConfig[string]>;
export type TGrampsxmlVersionMap = Map<string, TGrampsxmlConfig[string]>;
