#!/bin/sh

sudo su -
cd /root

# Cleans yum... fixes the 2 week old repo data problem
yum clean all
yum update -y

rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm


###################
# Redis
yum install redis -y

# Starts redis and then returns control to the shell
redis-server &

##################
# Node
yum install wget -y
wget http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz
sudo tar --strip-components 1 -xzvf node-v* -C /usr/local


###################
# Goodies
yum install screen -y

###########################
# Just for Josh
###########################

#yum install tmux
#
#git clone https://github.com/Nemonocerater/josh_setup.git
#cd josh_setup
#./setup_mac_config.sh
