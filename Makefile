vps:
	VBoxManage list runningvms
vbox:
	-vagrant destroy
	vagrant up --provider=virtualbox
vtt:
	vagrant reload
	vagrant ssh
