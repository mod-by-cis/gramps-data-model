import { join as pathJoin, toFileUrl } from "@std/path";
import { parse as parseXML } from "@libs/xml";
import {
  GrampsConfig,
  type TProcessGrampsData,
  type TProcessGrampsSuspend,
} from "@-/core";

async function main() {
  const config = new GrampsConfig();

  // Ładowanie konfiguracji
  await config.loadConfigs();

  const downloadFromGithubGramps = async (
    data: TProcessGrampsData,
    executionSuspendDelay: TProcessGrampsSuspend,
  ) => {
    console.log("downloadFromGithubGramps - Processing of data:", data);

    try {
      const responseDTD = await fetch(data.urlFileDTD);
      if (!responseDTD.ok) {
        console.error(`Nie udało się pobrać pliku z URL: ${data.urlFileDTD}`);
        return;
      }
      const textDTD = await responseDTD.text(); // Pobranie danych jako tekst
      const fileDTD = toFileUrl(pathJoin(data.dirOfModel, "grampsxml.dtd"));
      await Deno.writeTextFile(fileDTD, textDTD); // Zapis pliku
      console.log(
        `Pobrano i zapisano plik: ${fileDTD} z adresu: ${data.urlFileDTD}`,
      );
      await executionSuspendDelay(1000); // Opóźnienie 1000 ms
    } catch (error) {
      console.error(
        `Błąd podczas przetwarzania pliku z URL: ${data.urlFileDTD} - ${
          (error as Error).message
        }`,
      );
    }

    try {
      const responseRNG = await fetch(data.urlFileRNG);
      if (!responseRNG.ok) {
        console.error(`Nie udało się pobrać pliku z URL: ${data.urlFileRNG}`);
        return;
      }
      const textRNG = await responseRNG.text(); // Pobranie danych jako tekst
      const fileRNG = toFileUrl(pathJoin(data.dirOfModel, "grampsxml.rng"));
      await Deno.writeTextFile(fileRNG, textRNG); // Zapis pliku
      console.log(
        `Pobrano i zapisano plik: ${fileRNG} z adresu: ${data.urlFileRNG}`,
      );
      await executionSuspendDelay(1000); // Opóźnienie 1000 ms
    } catch (error) {
      console.error(
        `Błąd podczas przetwarzania pliku z URL: ${data.urlFileRNG} - ${
          (error as Error).message
        }`,
      );
    }
  };

  const convertByDtdinstJAVA = async (
    data: TProcessGrampsData,
    executionSuspendDelay: TProcessGrampsSuspend,
  ) => {
    console.log("convertByDtdinstJAVA - Processing of data:", data);

    try {
      const fileDTD = pathJoin(data.dirOfModel, "grampsxml.dtd");
      const fileXSD = toFileUrl(pathJoin(data.dirOfModel, "grampsxml.xsd"));
      const command = new Deno.Command("java", {
        args: [
          "-jar",
          data.JAVA.dtdinst,
          fileDTD,
        ],
        stdin: "null",
        stdout: "piped", // Przekierowanie wyjścia do pamięci
        stderr: "piped", // Przekierowanie błędów
      });
      const output = await command.output();
      if (output.code === 0) {
        // Zapis wynikowego wyjścia do pliku
        await Deno.writeFile(fileXSD, output.stdout);
        console.log(
          `Pomyślnie przetworzono ${toFileUrl(fileDTD)} do ${fileXSD}`,
        );
      } else {
        console.error(
          `Błąd podczas przetwarzania ${toFileUrl(fileDTD)}:`,
          new TextDecoder().decode(output.stderr), // Dekodowanie błędów
        );
      }
      await executionSuspendDelay(200); // Opóźnienie 200 ms
    } catch (error) {
      console.error(
        `Błąd podczas przetwarzania wykonywania JAVA dtdinst.jar  - dla pliku DTD z modelu ${data.versionGrampsxml} - ${
          (error as Error).message
        }`,
      );
    }
  };

  const convertByTrangJAVA_toXSD_fromRNG = async (
    data: TProcessGrampsData,
    executionSuspendDelay: TProcessGrampsSuspend,
  ) => {
    console.log("convertByTrangJAVA_toXSD_fromRNG - Processing of data:", data);

    try {
      const fromFileRNG = pathJoin(data.dirOfModel, "grampsxml.rng");
      const saveFileXSD = pathJoin(data.dirOfModel, "grampsxml.rng.xsd");
      const command = new Deno.Command("java", {
        args: [
          "-jar",
          data.JAVA.trang,
          "-I",
          "rng",
          "-O",
          "xsd",
          fromFileRNG,
          saveFileXSD,
        ],
        stdin: "null",
        stdout: "piped", // Przekierowanie wyjścia do pamięci
        stderr: "piped", // Przekierowanie błędów
      });
      const output = await command.output();
      if (output.code === 0) {
        console.log(
          `Utworzono ${toFileUrl(saveFileXSD)} z pliku ${
            toFileUrl(fromFileRNG)
          }`,
        );
      } else {
        console.error(
          `Błąd podczas przetwarzania  ${toFileUrl(fromFileRNG)}:`,
          new TextDecoder().decode(output.stderr), // Dekodowanie błędów
        );
      }
      await executionSuspendDelay(200); // Opóźnienie 200 ms
    } catch (error) {
      console.error(
        `Błąd podczas przetwarzania wykonywania JAVA trang.jar  - dla pliku RNG->XSD z modelu ${data.versionGrampsxml} - ${
          (error as Error).message
        }`,
      );
    }
  };

  //await config.processGrampsxmlVersion( [downloadFromGithubGramps, convertByDtdinstJAVA, convertByTrangJAVA_toXSD_fromRNG], [], );

  const convertByTrangJAVA_toXSD_fromDTD = async (
    data: TProcessGrampsData,
    executionSuspendDelay: TProcessGrampsSuspend,
  ) => {
    console.log("convertByTrangJAVA_toXSD_fromDTD - Processing of data:", data);

    try {
      const fromFileDTD = pathJoin(data.dirOfModel, "grampsxml.dtd");
      const saveFileXSD = pathJoin(data.dirOfModel, "grampsxml.dtd.xsd");
      const command = new Deno.Command("java", {
        args: [
          "-jar",
          data.JAVA.trang,
          "-I",
          "dtd",
          "-O",
          "xsd",
          fromFileDTD,
          saveFileXSD,
        ],
        stdin: "null",
        stdout: "piped", // Przekierowanie wyjścia do pamięci
        stderr: "piped", // Przekierowanie błędów
      });
      const output = await command.output();
      if (output.code === 0) {
        console.log(
          `Utworzono ${toFileUrl(saveFileXSD)} z pliku ${
            toFileUrl(fromFileDTD)
          }`,
        );
      } else {
        console.error(
          `Błąd podczas przetwarzania  ${toFileUrl(fromFileDTD)}:`,
          new TextDecoder().decode(output.stderr), // Dekodowanie błędów
        );
      }
      await executionSuspendDelay(200); // Opóźnienie 200 ms
    } catch (error) {
      console.error(
        `Błąd podczas przetwarzania wykonywania JAVA trang.jar  - dla pliku DTD->XSD z modelu ${data.versionGrampsxml} - ${
          (error as Error).message
        }`,
      );
    }
  };

  //await config.processGrampsxmlVersion( [convertByTrangJAVA_toXSD_fromDTD], [], );

  const convert_toJSON_fromXML = async (
    data: TProcessGrampsData,
    executionSuspendDelay: TProcessGrampsSuspend,
  ) => {
    console.log("convert_toJSON_fromXML - Processing of data:", data);

    const batchTasks: Array<{ fromFILE: URL; saveFILE: URL }> = [
      {
        fromFILE: toFileUrl(pathJoin(data.dirOfModel, "grampsxml.rng")),
        saveFILE: toFileUrl(pathJoin(data.dirOfModel, "grampsxml.rng.json")),
      },
      {
        fromFILE: toFileUrl(pathJoin(data.dirOfModel, "grampsxml.xsd")),
        saveFILE: toFileUrl(pathJoin(data.dirOfModel, "grampsxml.xsd.json")),
      },
      {
        fromFILE: toFileUrl(pathJoin(data.dirOfModel, "grampsxml.rng.xsd")),
        saveFILE: toFileUrl(
          pathJoin(data.dirOfModel, "grampsxml.rng.xsd.json"),
        ),
      },
      {
        fromFILE: toFileUrl(pathJoin(data.dirOfModel, "grampsxml.dtd.xsd")),
        saveFILE: toFileUrl(
          pathJoin(data.dirOfModel, "grampsxml.dtd.xsd.json"),
        ),
      },
    ];

    for (const batchTask of batchTasks) {
      try {
        // Odczytaj zawartość XML z pliku wejściowego
        const contentXML = await Deno.readTextFile(batchTask.fromFILE);

        // Sparsuj XML do JSON
        const parsedJSON = parseXML(contentXML);

        // Zapisz wynikowy JSON do pliku
        await Deno.writeTextFile(
          batchTask.saveFILE,
          JSON.stringify(parsedJSON, null, 2),
        );
        console.log(
          `Skonwertowano ${batchTask.fromFILE} na ${batchTask.saveFILE}`,
        );

        // Opóźnienie pomiędzy zadaniami - 200 ms
        await executionSuspendDelay(200);
      } catch (error) {
        console.error(
          `Błąd podczas konwersji ${batchTask.fromFILE} na JSON:`,
          error,
        );
      }
    }
  };

  //await config.processGrampsxmlVersion( [convert_toJSON_fromXML], [], );
}

main();
