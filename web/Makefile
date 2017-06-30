project ?=alemayhu/2nft
port ?= 8080
hosted =2nft.alemayhu.com

serve:
	./node_modules/.bin/nodemon index.js
setup:
	npm install

docker:
	docker build -t ${project} .
docker_nocache:
	docker build --no-cache=true -t ${project} .
docker_deploy: docker docker_push
	echo "Pushed to docker, https://hub.docker.com/r/${project}"
docker_run: docker
	-docker stop 2nft.web
	-docker rm 2nft.web
	docker run --name 2nft.web -dit -p $(port):3000 ${project}
docker_push:
	docker push ${project}
2nft: docker_deploy
	docker pull ${project}
	-docker stop ${hosted}
	-docker rm ${hosted}
	docker run -p 7000:3000 --name=${hosted} -m 256m -d ${project}
ttd:
	-docker stop `docker ps |grep ${port}|awk '{ print $$1 }'`
	$(MAKE) docker_run

update-package-info:
	scripts/gen-package-meta > package.json
