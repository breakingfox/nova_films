#!/bin/bash
set -e

echo "Database User: $POSTGRES_USER"
echo "Database Name: $POSTGRES_DB"

# Attempt to wait a bit longer and add verbose flag to pg_isready
while ! pg_isready -q -h postgres -p 5432 -U "$POSTGRES_USER" -t 1
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

echo "Database is ready to accept connections"

# Import your data
pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" -1 /docker-entrypoint-initdb.d/nova_films.dump
