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
