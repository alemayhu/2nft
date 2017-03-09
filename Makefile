iptables_repo ?=git://git.netfilter.org/iptables
iptables_dir ?=~/src/netfilter.org/iptables
project ?=alemayhu/2nft
port ?= 8080

serve:
	./node_modules/.bin/nodemon index.js
setup:
	npm install

iptables:
	if ! test -d $(iptables_dir); then \
	  git clone $(iptables_repo) $(iptables_dir); \
	fi
	cd $(iptables_dir) && sh autogen.sh
	cd $(iptables_dir) && ./configure
	make -C $(iptables_dir) install

docker:
	docker build -t ${project} .
docker_deploy: docker docker_push
	echo "Pushed to docker, https://hub.docker.com/r/${project}"
docker_run: docker
	docker run -dit -p $(port):3000 ${project}
docker_push:
	docker push ${project}
ttd:
	-docker stop `docker ps |grep ${port}|awk '{ print $$1 }'`
	$(MAKE) docker_run
