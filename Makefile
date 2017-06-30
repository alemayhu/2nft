docker_run:
	make -C cli-server docker_run
	make -C web docker_run

docker:
	make -C cli-server docker
	make -C web docker

vps:
	VBoxManage list runningvms
vbox:
	-vagrant destroy -f
	vagrant up --provider=virtualbox
vtt:
	vagrant reload
	vagrant ssh
vnginx:
	sudo cp 2nft.conf /etc/nginx/sites-enabled/default 
	sudo systemctl restart nginx
