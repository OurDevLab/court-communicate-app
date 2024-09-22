INSERT INTO "User"(login, password, name, surname, email, role) VALUES ('Administrator', crypt('4N!mDa22', gen_salt('bf', 8)), 'Admin', 'Admin', 'admin@admin.com', 'ADMIN');
