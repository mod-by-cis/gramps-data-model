# github-gramps-config-remote.ps1
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
