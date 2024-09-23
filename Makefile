migrations:
	sudo docker exec -i court_backend bash -c "npx prisma migrate deploy"
migrations-dev:
	sudo docker exec -i court_backend bash -c "npx prisma migrate dev"
clear_db:
	sudo docker exec -i court_backend bash -c "npx prisma migrate reset --force"
config_db:
	sudo docker exec -i court_database bash -c "psql -U postgres -c 'CREATE EXTENSION pgcrypto'"
update_fixtures:
	sudo docker cp ./backend/fixtures court_database:/
load_fixtures:
	sudo docker exec -i court_database bash -c 'psql -U postgres -f /fixtures/Structure.sql'
	sudo docker exec -i court_database bash -c 'psql -U postgres -f /fixtures/Positions.sql'
create_admin_user:
	sudo docker exec -i court_database bash -c 'psql -U postgres -f /fixtures/CreateAdmin.sql' 
