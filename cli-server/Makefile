project=alemayhu/2nft-cli-server
all:
	go build

vbox:
	vagrant up --provider virtualbox

test:
	go test -v

tidy:
	gofmt -w *.go
	goimports -w *.go
	golint *.go

run: all
	./cli-server

docker:
	docker pull alemayhu/iptables-docker
	docker build -t ${project} .
docker_clean:
	-docker stop 2nft.server
	-docker rm 2nft.server
docker_deploy: docker docker_push
	echo "Pushed to docker"
docker_run: docker_clean docker
	docker run --name 2nft.server -p 8089:80  -d -i ${project} /bin/bash
docker_push:
	docker push ${project}
docker_shell:
	docker exec -t -i 2nft.server /bin/bash

.PHONY: all
