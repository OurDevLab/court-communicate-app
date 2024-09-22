#!/bin/bash
make clear_db
make config_db
make update_fixtures
make load_fixtures
make create_admin_user
