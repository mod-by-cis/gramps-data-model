import {GrampsConfig} from "@-/core";

//aaa();

async function main() {
    const config = new GrampsConfig();

  // Ładowanie konfiguracji
  await config.loadConfigs();

  // Pobieranie danych
  const Data = config.getData('v6.0.0-rc1');
  console.log(config.versionGrampsxml);


}

main();
