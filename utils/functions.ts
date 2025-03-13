import  { existsSync } from "@std/fs";
import { join as pathJoin } from "@std/path";
import { blue, green, yellow, bgRgb8 } from "@std/fmt/colors";

export interface Paths {
    dir: string;
    xsd: {
        dtd: string;
        rng: string;
    }
}

export class MODEL_VERSION {
    static VALID: string[] = [
        "v1.7.2", "v1.7.1", "v1.6.0", "v1.5.1", "v1.5.0", "v1.4.0", "v1.3.0", "v1.2.0", "v1.1.4"
    ];
    static validate(version: string): void {
        if (!MODEL_VERSION.VALID.includes(version)) {
            console.error("Podana wersja jest nieznana!");
            console.error("Podaj akceptowalną wersję:", MODEL_VERSION.VALID.join(", "));
            console.error("Użycie: deno task analysis-XSD-structures <wersja>");
            Deno.exit(1);
        }
    }
    
    static get processValidate(): Paths {
        // Pobieranie wersji z argumentów
        if (Deno.args.length !== 1) {
            console.error("Użycie: deno task analysis-XSD-structures <wersja>");
            Deno.exit(1);
        }
        
        const version = Deno.args[0];
        MODEL_VERSION.validate(version);
        
        console.log(`Wybrana wersja modelu grampsxml: ${version}`);
        const dir = pathJoin(Deno.cwd(), `model/grampsxml@${version}/`);
        if (!existsSync(dir)) {
            console.error("Podana wersja nie istnieje w systemie plików!");
            Deno.exit(1);
        }
        const out = {
            dir,
            xsd: {
                dtd: pathJoin(dir, "grampsxml.dtd.xsd.json"),
                rng: pathJoin(dir, "grampsxml.rng.xsd.json")
            }
        };
        return out;
    }
}

// Funkcja wykonująca synchronizowane polecenie PowerShell "Get-ChildItem"
export function PS_getChildItems(path: string): void {
    // Tworzenie komendy PowerShell
    const command = new Deno.Command("powershell", {
        args: ["-Command", `Get-ChildItem -Path "${path}"`], // Komenda PowerShell
        stdout: "piped", // Włączenie przekazania danych na wyjście standardowe
        stderr: "piped", // Włączenie przekazania danych na wyjście błędów
    });

    try {
        // Uruchomienie komendy i uzyskanie jej wyniku
        const output = command.outputSync();
        
        // Dekodowanie wyniku z bufora do tekstu
        const stdoutText = new TextDecoder().decode(output.stdout);
        const stderrText = new TextDecoder().decode(output.stderr);

        // Sprawdzanie błędów
        if (stderrText) {
            console.error("Błąd:", stderrText);
        } else {
            console.log(stdoutText.replace("Directory","Zawartość katalogu").trimStart());
        }
    } catch (error) {
        console.error("Wystąpił błąd podczas wykonywania komendy:", error);
    }
}

export class AnalyzingXSD<TDTD,TRNG> {    
    #DTD: TDTD;
    #RNG: TRNG;

    constructor(xsd: {dtd: TDTD; rng: TRNG;}) {
        this.#DTD = xsd.dtd;
        this.#RNG = xsd.rng;
    }

    get DTD(): TDTD {
        return this.#DTD;
    }

    get RNG(): TRNG {
        return this.#RNG;
    }
}

export enum KeyMode {
    WithChildCount = "with-child-count",
    WithoutChildCount = "without-child-count",
}

