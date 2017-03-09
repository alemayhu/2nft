#!/bin/bash

set -x
set -e

ID=$1

if [[ $ID == "" ]]; then
  echo "Need a patch ID."
  echo "http://patchwork.ozlabs.org/project/netfilter-devel/list/"
  exit
fi

cd /home/tester/src/netfilter.org/iptables/
wget -O $ID.patch http://patchwork.ozlabs.org/patch/$ID/raw/
git apply $ID.patch
git diff
/tmp/Scripts/nft-dev local # might require root?
chown -R tester:tester .
