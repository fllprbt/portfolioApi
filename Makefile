setup:
	docker volume create nodemodules

install:
	docker-compose -f docker-compose.builder.yml run --rm install

dev:
	docker-compose up

watch:
	docker-compose -f docker-compose.builder.yml run --rm watch

test:
	docker-compose -f docker-compose.builder.yml run --rm test

tdd:
	docker-compose -f docker-compose.builder.yml run --rm tdd

