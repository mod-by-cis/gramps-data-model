# **GENEROWANIE KONFIGURACJI GRAMPS Z GITHUB**

## **Krok 1: Otwórz terminal**

Na systemie Windows:

1. Naciśnij `Win + S`, wpisz **PowerShell** i otwórz **Windows PowerShell**.
2. Możesz także skorzystać z terminala w Visual Studio Code lub Windows
   Terminal.

💡 **Porada**: Jeśli korzystasz z systemu Linux lub macOS, otwórz terminal z
menu aplikacji.

---

## **Krok 2: Sklonuj Grapmps**

Za pomocą komendy `git clone`:

```powershell
mkdir gramps-project
cd gramps-project
git config --global http.postBuffer 524288000
git clone https://github.com/gramps-project/gramps.git
cd gramps
```

💡 **Porada**: Komenda `mkdir` tworzy folder, a `cd` zmienia katalog pracy na
ten folder.

---

## **Krok 3: Zezwolenie na uruchamianie skryptów PowerShell**

Jeśli jeszcze nie skonfigurowałeś uprawnień do uruchamiania skryptów:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

⚠️ **Uwaga**:

- **`RemoteSigned`**: Pozwala na uruchamianie lokalnych skryptów bez podpisu.
- Może być wymagana zgoda administratora.
- Po zakończeniu pracy możesz przywrócić ustawienia domyślne za pomocą komendy:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy Restricted -Scope CurrentUser
  ```

---

## **Krok 4: Tworzenie skryptów PowerShell**

### **Krok 4A: Skrypt pierwszy – `./github-gramps-config-local.ps1`**

```powershell
# ./github-gramps-config-local.ps1
# Tworzymy pusty obiekt do przechowywania danych JSON
$jsonData = @{}

# Wyrażenie regularne dla prawidłowych tagów
$validTagPattern = '^v\d+\.\d+\.\d+(-rc\d*|-beta\d*|-alpha\d*|-dev\d*)?$'

# Pobieramy wszystkie tagi i przetwarzamy je
git show-ref --tags | ForEach-Object {
    # Pobieramy hash referencji
    $ref = $_.Split()[0]

    # Pobieramy szczegóły ostatniego commit-a w formacie JSON
    $log = git log -1 --format="{`"commitHash`":`"%H`",`"versionGramps`":`"%D`",`"commitDate`":`"%aI`"}" $ref | ConvertFrom-Json

    # Wyciągamy tag za pomocą wyrażenia regularnego
    $tagName = ""
    if ($log.versionGramps -match "tag: ([^,]+)") {
        $potentialTag = $matches[1].Trim()
        # Sprawdzamy, czy tag pasuje do wzorca
        if ($potentialTag -match $validTagPattern) {
            $tagName = $potentialTag
        } else {
            Write-Host "Nieprawidłowy tag pominięty: $potentialTag" -ForegroundColor Yellow
            continue
        }
    } else {
        Write-Host "Nie udało się znaleźć poprawnego tagu dla ref: $ref" -ForegroundColor Yellow
        continue
    }

    # Tworzenie dynamicznego URL do GitHub
    $urlGithubGramps = "https://github.com/gramps-project/gramps/blob/$tagName"

    # Tworzymy obiekt w strukturze JSON
    $jsonData[$tagName] = @{
        commitHash = $log.commitHash
        versionGramps = $tagName
        commitDate = $log.commitDate
        urlGithubGramps = $urlGithubGramps
    }
}

# Zapisujemy dane JSON do pliku (nadpisując istniejący plik, jeśli istnieje)
$jsonData | ConvertTo-Json -Depth 10 | Set-Content -Path "./github-gramps-config-local.json" -Force

Write-Host "Dane lokalne zostały zapisane w pliku ./github-gramps-config-local.json"
```

💡 **Porada**: Upewnij się, że masz zainstalowany `git`. Jeśli nie, możesz go
zainstalować, korzystając z menedżera pakietów (np. `apt-get install git` na
Linuxie) lub na windows za pomocą menedżera pakietów Chocolatey (choco)
`choco install git` lub `choco install git -y`. Flaga **-y** automatycznie
akceptuje wszystkie monity.

---

### **Krok 4B: utwórz skrypt drugi `./github-gramps-config-remote.ps1`**

```powershell
# ./github-gramps-config-remote.ps1
# Wczytanie lokalnych danych JSON
$jsonDataLocal = Get-Content -Path "./github-gramps-config-local.json" | ConvertFrom-Json
$jsonDataRemote = @{}

# Przetwarzanie każdej pozycji z danych lokalnych
foreach ($versionGramps in $jsonDataLocal.PSObject.Properties.Name) {
    $localData = $jsonDataLocal.$versionGramps

    # Tworzenie dynamicznych URL do plików DTD i RNG
    $urlFileDTD = "https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/$versionGramps/data/grampsxml.dtd"
    $urlFileRNG = "https://raw.githubusercontent.com/gramps-project/gramps/refs/tags/$versionGramps/data/grampsxml.rng"

    # Sprawdzanie, czy URL istnieje
    $pathToFileDTD = ""
    try {
        if ((Invoke-WebRequest -Uri $urlFileDTD -Method Head -ErrorAction Stop).StatusCode -eq 200) {
            $pathToFileDTD = $urlFileDTD
        }
    } catch {
        Write-Host "URL DTD nie istnieje: $urlFileDTD"
    }

    Start-Sleep -Milliseconds 500

    $pathToFileRNG = ""
    try {
        if ((Invoke-WebRequest -Uri $urlFileRNG -Method Head -ErrorAction Stop).StatusCode -eq 200) {
            $pathToFileRNG = $urlFileRNG
        }
    } catch {
        Write-Host "URL RNG nie istnieje: $urlFileRNG"
    }

    # Pobieranie wersji grampsxml z pliku RNG, jeśli istnieje
    $versionGrampsxml = ""
    if ($pathToFileRNG -ne "") {
        try {
            # Pobieramy plik XML
            $rngContent = (Invoke-WebRequest -Uri $pathToFileRNG).Content
            $xml = [xml]$rngContent
            # Odszukujemy atrybut "ns" w elemencie "grammar"
            $namespace = $xml.grammar.ns
            if ($namespace -match "http://gramps-project.org/xml/([0-9.]+)/") {
                $versionGrampsxml = "v$($matches[1])"
            }
        } catch {
            Write-Host "Błąd podczas przetwarzania pliku RNG dla taga $versionGramps"
        }
    }

    # Tworzymy obiekt w strukturze JSON dla zdalnych danych
    $jsonDataRemote[$versionGramps] = @{
        urlFileDTD = $pathToFileDTD
        urlFileRNG = $pathToFileRNG
        versionGrampsxml = $versionGrampsxml
    }

    Start-Sleep -Seconds 1
}