export function getKEYS<T extends KeyMode, N extends string | undefined>(
    mode: T,
    obj: Record<string, unknown>,
    objName?: N
): T extends KeyMode.WithChildCount
    ? (N extends string ? [string, { ATTR: Map<string, { isObj: number; isArr: number }>; NODE: Map<string, { isObj: number; isArr: number }>; TEXT: Map<string, { isObj: number; isArr: number }> }] : { ATTR: Map<string, { isObj: number; isArr: number }>; NODE: Map<string, { isObj: number; isArr: number }>; TEXT: Map<string, { isObj: number; isArr: number }> })
    : (N extends string ? [string, { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string> }] : { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string> }) {

    // Inicjalizacja obiektów Set
    const objKeysAsAttrSET = new Set<string>();
    const objKeysAsTextSET = new Set<string>();
    const objKeysAsNodeSET = new Set<string>();

    // Podział kluczy na grupy
    for (const key of Object.keys(obj).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
        if (key.startsWith("@")) {
            objKeysAsAttrSET.add(key);
        } else if (key.startsWith("#")) {
            objKeysAsTextSET.add(key);
        } else {
            objKeysAsNodeSET.add(key);
        }
    }

    if (mode === KeyMode.WithoutChildCount) {
        // Zwracanie wyników w trybie WithoutChildCount
        const result = objName
            ? [objName, { ATTR: objKeysAsAttrSET, NODE: objKeysAsNodeSET, TEXT: objKeysAsTextSET }]
            : { ATTR: objKeysAsAttrSET, NODE: objKeysAsNodeSET, TEXT: objKeysAsTextSET };

        return result as T extends KeyMode.WithChildCount
            ? never
            : (N extends string ? [string, { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string> }] : { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string> });
    }

    // Inicjalizacja obiektów Map
    const objKeysAsAttrMAP = new Map<string, { isObj: number; isArr: number }>();
    const objKeysAsTextMAP = new Map<string, { isObj: number; isArr: number }>();
    const objKeysAsNodeMAP = new Map<string, { isObj: number; isArr: number }>();

    for (const key of Object.keys(obj)) {
        const child = obj[key as keyof typeof obj];

        const isArr = Array.isArray(child) ? child.length : 0;

        const isObj =
            child && typeof child === "object" && !Array.isArray(child)
                ? Object.keys(child).filter(
                    (k) => !k.startsWith("@") && !k.startsWith("#")
                ).length
                : 0;

        if (key.startsWith("@")) {
            objKeysAsAttrMAP.set(key, { isObj, isArr });
        } else if (key.startsWith("#")) {
            objKeysAsTextMAP.set(key, { isObj, isArr });
        } else {
            objKeysAsNodeMAP.set(key, { isObj, isArr });
        }
    }

    // Zwracanie wyników w trybie WithChildCount
    const result = objName
        ? [objName, { ATTR: objKeysAsAttrMAP, NODE: objKeysAsNodeMAP, TEXT: objKeysAsTextMAP }]
        : { ATTR: objKeysAsAttrMAP, NODE: objKeysAsNodeMAP, TEXT: objKeysAsTextMAP };

    return result as T extends KeyMode.WithChildCount
        ? (N extends string ? [string, { ATTR: Map<string, { isObj: number; isArr: number }>; NODE: Map<string, { isObj: number; isArr: number }>; TEXT: Map<string, { isObj: number; isArr: number }> }] : { ATTR: Map<string, { isObj: number; isArr: number }>; NODE: Map<string, { isObj: number; isArr: number }>; TEXT: Map<string, { isObj: number; isArr: number }> })
        : never;
}

