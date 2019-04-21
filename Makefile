up:
	docker-compose up -d --build

down:
	docker-compose down

run:
	docker-compose up --build

install:
	cd front && yarn install
	docker exec -it ruby-api bundle install

create-db:
	docker-compose run ruby rake db:create

migrate-db:
	docker-compose run ruby rake db:migrate

drop-db:
	docker-compose run ruby rake db:drop

bash:
	docker exec -it ruby-api bash

clean-front:
	cd front && \
	rm yarn.lock && \
	rm -rf node_modules && \
	yarn install