# Zapisujemy dane JSON do pliku (nadpisując istniejący plik, jeśli istnieje)
$jsonDataRemote | ConvertTo-Json -Depth 10 | Set-Content -Path "./github-gramps-config-remote.json" -Force

Write-Host "Dane zdalne zostały zapisane w pliku ./github-gramps-config-remote.json"
```

💡 **Porada**: Zachowaj odstępy i formatowanie kodu dla lepszej czytelności.

---

### **Krok 4C: tworzenie obu skryptów w terminalu**

#### **Rozwiązanie dla Windows (PowerShell)**

Użyj poniższej metody, aby wkleić kod i utworzyć pliki skryptów:

```powershell
@"
# Wklej swój kod tutaj...
"@ | Set-Content -Path "./github-gramps-config-*******.ps1" -Force
```

⚠️ **Uwaga**: Zamień `*******` na `local` lub `remote`.

> 💡 **Wyjaśnienie**:
>
> 1. **`@"... "@`**:
>    - Tworzy **multiliniowy ciąg tekstowy**, dzięki czemu można wkleić kod z
>      wieloma liniami bez potrzeby uciekania znaków specjalnych (np. `"`, `$`,
>      itp.).
>    - Każda linia tekstu między `@"` i `"@` zostaje zapisana dokładnie w
>      podanej formie.
> 2. **`Set-Content -Path "./github-gramps-config-*******.ps1" -Force`**:
>    - **`*******`** należy zastąpić na `local` lub `remote`
>    - Zapisuje ciąg tekstowy jako nowy plik w określonej lokalizacji.
>    - Opcja `-Force` **nadpisuje istniejący plik**, jeśli już istnieje, bez
>      konieczności wcześniejszego usuwania pliku ręcznie.

---

#### **Rozwiązanie dla Linux/macOS:**

W systemach Linux i macOS możesz użyć `cat`, aby utworzyć i zapisać plik:

```bash
cat > github-gramps-config-*******.ps1 << 'EOF'
# Wklej swój kod tutaj...

echo "Dane lokalne zostały zapisane w pliku ./github-gramps-config-*******.json"
EOF
```

⚠️ **Uwaga**: Zamień `*******` na `local` lub `remote`.

> 💡 **Wyjaśnienie**:
>
> 1. **`cat > github-gramps-config-*******.ps1 << 'EOF'`**:
>    - Rozpoczyna wprowadzanie wieloliniowego ciągu tekstu, który zostanie
>      zapisany jako plik `github-gramps-config-*******.ps1`.
>    - Wszystko pomiędzy `<< 'EOF'` i końcowym `EOF` jest zapisane w pliku.
>    - `'EOF'` (z apostrofami) gwarantuje, że znaki specjalne w tekście (np.
>      `$`, `"`) **nie są przetwarzane**.
> 2. **`> github-gramps-config-*******.ps1`**:
>    - Oznacza zapisanie treści do pliku. Plik zostanie utworzony lub nadpisany,
>      jeśli już istnieje.
> 3. **`echo` i `EOF`**:
>    - Po zapisaniu pliku, komenda `echo` zostaje wyświetlona, aby potwierdzić
>      zapisanie pliku.

---

## **Krok 5: Jak uruchomić skrypty PowerShell**

⚠️ **Ważne:** Pamiętaj o prefiksie `.\`, który oznacza lokalny plik w bieżącym
katalogu.

Najpierw uruchom skrypt `local`:

```powershell
.\github-gramps-config-local.ps1
```

Następnie uruchom skrypt `remote`:

```powershell
.\github-gramps-config-remote.ps1
```

## **Najczęściej zadawane pytania (FAQ)**

1. **Co zrobić, jeśli `git` nie jest zainstalowany?**
   - Dla Windows: Pobierz instalator z oficjalnej strony Git
     (https://git-scm.com).
   - Dla Windows: Użyj menedżera pakietów Chocolatey (choco),
     `choco install git` lub `choco install git -y`. Flaga **-y** automatycznie
     akceptuje wszystkie monity.
   - Dla Linux: Użyj menedżera pakietów, np. `sudo apt-get install git`.

2. **Czy mogę używać tych skryptów na Linux/macOS?**
   - Tak, skrypty mogą działać, ale mogą wymagać drobnych modyfikacji (np.
     polecenia `Set-ExecutionPolicy` nie są wymagane w tych systemach).

3. **"Execution of scripts is disabled on this system" – co teraz?**
   - Użyj komendy `Set-ExecutionPolicy` z Kroku 3, aby zezwolić na uruchamianie
     skryptów.

---
