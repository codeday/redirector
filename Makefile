.DEFAULT_GOAL := main

main:
	@docker build . -t srnd/docker-redirect-many
run:
	@docker run srnd/docker-redirect-many
