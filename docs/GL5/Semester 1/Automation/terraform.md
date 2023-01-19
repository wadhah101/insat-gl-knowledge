---
slug: /gl5/semester-1/automation/terraform
---

# Terraform

Author [@Saief1999](https://github.com/Saief1999)

## Overview

- automate and manage your infrastructure
  - plateform
  - services that run on plateform

- open source

- declarative : define WHAT end result you want ( and not imperative -> HOW )

- Used for **provisioning** infrastructure ( in the correct order)
  - Create VPC
  - Create AWS users & permissions
  - spin up servers
  - install Docker

> Terraform is **Idempotent** : If we apply the same configuration multiple times we get the same result.

### Terraform vs Ansible

Both :

- Infra as code.
- Automate provisioning, configuring and managing the infrastructure.

Terraform:

- Mainly infrastucture provisioning tool
  - CAN deploy apps
- relatively newer, and more advanced in orchestration than Ansible
- **Better** : For infrastructure provisioning

Ansible:

- Mainly a configuration tool
  - configure that infrastructure ( that's already provisioned)
  - deploy apps
  - install / update software
- **Better** : For configuring that infrastucture

### Terraform advantages

- Managing existing infrastructure ( adding more containers, ect...)

- Replicating infrastructure :
  - Replicate DEV to PROD  to have same infra

- We don't need to rememeber the current state. We just need to know the desired state.

### Terraform Architecture

- It has 2 main components :
  - **Core** :
    - which has 2 input sources :
      - TF-config
      - State : current state of infra
    - Takes input and figures out the **plan** : What needs to be created / updated / destroyed to get the desired state
  - **Providers** :
    - AWS / Azure : IAAS
    - Kuberenetes : PAAS
    - Fastly : SAAS
    - Through these **providers** you get access to these **resources**.

### Example Configuration File

#### AWS

```hcl
# Configure the AWS Provider
provider "aws" {
  version = "~> 2.0"
  region = "us-east-1"
}

# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}
```

#### K8s

```hcl
# Configure the Kubernetes Provider 
provider "kubernetes" {
  config_context_auth_info = "ops"
  config_context_cluster = "mycluster"
}

resource "kubernetes_namespace" "example" {
  metadata {
    name = "my-first-namespace"
  }
}
```

### Declarative vs Imperative

- Terraform is declarative
  - You define the **end state** in your config file ( instead of HOW to achieve that end state ).
  - e.g. 5 servers with following network config & AWS user with following permissions.

- We see the difference mainly when we want to update our infrastructure ( removing / adding )
  - **Imperative approach** : Remove 2 servers , add firewall config, add permission to AWS user. ( We give **instructions** )
  - **Declarative approach ( Terraform )** : My new desired state is : 7 servers , this firewal config and the user with following permissions. ( **figure out yourself what needs to be done** )
    - We adjust old config
    - clean and small config files
    - awlays know the current setup

### Terraform Commands for different stages

`refresh` : query infra provider to get current state -> state

`plan` : create an execute plan -> determines what actions are necessary to achieve the desired state

`apply` : execute the plan ( `refresh` & `plan` )

`destroy` : destroy the resources / infrastructure

### Providers

- expose resources for specific infra plateform
- responsible for understanding API of that plateform and expose them via terraform.
- Just code that knows how to talk to that specific technology

We should first of all start by specifiying the provider. for example :

```hcl
provider "aws" {
  region = "eu-central-1"
  access_key = "xxxxxxx"
  secret_key = "xxxxxxx"
}
```

to install a provider to use with terraform we do this : We select the directory where `main.tf` is and we run

```bash
terraform init  
```

this will download any unavailable providers that are used in our files. and will generate a couple of new files.

## Resources & Data sources

### Resources

Resources are used to create new resources in our provider.

```hcl
resource "provider_name" "variable_name" {

}
```

- `provider_name` : the name of the resource used for that provider.
- `variable_name` : a name we use for that resource in our code.

#### Creating a resource depending on another resource that doesn't exist yet

```hcl
resource "aws_vpc" "development-vpc" {
  cidr_block = "10.0.0.0/16"
}

  

resource "aws_subnet" "dev-subnet-1" {
  vpc_id = aws_vpc.development-vpc.id
  cidr_block = "10.0.10.0/24"
  availability_zone = "eu-central-1a"
}
```

##### `Apply`

in the terraform project folder we do

```bash
terraform apply
```

this will give us a summary on the changes ( addition / deletion ). we type `yes` to confirm.

### Data Sources

Data sources allow data to be fetched for use in TF configuration ( for example, To create a subnet for an existing VPC ).

> Each Subnet need to have different ip range than the other subnets in the VPC ( no overlapping )

```hcl
data "aws_vpc" "existing_vpc" {
  default = true
}

resource "aws_subnet" "dev-subnet-2" {
  vpc_id = data.aws_vpc.existing_vpc.id
  cidr_block = "172.31.48.0/20"
  availability_zone = "eu-central-1a"
}
```

### Change / Destroy a resource

#### Changing a Resource

we can add new **tags** to our vpc. for example `Name`

```hcl
resource "aws_vpc" "development-vpc" {

  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "development-vpc"
    vpc_env = "dev"
  }
}
```

then we do `terraform apply` and the changes will take place

we can now remove `vpc_env = "dev"` and terraform will make the change and remove the tag.

To track the current state. Terraform uses a file `terraform.tfstate`

#### Removing destroying a resource

Method 1 : Remove the resource from the tf file. and then run `terraform apply`

Method 2 ( should not generally be used ) : Do `terraform destory -target resourceType.resourceName`. To create the resource again we do `terraform apply`

### More Terraform Commands

- `terraform plan` : like `apply` but without actually executing the plan. Just gives a preview of it.

- `terraform apply -auto-approve` : to Auto approve

- `terraform destory` : Go through all the resources in the tf configuration and remove them one by one
  - `-target` : Select a specific target

## State

- `terraform.tfstate` :
  - This file is first created when we do the first apply. By going to AWS and getting the details ( in case we're using AWS provider ).
  - It saves the current state of our resources.
  - It gets updated with each new `apply` in order to add / remove / update our resources ( we can see that in action in the step `refreshing state...` when we do an `apply`)

- `terraform.tfstate.backup` :
  - This file contains a backup of the previous state ( before the last `apply` )

to list the resources in our current state, we do this :

```bash
terraform state list
```

to show a resource in particular from the state

```bash
terraform state show resourceType.resourceName
```

## Outputs

Output values are like **functions** that can be used to show certain properties of our resources when we run an `apply`.

example :

```hcl

output "dev-vpc-id" {
  value = aws_vpc.development-vpc.id
}


output "dev-subnet-id" {
  value = aws_subnet.dev-subnet-1.id
}
```

## Variables

They can be very useful, especially when some parts are redundant ( example for dev/prod ). we define a variable like this ( assaging is done later ).

```hcl
variable "subnet_cidr_block" {
  description = "subnet cidr block"
}
```

### Assigning variable value

#### Method 1

we can simply do `terraform apply`, any variables that don't have a value will get a prompt before applying the infra.

#### Method 2

we can also do `terraform apply -var "name=value"`

#### Method 3 : Variables file ( best approach)

we put our variables in a file, in a format `name = value`. This file should be name `terraform.tfvars`. We can create multiple `.tfvars` and then reference them in the `apply` command based on our needs ( by adding `-var-file filename.tfvars` )

example

```hcl
subnet_cidr_block = "10.0.40.0/24"

vpc_cidr_block = "10.0.0.0/16"

  
environment = "development"
```

### Assigning Default value

Inside the `variable` block in `main.tf` we can add a default value that will be used if terraform can't find an assigned value for that variable

example. In `main.tf`

```hcl
variable "vpc_cidr_block" {
  description = "vpc cidr block"
  default = "10.0.10.0/24"
}
```

### Type Constraints

You can specify a certain type for your variable

```hcl
variable "vpc_cidr_block" {
  description = "vpc cidr block"
  default = "10.0.10.0/24"
  type = string
}
```

If we want we can also pass a `list`

```hcl
# In main.tf
variable "vpc_cidr_blocks" {
  description = "vpc cidr blocks"
  type = list(string)
}

# In terraform.tfvars

vpc_cidr_blocks = [ "10.0.0.1", "10.0.0.1"]

# We access it like this. In main.tf
resource "..." "..." {
  ... = var.cidr_blocks[0]
}

```

and then we assign it, and treat it as a list.

Or we can pass objects and have string constraints.

```hcl
# In main.tf
variable "vpc_cidr_blocks" {
  description = "vpc cidr blocks"
  type = list(object({
    cidr_block = string,
    name = string
  })
}

# In terraform.tfvars

vpc_cidr_blocks = [{
  cidr_block = "10.0.0.0/16",
  name = "dev-vpc"
}]

# We access it like this. In main.tf
resource "..." "..." {
  ... = var.cidr_blocks[0].name
}

```

## Environment Variables

Useful if we want to hide credentials instead of adding them to our IAC files.

### Method 1 : Terminal Env variables

we add `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` to our terminal environment. When we run `terraform apply` terraform will be able to pick them up and use them to auth to AWS.

### Method 2 : use AWS CLI config file

the config file for credentials for AWS CLI is under `~/.aws/credentials`

terraform will be able to use these credentials to authenticate to AWS directly. So we can simply run `terraform apply`

### Define custom environment variable

they should start with `TF_VAR_name`, for example :

```bash
export TF_VAR_avail_zone="eu-west-3a"
```

then we add our variable to our file

```hcl
variable avail_zone {}
```

Then we can simply use it in any resource by calling

```hcl
var.avail_zone
```

## Create Remote Git Repo

- safekeeping
- history of changes
- team collaboration
- review infra changes using merge requests

a few files should not be added to git and should inside the `.gitignore`, such as :

- `.terraform` : stores the providers that are installed locally
- `terraform.tfstate` : this is a local state, created when we do `terraform apply` and should be ignored
- `terraform.tfstate.backup` : previous state that should be ignored too
- `terraform.tfvars` : In addition to any other variable files, because they might contain sensitive data.

however `.terraform.lock.hcl` should be added to the git repo so that the different team members have the same version for the diffferent providers.

## Entrypoint to an EC2 instance

we can add `user_data` to run a launch script for the container

```hcl
user_data = file("entry-script.sh")
```

And inside `entry-script.sh` we have this

```bash
#!/bin/bash

sudo yum update -y && sudo yum install -y docker

sudo systemctl start docker

sudo usermod -aG docker ec2-user

docker run -p 8080:80 nginx
```

> We can see that terraform is best used for provisioning the infrastructure. But to maintain and manage the underlying applications ( updating packages, ect... ), it's best to use another tool ( like Ansible / Puppet / Chef ).

## Provisioners ( Not recommanded )

> Use **user_data** If it's available ( and it is on most cloud providers). Using provisioners isn't recommanded! Also provisioners break idempotency ( we might end up with a different state)!

Terraform doesn't  give us any feedback on `user_data` commands execution. Because AWS will execute the commands later on. There are however still ways to run commands from terraform directly. by using provisioners.

provisioners are able to connect to a remote server and execute commands.

### Remote exec provisioner

`remote-exec` provisioner :

- invokes a script on a remote resource after it is created
  - inline : list of commands
  - script : path

```hcl
connection {
  type = "ssh"
  host = self.public_ip
  user = "ec2-user"
  private_key = file(var.private_key_location)
}

  

provisioner "remote-exec" {
  inline = [
    "export ENV=dev",
    "mkdir newdir"
  ]
}
```

**Note**: If we write it like this :

```hcl
provisioner "remote-exec" {
  script = file("entry-scipt.sh")
}
```

**This means that the script should already exist on our server !**. That means we will run a remote script and not a script that's available for us locally.

### File provisioner

We can use the `file` provisioner to copy files or directories from local to newly created resource

- source - source file or folder
- destination - absolute path

```hcl
provisioner "file" {
  source = "entry-script.sh"
  destination = "/home/ec2-user/entry-script-on-ec2.sh"
}
```

### Local Exec provisioner

invokes a local executable after a resource is created. This will run locally and not on the server!

example

```hcl
provisioner "local-exec" {
  command = "echo ${self.public_ip} > output.txt"
}
```

### Alternatives

#### Alternative to remote-exec

Use configuration management tools.

Once server provisioner, hand over to those tools.

#### Alternative to local-exec

use "local" provider that's available in terraform

#### Alternative

execute scripts separate from terraform, from CI/CD tool ( like jenkins for example ).

### Provisioner Failure

If a provisioner fails the resource will be marked as **failed** and we'll have to recreate it.

## Modules

help to customize the configuration with variables ( as **input** variables )

and then we have **outputs** from each module than can be used in other modules.

Create a module when you want to group a set of resources together ( for example create a webserver and all the resources around it ).

Terraform registry has a list of modules that are created and we can use.

## Microstacks

A way to separate our Terraform project into multiple sub-projects in order to make maintenance much easier and faster (also we won't have to check all resources in state file when we do a `plan` or `apply` )

One of the ways to implement microstacks is:

- Create a separate terraform project for each microstack
- use the `terraform_remote_state` data source to share information between stacks
