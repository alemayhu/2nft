# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "fedora/25-cloud-base"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.provision "shell", inline: <<-SHELL
     curl https://get.docker.com | bash
     dnf install -y make tmux
     usermod -a -G docker vagrant
     systemctl enable docker
     reboot
  SHELL
end
