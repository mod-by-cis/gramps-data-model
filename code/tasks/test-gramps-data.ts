import {GrampsConfig} from "@-/core";

//aaa();

async function main() {
    const config = new GrampsConfig();

  // Ładowanie konfiguracji
  await config.loadConfigs();

  // Pobieranie danych
  const localData = config.getData('v5.0.0');
  console.log('Dane lokalne:', localData);

  const remoteData = config.getData('v5.0.1');
  console.log('Dane zdalne:', remoteData);

}

main();
