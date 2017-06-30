docker_run:
	make -C cli-server docker_run
	make -C web docker_run

docker:
	make -C cli-server docker
	make -C web docker

vps:
	VBoxManage list runningvms
vbox:
	-vagrant destroy
	vagrant up --provider=virtualbox
vtt:
	vagrant reload
	vagrant ssh
