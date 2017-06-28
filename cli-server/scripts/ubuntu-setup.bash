#!/bin/bash

sudo apt-get update
sudo apt-get install -y golang
sudo apt-get -y install docbook2x docbook-utils libgmp-dev libreadline-dev
sudo apt-get install -y autoconf build-essential gcc make autoconf automake
sudo apt-get install -y libjansson-dev pkg-config zlib1g-dev curl libtool
sudo apt-get install -y docbook2x docbook-utils bison flex

echo "export GOPATH="\$HOME"/opt/og" >> $HOME/.bashrc