# Pominięcie polityki uruchamiania skryptów w PowerShell
# powershell -ExecutionPolicy Bypass -File .\makeTask.ps1

# Funkcje
function Invoke-MakeTask {
    param (
        [string]$Command
    )
    switch ($Command) {
        "clear_db" { Clear-Db }
        "config_db" { Config-Db }
        "update_fixtures" { Update-Fixtures }
        "load_fixtures" { Load-Fixtures }
        "create_admin_user" { Create-AdminUser }
        default { Write-Host "Unknown command: $Command" }
    }
}

function Migrations {
    docker exec -i court_backend bash -c "npx prisma migrate deploy"
}

function MigrationsDev {
    docker exec -i court_backend bash -c "npx prisma migrate dev"
}

function Clear-Db {
    docker exec -i court_backend bash -c "npx prisma migrate reset --force"
}

function Config-Db {
    docker exec -i court_database bash -c "psql -U postgres -c 'CREATE EXTENSION pgcrypto'"
}

function Update-Fixtures {
    docker cp ./backend/fixtures court_database:/
}

function Load-Fixtures {
    docker exec -i court_database bash -c "psql -U postgres -f /fixtures/Structure.sql"
    docker exec -i court_database bash -c "psql -U postgres -f /fixtures/Positions.sql"
}

function Create-AdminUser {
    docker exec -i court_database bash -c "psql -U postgres -f /fixtures/CreateAdmin.sql"
}

# Uruchamianie komend
Invoke-MakeTask "clear_db"
Invoke-MakeTask "config_db"
Invoke-MakeTask "update_fixtures"
Invoke-MakeTask "load_fixtures"
Invoke-MakeTask "create_admin_user"