FROM mariadb:10.6.4-focal

COPY initdb.sql /docker-entrypoint-initdb.d/
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]