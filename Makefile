migrations:
	docker exec -i court_backend bash -c "npx prisma migrate deploy"
migrations-dev:
	docker exec -i court_backend bash -c "npx prisma migrate dev"
clear_db:
	docker exec -i court_backend bash -c "npx prisma migrate reset --force"
config_db:
	docker exec -i court_database bash -c "psql -U postgres -c 'CREATE EXTENSION pgcrypto'"
update_fixtures:
	docker cp ./backend/fixtures court_database:/
load_fixtures:
	docker exec -i creaction_postgres bash -c 'psql -U postgres -f /fixtures/Structure.sql'
	docker exec -i creaction_postgres bash -c 'psql -U postgres -f /fixtures/Positions.sql'
create_admin_user:
	docker exec -i creaction_postgres bash -c 'psql -U postgres -f /fixtures/CreateAdmin.sql' 