export function compareKEYS<T extends KeyMode>(
    mode: T,
    xsd: {
        xsdDTD: [string, { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; }] | { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; };
        xsdRNG: [string, { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; }] | { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; };
    }
): void {
    // Szerokość kolumn
    const colWidths = [25, 7, 4, 4, 4, 4, 7, 7];

    // Funkcja do wyrównywania tekstu
    const padText = (text: string, width: number): string => text.padEnd(width);
    const row2 = [
        padText("Key", colWidths[0]),
        padText("Status", colWidths[1]),
        ...((M)=>{
            if(M){
                return [];
            } else {
                return [
                    padText("obj", colWidths[2]),
                    padText("arr", colWidths[3]),
                    padText("obj", colWidths[4]),
                    padText("arr", colWidths[5])
                ]
            }

        })(mode=== KeyMode.WithoutChildCount),
        padText("xsdDTD", colWidths[6]),
        padText("xsdRNG", colWidths[7])
    ];
    
    const row1 = [
        padText(" ", colWidths[0]),
        padText(" ", colWidths[1]),
        ...((M)=>{
            if(M){
                return [];
            } else {
                return [
                    padText(bgRgb8("count inDTD",99), colWidths[2]+colWidths[3]+3),
                    padText(bgRgb8("count inRNG",205), colWidths[4]+colWidths[5]+3)
                ]
            }

        })(mode=== KeyMode.WithoutChildCount),        
        padText("type of element", colWidths[6]+colWidths[7]+3)
    ];
    const rowX = [
        "-".repeat(colWidths[0]),
        "-".repeat(colWidths[1]),
        ...((M)=>{
            if(M){
                return [];
            } else {
                return [
                    "-".repeat(colWidths[2]),
                    "-".repeat(colWidths[3]),
                    "-".repeat(colWidths[4]),
                    "-".repeat(colWidths[5])
                ]
            }

        })(mode=== KeyMode.WithoutChildCount),
        "-".repeat(colWidths[6]),
        "-".repeat(colWidths[7])
    ];
    const row0 = [
        "≣".repeat(colWidths[0]+4),
        "Comparison of xsdDTD and xsdRNG",
        "≣".repeat(colWidths[0])
    ];
    console.log(" ");
    console.log(`mode = ${mode}`);
    console.log(row0.join(' '));
    console.log('| '+row1.join(' | ')+' |');
    console.log('| '+row2.join(' | ')+' |');
    console.log('| '+rowX.join(' | ')+' |');
    

    // Pobranie danych (obsługa obu struktur zwracanych przez `getKEYS`)
    const dtdData = Array.isArray(xsd.xsdDTD) ? xsd.xsdDTD[1] : xsd.xsdDTD;
    const rngData = Array.isArray(xsd.xsdRNG) ? xsd.xsdRNG[1] : xsd.xsdRNG;

    // Zebranie wszystkich kluczy ze wszystkich grup: ATTR, NODE, TEXT
    const allKeys = new Set<string>([
        ...dtdData.ATTR,
        ...dtdData.NODE,
        ...dtdData.TEXT,
        ...rngData.ATTR,
        ...rngData.NODE,
        ...rngData.TEXT,
    ]);

    // Iteracja po wszystkich kluczach alfabetycznie
    for (const key of Array.from(allKeys).sort()) {
        const dtdGroup = findGroup(dtdData, key); // Znajdź grupę w xsdDTD
        const rngGroup = findGroup(rngData, key); // Znajdź grupę w xsdRNG

        // Określenie statusu
        const status =
            dtdGroup !== "-" && rngGroup !== "-" ? "bothXSD" :
            dtdGroup !== "-" ? "onlyDTD" :
            rngGroup !== "-" ? "onlyRNG" : "-";

        // Wyciąganie liczb countObj i countArr dla obu
        const dtdCounts = getCounts(dtdData, key);
        const rngCounts = getCounts(rngData, key);

        const rowR = [
            padText(`[${green(`"${key}"`)}]`, colWidths[0]+10),
            padText(((status)=>{
                switch (status) {
                    case "onlyDTD": return bgRgb8(status+'',99);
                    case "onlyRNG": return bgRgb8(status+'',205);
                    default:return status;
                }
            })(status), colWidths[1]),
            ...((M)=>{
                if(M){
                    return [];
                } else {
                    return [
                        padText(yellow(dtdCounts.countObj.toString()), colWidths[2]+10),
                        padText(yellow(dtdCounts.countArr.toString()), colWidths[3]+10),
                        padText(yellow(rngCounts.countObj.toString()), colWidths[4]+10),
                        padText(yellow(rngCounts.countArr.toString()), colWidths[5]+10)
                    ]
                }

            })(mode=== KeyMode.WithoutChildCount),            
            padText(dtdGroup, colWidths[6]),
            padText(rngGroup, colWidths[7])
        ];
        console.log('| '+rowR.join(' | ')+' |');

    }

    
    console.log('| '+rowX.join(' | ')+' |');
}

// Funkcja pomocnicza do znalezienia grupy klucza w ATTR, NODE, TEXT
function findGroup(data: { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string> }, key: string): string {
    if (data.ATTR.has(key)) return "ATTR";
    if (data.NODE.has(key)) return "NODE";
    if (data.TEXT.has(key)) return "TEXT";
    return "-";
}

