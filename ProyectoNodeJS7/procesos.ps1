$message2 = Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
$parametros = $message2 | ForEach-Object {
    @{
        nombre = $_.Name
        CPU = $_.CPU
    }
}
$jsonParametros = $parametros | ConvertTo-Json
Invoke-RestMethod -Uri "http://127.0.0.1:3000/receptor" -Method Post -Body $jsonParametros -ContentType "application/json"

