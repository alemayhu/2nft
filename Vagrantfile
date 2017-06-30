# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/zesty64"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.synced_folder ".", "/home/ubuntu/2nft", type: "rsync"
  config.vm.provision "shell", inline: <<-SHELL
     curl https://get.docker.com | bash
     apt-get update
     apt-get install -y make tmux vim nginx
     adduser ubuntu docker
     systemctl enable docker
     systemctl enable nginx
     reboot
  SHELL
end