// Funkcja pomocnicza do wyciągania countObj i countArr
function getCounts(data: { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string> }, key: string): { countObj: number; countArr: number } {
    let countObj = 0;
    let countArr = 0;

    if (data.NODE.has(key)) {
        // Przykładowa logika obliczeń – dostosuj w zależności od danych
        countObj = 1; // Zakładamy, że istnieje obiekt
        countArr = 0; // Tu zakładamy brak tablicy
    }

    return { countObj, countArr };
}

export function compareKEYS2(
    xsd: {
        xsdDTD: [string, { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; }] | { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; };
        xsdRNG: [string, { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; }] | { ATTR: Set<string>; NODE: Set<string>; TEXT: Set<string>; };
    }
): void {
    // Szerokość kolumn
    const colWidths = [25, 7, 4, 7, 7]; // Dostosowanie do nowych kolumn

    // Funkcja do wyrównywania tekstu
    const padText = (text: string, width: number): string => text.padEnd(width);
    const row2 = [
        padText("Key", colWidths[0]),
        padText("Status", colWidths[1]),
        padText("xsdDTD", colWidths[2]),
        padText("xsdRNG", colWidths[3]),
    ];

    const row1 = [
        padText(" ", colWidths[0]),
        padText(" ", colWidths[1]),
        padText("type of element", colWidths[2] + colWidths[3] + 3),
    ];

    const rowX = [
        "-".repeat(colWidths[0]),
        "-".repeat(colWidths[1]),
        "-".repeat(colWidths[2]),
        "-".repeat(colWidths[3]),
    ];

    const row0 = [
        "≣".repeat(colWidths[0] + 4),
        "Comparison of xsdDTD and xsdRNG",
        "≣".repeat(colWidths[0]),
    ];
    console.log(row0.join(" "));
    console.log("| " + row1.join(" | ") + " |");
    console.log("| " + row2.join(" | ") + " |");
    console.log("| " + rowX.join(" | ") + " |");

    // Pobranie danych (obsługa obu struktur zwracanych przez `getKEYS`)
    const dtdData = Array.isArray(xsd.xsdDTD) ? xsd.xsdDTD[1] : xsd.xsdDTD;
    const rngData = Array.isArray(xsd.xsdRNG) ? xsd.xsdRNG[1] : xsd.xsdRNG;

    // Zebranie wszystkich kluczy ze wszystkich grup: ATTR, NODE, TEXT
    const allKeys = new Set<string>([
        ...dtdData.ATTR,
        ...dtdData.NODE,
        ...dtdData.TEXT,
        ...rngData.ATTR,
        ...rngData.NODE,
        ...rngData.TEXT,
    ]);

    // Iteracja po wszystkich kluczach alfabetycznie
    for (const key of Array.from(allKeys).sort()) {
        const dtdGroup = findGroup(dtdData, key); // Znajdź grupę w xsdDTD
        const rngGroup = findGroup(rngData, key); // Znajdź grupę w xsdRNG

        // Określenie statusu
        const status =
            dtdGroup !== "-" && rngGroup !== "-"
                ? "bothXSD"
                : dtdGroup !== "-"
                ? "onlyDTD"
                : rngGroup !== "-"
                ? "onlyRNG"
                : "-";

        // Wyciąganie typów elementów
        const dtdType = dtdGroup !== "-" ? dtdGroup : "-";
        const rngType = rngGroup !== "-" ? rngGroup : "-";

        // Wyświetlanie wiersza z danymi
        const rowR = [
            padText(`[${green(`"${key}"`)}]`, colWidths[0] + 10),
            padText(
                ((status) => {
                    switch (status) {
                        case "onlyDTD":
                            return bgRgb8(status + "", 99);
                        case "onlyRNG":
                            return bgRgb8(status + "", 205);
                        default:
                            return status;
                    }
                })(status),
                colWidths[1]
            ),
            padText(dtdType, colWidths[2]),
            padText(rngType, colWidths[3]),
        ];
        console.log("| " + rowR.join(" | ") + " |");
    }

    console.log("| " + rowX.join(" | ") + " |");
}
