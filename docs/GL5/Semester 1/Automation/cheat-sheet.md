---
slug: /gl5/semester-1/automation/cheat-sheet
---

# Cheat Sheet

Author [@Saief1999](https://github.com/Saief1999)

## Bash scripting

> What we did : We setup an Azure VM, copy the project files through SSH and then run the apps through SSH too.

`bash -s` : Run commands from standard input

`set -e` : set the shell to exit as soon as the first error is encountered

`set -u`: The -u option treats unset or undefined variables except for special parameters such as wildcards (\*) or “@” as errors during parameter expansion.

`#!/usr/bin/env bash` : better than `#!/bin/bash` because it will always use the right "bash"

to handle the nodejs process , without depending on ssh

- no-hup
- pm2 ( or nodemon )
- forever

envsubst : Subtitute variable in scripts

the problem is , when we close the ssh session, the command that we're executing through ssh will stop ( even if we use & )

The solution is :

- nohup
- something for healthcheck / disaster recovery , a process manager ( both of these are used for nodejs ) :
  - pm2
  - forever

forever is able to launch the node process and manage it (through a `forever.json`), it can also track its logs and the logs of its processes

We can stop & start the application ( so it gets updated after restart )

## Ansible

Ansible is push based.

Chef is pull based, we need an agent to update configuration inside our servers that pull from a cookbook that's inside a repository

Playbook > Tasks > Modules

Ansible roles : Used for reusable playbooks

Bastion hosts : secure host that forward ssh requests to other instances that are private from the outside world

```bash
ssh -j <bastion-host> <remote-host>
```

## Vagrant

`vagrant init <box-name>` write spec for VM using vagrantfile to create repeatable environment containing our different tools.

images for VMs are avaiable through vagrant **boxes**

providers for Vagrant:

- vmware/ docker / hyperv / ...

we can use **provisioners** to execute commands ( like Ansible, puppet, Chef, Shell )
