#!/bin/bash

apt-get update
apt-get install -y golang

if [ -d "/home/ubuntu" ]; then
  exit 0
fi

echo "export GOPATH="\$HOME"/opt/og" >> /home/ubuntu/.bashrc
