# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

ENV["VAGRANT_DEFAULT_PROVIDER"] = "virtualbox"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "CentOS-6.4-VirtualBox"
	config.vm.box_url = "https://github.com/2creatives/vagrant-centos/releases/download/v6.4.2/centos64-x86_64-20140116.box" # "https://dl.dropboxusercontent.com/s/w3lbekm7eunrskm/centos-7.0-x86_64.box"

	config.vm.network "forwarded_port", guest: 3838, host: 3838, auto_correct: true
	config.vm.network "forwarded_port", guest: 6379, host: 6379, auto_correct: true
	config.vm.synced_folder "Code", "/home/vagrant/Code"

	config.vm.provision "shell", path: "setup.sh"

	config.vm.provider "virtualbox" do |v|
		v.name = "GravityGameServer"
		v.gui = false
		v.memory = 1024 
		v.cpus = 1
	end
end
