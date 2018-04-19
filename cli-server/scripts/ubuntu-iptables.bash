#!/bin/bash

export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
export DBLATEX=no
export DOCBOOK2X_MAN=no
export DOCBOOK2MAN=no
export DB2X_DOCBOOK2MAN=no

do_run() {
  make clean
  make
  sudo make install
  sudo ldconfig
}

# Try installing the dependencies
if [[ "prepare" == $1 ]]; then
  if apt-get update >/dev/null; then
    apt-get -y install docbook2x docbook-utils libgmp-dev libreadline-dev
    apt-get install -y autoconf build-essential gcc make autoconf automake
    apt-get install -y libjansson-dev pkg-config zlib1g-dev curl libtool
    apt-get install -y docbook2x docbook-utils bison flex
  elif dnf update >/dev/null; then
    dnf install -y autogen autoconf automake libtool flex bison
    dnf install -y gmp-devel readline-devel docbook2X systemd
  else
    echo "Error unsupported"
  fi
  exit
elif [[ "local" == $1 ]]; then
  do_run
  exit
fi

set -x
set -e

src=~/src/netfilter.org
mkdir -pv $src
cd $src

for project in libmnl libnftnl nftables iptables
do
  # Want to verify what is in use
  if [[ "show" == $1 ]]; then
    git -C $project ll
    git -C $project branch -v -v
    continue
  fi

  if [ -d "$src/$project" ]; then
    git -C $project stash
    git -C $project checkout master
    git -C $project fetch --all
    git -C $project pull
    cd $project
    sh autogen.sh
    if [[ $project == "libnftnl" ]]
    then
      ./configure --with-json-parsing
    else
      ./configure
    fi
    do_run
    cd $src
  else
    git clone git://git.netfilter.org/$project
  fi
done