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
	docker build -t ${project} .
docker_deploy: docker docker_push
	echo "Pushed to docker"
docker_run: docker
	docker run -t -i ${project} /bin/bash
docker_push:
	docker push ${project}

.PHONY: all
