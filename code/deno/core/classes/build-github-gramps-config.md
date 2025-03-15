Oto przykładowe zastosowanie metody `processGrampsxmlVersion`, ilustrujące różne scenariusze jej wykorzystania:

### Przykład 1: Proste użycie bez dodatkowych argumentów

W tym przykładzie wykonujemy dwie operacje (`operation1` i `operation2`) dla każdej pozycji w mapie `grampsxmlVersion`. Obie callbacki wykorzystują opóźnienie wykonania za pomocą `executionSuspendDelay`.

```typescript
const operation1 = async (
  data: TProcessGrampsData,
  executionSuspendDelay: TProcessGrampsSuspend
) => {
  console.log("Operation 1 - Processing dirOfModel:", data.dirOfModel);
  await executionSuspendDelay(200); // Opóźnienie o 200 ms
};

const operation2 = async (
  data: TProcessGrampsData,
  executionSuspendDelay: TProcessGrampsSuspend
) => {
  console.log("Operation 2 - Processing JAVA.dtdinst:", data.JAVA.dtdinst);
  await executionSuspendDelay(300); // Opóźnienie o 300 ms
};

await grampsConfig.processGrampsxmlVersion(
  [operation1, operation2], // Tablica operacji
  [] // Brak dodatkowych argumentów
);
```

---

### Przykład 2: Użycie z dodatkowymi argumentami

Tutaj każda operacja (`operation1` i `operation2`) otrzymuje dodatkowe argumenty w formie jednego obiektu. Argumenty różnią się w zależności od operacji.

```typescript
const operation1 = async (
  data: TProcessGrampsData,
  executionSuspendDelay: TProcessGrampsSuspend,
  extraArg: { description: string; delay: number }
) => {
  console.log(`Operation 1 - Description: ${extraArg.description}`);
  console.log("Operation 1 - Processing dirOfModel:", data.dirOfModel);
  await executionSuspendDelay(extraArg.delay); // Opóźnienie dynamiczne
};

const operation2 = async (
  data: TProcessGrampsData,
  executionSuspendDelay: TProcessGrampsSuspend,
  extraArg: { isValid: boolean; attempts: number }
) => {
  console.log(`Operation 2 - Valid: ${extraArg.isValid}`);
  console.log(`Operation 2 - Attempt count: ${extraArg.attempts}`);
  console.log("Operation 2 - Processing JAVA.dtdinst:", data.JAVA.dtdinst);
  await executionSuspendDelay(500); // Stałe opóźnienie
};

await grampsConfig.processGrampsxmlVersion(
  [operation1, operation2], // Tablica operacji
  [
    { description: "Processing directory model", delay: 200 }, // Argumenty dla operation1
    { isValid: true, attempts: 3 } // Argumenty dla operation2
  ]
);
```

---

### Przykład 3: Zaawansowany scenariusz z logowaniem i różnymi opóźnieniami

Ten przykład ilustruje bardziej skomplikowany scenariusz, w którym dane są logowane, a opóźnienia wykonania są dynamiczne.

```typescript
const operationLog = async (
  data: TProcessGrampsData,
  executionSuspendDelay: TProcessGrampsSuspend,
  extraArg: { logMessage: string; delay: number }
) => {
  console.log(`${extraArg.logMessage}: ${data.dirOfModel}`);
  await executionSuspendDelay(extraArg.delay); // Dynamiczne opóźnienie
};

const operationValidate = async (
  data: TProcessGrampsData,
  executionSuspendDelay: TProcessGrampsSuspend,
  extraArg: { isValid: boolean; validationDelay: number }
) => {
  console.log(`Validation status: ${extraArg.isValid}`);
  console.log(`Processing model for: ${data.dirOfModel}`);
  await executionSuspendDelay(extraArg.validationDelay); // Opóźnienie walidacji
};

await grampsConfig.processGrampsxmlVersion(
  [operationLog, operationValidate],
  [
    { logMessage: "Logging operation", delay: 100 }, // Argumenty dla operationLog
    { isValid: false, validationDelay: 400 } // Argumenty dla operationValidate
  ]
);
```

---

### Wyjaśnienia

1. **Dopasowanie argumentów:**
   - Każdy callback w tablicy `operations` otrzymuje odpowiadający mu obiekt z `extraArgs` według indeksu.
   - Argumenty są przekazywane jako pojedynczy obiekt, co jest czytelne i elastyczne.

2. **Dynamiczne opóźnienia:**
   - Możliwość określenia indywidualnego opóźnienia dla każdej operacji za pomocą `executionSuspendDelay`.

3. **Elastyczność:**
   - Callbacki można łatwo dostosować do różnych scenariuszy bez modyfikacji głównej metody `processGrampsxmlVersion`.
