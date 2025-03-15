export interface IGrampsConfigLocal {
  [versionGramps: string]: {
    commitDate: string; // Data commita w formacie ISO (np. "2008-01-17T05:34:29Z")
    commitHash: string; // Hash commita powiązanego z tagiem
    urlGithubGramps: string; // URL do tagu na GitHubie
    versionGramps: string; // (np. "v1.0.0", "v1.0.0-beta")
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
  [versionGramps: string]: {
    commitDate: string; // Data commita w formacie ISO (np. "2008-01-17T05:34:29Z")
    commitHash: string; // Hash commita powiązanego z tagiem
    urlFileDTD: string; // URL do pliku DTD (lub pusty string, jeśli plik nie istnieje)
    urlFileRNG: string; // URL do pliku RNG (lub pusty string, jeśli plik nie istnieje)
    urlGithubGramps: string; // URL do tagu na GitHubie
    versionGramps: string; // (np. "v1.0.0", "v1.0.0-beta")
    versionGrampsxml: string; // Wersja Gramps XML (np. "v1.7.2"), lub pusty string, jeśli brak informacji
  };
};
export type TGrampsxmlConfig = {
  [versionGrampsxml: string]: {
    commitDate: string; // Data commita w formacie ISO (np. "2008-01-17T05:34:29Z")
    commitHash: string; // Hash commita powiązanego z tagiem
    urlFileDTD: string; // URL do pliku DTD (lub pusty string, jeśli plik nie istnieje)
    urlFileRNG: string; // URL do pliku RNG (lub pusty string, jeśli plik nie istnieje)
    urlGithubGramps: string; // URL do tagu na GitHubie
    versionGramps: string; // (np. "v1.0.0", "v1.0.0-beta")
    versionGrampsxml: string; // Wersja Gramps XML (np. "v1.7.2"), lub pusty string, jeśli brak informacji
  };
};

export type TGrampsVersionMap = Map<string, TGrampsConfig[string]>;
export type TGrampsxmlVersionMap = Map<string, TGrampsxmlConfig[string]>;

export type TProcessGrampsData = TGrampsxmlConfig[string] & {
  dirOfModel: string;
} & { JAVA: { dtdinst: string; trang: string; jing: string } };

export type TProcessGrampsSuspend = (millisecond: number) => Promise<void>;


// =======================================================================


export type TGrampsxmlFILE = {
  fromGramps: { RNG: string; DTD: string };
  byDtdinst: { XSD: string };
  byTrang: {
    fromRNG: { XSD: string };
    fromDTD: { XSD: string };
  };
  toJSON: {
    fromRNG: string;
    fromXSD: string;
    fromXSDRNG: string;
    fromXSDDTD: string;
  };
};
