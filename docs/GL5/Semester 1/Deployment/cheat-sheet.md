---
slug: /gl5/semester-1/deployment/cheat-sheet
---

# Cheat sheet

Author [@Saief1999](https://github.com/Saief1999)

## Introduction to K8s

### What is K8s

- Open source **Container Orchestration Tool**

- Developed by Google originally

- Helps you manage containerized applications in different **deployment environments**

### What features does it offer?

- High Availability ( almost no downtime )
- Scalability ( high performance )
- Disaster recovery ( backup and restore )

## Main Kubernetes Components

### Node & Pod

**Node** :

- Simple server, Physicial or virtual machine
- Each node can have multiple pods

**Pod** :

- Smallest unit of K8s
- Abstraction over container ( layer on top of containers, so we only interact with k8s layer )
- Each pod will have one or more containers ( for example, we might have a main container and a set of sidecar containers )

Each **Pod** gets its own IP address ( offered by kubernetes virtual network ) so it can communicate wih other pods

If we lost a container (in case the app crashed/ run out of resources/ ect...) it pod will die and a new one will be created in its place. And it will assigned a **new IP addresse**

-> this is why pods use services to communicate with each other.

### Service & Ingress

**Service** :

- provides a permanent Ip address attached to each pod
- Used by pods to communicate with each other
- lifecycle of Pod and Service Not connected ( if a pod dies, the service and its Ip address will not )
- Service is also a **load balancer**:
  - pass the call to the pod that's not busy

**External service** :

- App should be accessible through browser
- For this we will create an external service (a service that opens communication to the external world)

**Internal service** :

- Not available from outside

**Ingress** :

- Used to configure a domain name & route traffic into the cluster
- Used on top of services

### ConfigMap and Secret (External configuration)

**ConfigMap**:

- External configuration for the application
- We connect it to the pod and the environment will be injected to the containers .

**Secret**:

- Putting credentials in ConfigMap is unsecure
- For this, we use **Secret**, used to store secret data
- Data comes in base64 encoded format. We need to also encrypt them using third party tools ( they are not encrypted by default! ).
- Will contain things like credentials, tokens, ...

We can use data from **Secret** of **ConfigMap** inside of the application pod as **environment variables** or a **properties file**

### Volumes (Data persistance)

- Attach a physical storage to the pod
- The volume can be
  - On a local machine (part of our node)
  - Remote storage (not part of k8s cluster)
- K8s doesn't manage data persistance so we need to manage it ourselves

### Deployment and StatefulSet

**Deployment** :

- we define a blueprint for our application pods (how many times should it be replicated ect... )
- Deployment is an abstraction on top of Pods
- It's generally used for stateless application

StatefulSet :

- Meant for stateful apps ( databases ) otherwise we might have data inconsistencies if we use a normal deployment.
- it's like a Deployment for stateful application
- Deploying statefulSet is not easy ( a common practice is often to just host the database outside of the k8s cluster and communicate with it when needed )

## Kubernetes Architecture

### Node Processes

#### Worker Nodes

Each worker node has multiple Pods on it

Worker Nodes do the actual work

3 Processes must be installed on every node :

- **Container runtime**: (docker, containerd, ...) (docker images can run on any container runtime ). It needs to be installed on every node
- **Kubelet** : Interacts with both the **container** and **node**.
  - Starts the pod with a container inside
- **Kube Proxy** :
  - Forward requests from services to pods
  - Makes sure that the request is optimized with no overhead

#### Master Nodes

Use for monitoring , scheduling, ect...

We can have multiple master nodes.

4 processes run on every master node :

- **Api Server** :
  - Cluster gateway to get requests and queries
  - Our entrypoint to the cluster
  - Gatekeepter for authentication and authorization: Validates requests then forwards it to other processes to do the worker
- **Scheduler** : Just decides on which node the new pod should be scheduled (The kubelet is the one that actually creates the pod)
  - Looks at your worker node and chooses the one that currently can deploy your application and is least busy.
- **Controller manager** :
  - Detects cluster state changes and tries to recover the cluster state ( makes a request to the scheduler to reschedule the dead pods )
- **etcd** :
  - Key value store on the cluster state
  - every new change to the cluster gets stored in etcs
  - What resources are available? what resources are available?
  - Application data **is not** stored in **etcd**

### Example of cluster setup

We can have 2 Master nodes , 5 worker nodes

The master nodes need less resources than worker nodes.

To add a new Master/Node server:

1. we get a new bare server
2. install all master/worker node processes
3. add it to the cluster

## Minikube and Kubectl

### What is Minikube

One node kubernetes cluster that has both master processes and worker processes

Minikube will create a virtualbox for the cluster

Used for testing purposes

```bash
minikube config set driver virtualbox
minikube start
```

to get the nodes available for kubectl

```bash
kubectl get nodes
```

after starting minikube. We see that a master node has been created by default inside our cluster.

### Kubectl

command line tool to interact with kubernetes cluster (either in minikube or in any cloud provider)

Communicates with the API server that's part of the master processes.

## Basic kubectl commands

### Create and Edit a pod

```bash
# Get list of pods
kubectl get pod
# Get list of services (by default, we will get one service for the cluster itself)
kubectl get service
```

- Generally, we work with deployments and not with pods. It's our abstraction layer over pods.

```bash
# create a deployment
kubectl create deployment [--dry-run] [options] < name > --image=image
```

`--dry-run`: Must be "none", "server", or "client". If client strategy, only print the object that would be sent, without sending it. If server strategy, submit server-side request without persist in the resource.

Simply put. using `--dry-run=client` will not create the resource. We can output it by doing `-o yaml` at the end.

for example

```bash
# create nginx deployment
kubectl create deployment nginx-depl --image=nginx

# To return the deployment we just created
kubectl get deployment
```

A pod will be created by this deployment. We can check that here ( wil have this name : `deploymentName-${some hash}`)

```bash
# To return the pod created by the deployment
kubectl get pod
```

#### Replica Set

By default, between the deployment and the pod. Kubernetes manages another layer. The **Replica set**

Is is used to manage the replicas of a Pod (we never configure it manually, we configure deployments instead by adding additional params)

we can check that by doing

```bash
kubectl get replicaset
```

#### Layers of abstraction

- a **Deployment** manages a **ReplicaSet**
- a **ReplicaSet** manages a **Pod**
- a **Pod** is an abstraction of a **Container**

We just modify the deployment. Everything else is managed by kubernetes

#### Editing a deployment

fot that, we do this

```bash
kubecetl edit deployment <deployment-name>
```

An editor will open with the deployment configuration. We can then modify it as we'd like.

We can for example change the image and save. The old pod will be removed and the new one will be deployed

### Debugging a pod

For that we can do this. Which will show the logs of the containers inside the pod.

```bash
kubectl logs <pod-name>
```

To access the container and look inside of it

```bash
kubectl exec -it /bin/bash < pod-name > --
```

To get info aboud a pod

```bash
kubectl describe pod <pod-name>
```

### Deleting a deployment

```bash
kubectl delete deployment <deployment-name>
```

### Creating and deleting a deployment based on a config file

```bash
kubectl apply -f <config.yaml>
# for example
kubectl apply -f nginx.yaml
```

here is an example of a configuration file

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
```

we can also delete based on a configuration file

```bash
kubectl delete -f <config.yaml>
```

## Yaml Configuration File in kubernetes

specifies the **desired state**

Metadata :

- name, labels... , the stuff that identifies our resource ( so we can run selectors on it later )

Specification : (spec block + `kind`)

- Will be specific to the kind of resource we want to create (whether it's a deployment, service, ...)

- In a case of a deployment, Inside the spec block we have a `template`. That contains the configuration for our pod

Status (handled by k8s):

- What is the desired state and what is the actual state?
- Kubernetes will try to meet the desired state based on what is deployed currently
- K8s pulls the current state from `etcd` and compares it with the desired state

### Connecting components ( Labels & Selectors & Ports )

#### Labels and selectors

Metadata of the deployment contains labels : that's a key value pair that describe our deployment

Pods get the labels through the template blueprint too

Now in a service file. We use a `selector` to match a certain label. So we know which resource we need to attach it too

for example, this code will allow us to attach this service to the pods created by the deployment above (about nginx)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-sevice
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

#### Ports

We need to also configure the ports :

For each container we expose a certain port (we need to define this in the template block, it describes what the pod exposes).

The service also has a listening `targetPort` so other resources can connect to it and a `port` that it uses to connect to the pods

To verify that the service can connect to the pod

```bash
# Verify the "endpoint" variable.
kubectl describe service <service-name>

# Check the IP of the pod, make sure it maches the one in the "endpoint" variable in the service
kubectl get pod -o wide
```

We can remove the actual pod. The "endpoint" will become empty for the service. But the actual configuration is still there ( so once we redeploy the deployment, it will get reattached to the service automatically )

### Getting the configuration from etcd and saving it to a file

```bash
kubectl get deployment nginx-deployment -o yaml > nginx-deployment
```

A lot of stuff will be added of course ( like the creation date of the deployment). We need to clean that if we want to use that blueprint to create new deployments.

## Namespace

Used to organise resources in namespace

virtual cluster in kubernetes cluster

by default we have **4 namespaces out of the box**

- `kube-system` : contains system process ( do no create stuff here )
- `kube-public` : configmap which contains cluster information, publicly accessible data even without authenticating (using the `kubectl cluster info` command)
- `kube-node-lease` : hartbeats of nodes (determines availability of nodes)
- `default` : where we create resources by default

---

`kubernetes-dashboard` : specific to minikube

---

We create it with

```bash
kuebectl create namespace my-namespace
```

or using a config file

### Use cases of namespaces

1. Group resources by namespace :

   - database namespace
   - Monitoring namespace (prometheus, ...)
   - elastic stack namespace
   - nginx ingress namespace

2. Separate resources by teams ( even if the resources have the same name, in order to aboid conflicts )
3. Resource Sharing:
   1. Staging / Development in the same cluster (when, for example, you have a shared resource you want both applications to use, such as an nginx ingress controller/Elastic stack without having to setup a separate cluster )
   2. Resource Sharing: Blue/Green Deployment in the same cluster
4. Access and resource limits on namespaces ( Restrict access for each team to only their namespace, limit resources (CPU, RAM, Storage) )

### Limits

- Each namespace should define its own configmap / Secret ( we can share services however )
- Some components are not **namespaced** (they libe globally in a cluster) such as : **node, volume**
  - We can check them with `kubectl api-resources --namespaced=false`

### Linking a component to a namespace

#### Method 1 : CLI

```bash
kubectl apply -f configmap.yaml --namespace=my-namespace
```

#### Method 2 : Inside config file

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-configmap
  namespace: my-namespace
data:
  db_url: mysql-service.database
```

### Change Active namespace

We can use `kubens` , or we we'll need to add `-n my-namespace to each command`

We can also use `kubectx` to easily change between clusters

## Kubernetes Services

a representation/abstraction layer for IP addresses

Each pod has its own IP address

- Pods are ephemeral - are destroyed frequently! (and will get new IP addresses each time )

The Service Provides:

- Stable IP address
- loadbalancing ( other resources will call the service instead of the underlying ports )
- loose coupling within & outside cluster

### ClusterIP Services

Default type for services

Used to forward from Ingress to the service ( ClusterIP type ) and the Pod will forward them to the Pods

- Which pods to forward the request to ? : using the **selector** of the service
  - It will match all selectors ( if multiple replicas have the same label, they will all be registered as its endpoints ). The service will forward the requests to one of these replicas each time
- Kubernetes creates an **Endpoint** object when we create a new pod matching the selector of a service. It will keep track of, which Pods are the members/endpoints of the Service.
- `Port` can be arbitrary, but TargetPort must match the port of the container.

#### Multi-Port Services

Used when we want to use one service , to access pods where we have more than one containers ( one sidecar monitoring container for example ). For example this:

```yaml
ports:
  - name: mongodb
    protocol: TCP
    port: 27017
    targetPort: 27017
  - name: mongodb-exporter
    protocol: TCP
    port: 9216
    targetPort: 9216
```

### Headless Service Type

We have this by setting **ClusterIp: None**

Client wants to communicate with **1 specific Pod directly**

Pods want to talk directly with **specific Pod** ( so not randomly selected)

Use case : Stateful application, likes **databases** (We have Master/Worker pods and it's important to choose the right pod )

Client needs to figure out IP addresses of each Pod :

- Option - Api Call to K8s API Server ( Inefficient + makes app too tied to k8s API )
- Discover pod ip address through DNS lookup
  - By setting clusterIp to "None" in the service, We won't have a cluster IP address assigned for the service, we can do a simple Ip address lookup on the service and we'll get the IP address of the Pod.

### Nodeport Service type

External traffic has access to fixed port on each worker node ( Avoid this type! it is not secure )

-> NodePort Service is an extension of ClusterIp Service

### Loadbalancer Service type

Better alternative to nodeport

Service becomes available through the Cloud provider specific loadbalancer ( from outside the cluster )

Nodeport ( port open on the workernode, but only available through the loadbalancer first! which makes it more secure than the previous type )

-> Loadbalancer Service is an extension of NodePort Service

## Ingress

### External Service vs Ingress

External Service ( LoadBalancer service type ) : good for testing, make sure the app works. We will get the external Ip

Ingress : we will get a domain name to access to the app. The ingress will forward the requests to an **internal** serviec

### Syntax of Ingress

**routing rules** : Forward requests to which service (generally a clusterIP service ) ?

Host :

- valid comain address
- map domain name to Node's IP address which is the entrypoint

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: myapp-ingress
spec:
rules:
- host: myapp.com
    http:
    paths:
        - backend:
            serviceName: myapp-internal-service
            servicePort: 8080
```

### Configure Ingress in the cluster

![[Pasted image 20230107133719.png]]

we will need an **implementation** for Ingress. Which is **Ingress Controller**

Ingress controller: Many **Third Party** implementations such as k8s **Nginx Ingress Controller**

- Evalute all the rules in the config of the Ingress
- Manage redirections
- Entrypoint to cluster

#### Cloud Service provider

We won't have to implement a load balancer ourselves. We will have a Load Balancer that forwards requests to the Ingress controller.

#### Bare metal

We need to configure some kind of entrypoint to the cluster.

We can for example implement a separate Proxy Server that has a public IP Address and open Ports. It is the entrypoint to the cluster.

![[Pasted image 20230107134036.png]]

#### Ingress controller in Minikube

```bash
minikube addons enable ingress
```

by running

```bash
kubectl get pod -n kube-system
```

we will now find the nginx-ingress-controller by running

```bash
kubectl get pod -n ingress-nginx
```

##### Example

We can add the kubernetes dashboard by running

```bash
minikube dashboard
```

a new namespace `kubernetes-dashboard` containing the dashboard will be created.

The dashboard will not be exposed externally by default so we will create an Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  rules:
    - host: dashboard.com
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: kubernetes-dashboard
                port:
                  number: 80
```

we apply and wait a little while for it to resolve.

we need to assign the IP address of the Ingress in `/etc/hosts` ( that we get with `kubectl get ingress -n kubernetes-dashboard`)

```txt
// in /etc/hosts
ip-of-ingress dashboard.com
```

Now we can then access the dashboard from using `dashboard.com` on the browser

### Ingress Default Backend

Whenever a request comes that's not mapped to any backend (not mapped to any service). This backend will be used to to handle that requests

The default backend in kubernetes will return us : `404 page not found`

To configure a custom default backend :

- Create an internal service
- Give it the name **default-http-backend/**
- Give it **port 80**

### Different Use cases to Ingress

- Multiple paths for same hosts

  - We will need one host block, with multiple paths
  - for example /analytics redirect to analytics-service on port `3000` and `/shop` redirect to analytics-service on a different port

- custom domains
  - We will need multiple host blocks

-Configuring TLS certificate (in the Ingress config)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-example-ingress
spec:
  tls:
    - hosts: myapp.com
      secretName: myapp-secret-tls
```

`myapp-secret-tls` needs to be a Kubernetes `Secret` resource that contains some specific data for its configuration

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret-tls
  namespace: default # same namespace as ingress resource
data:
  tls.crt: base64 encoded cert
  tls.key: base64 encoded key
type: ...
```

## Volumes

### Storage Requirement

- Storage that **doesn't depend on** the pod lifecycle
- Storage must be **available on all nodes**
- Storage need to **survive** even if **cluster crashes**

### Persistent Volume

A cluster resource

Created via YAML file

it's an abstraction over a local/remote **storage backends** ( which are defined in the **spec** section). The actual physical storage should be managed by us.

Persistent Volumes are **not namespace**

Examples of remote : Google cloud, NFS, ...

Local volume types are tied to 1 specific node and do not survive cluster crashes. That's why they are not suitable for databases for example

### Persistent Volume Claims

**Persistent volumes** are provisioned and created by **K8s administrators**

**Developers** use **Persistent Volume Claim** to claim persistent volumes. They define a request (storage size, whether it's readonly/rw). **whatever Persistent volume satisfies this claim ( resource wise ) will be used.**

We then use the Persistent Claim in the Pod configuration file

> **Claims must be in the same namespace as the pods**

We first configure `volumes` block in the pod, and then choose which container mounts the pod via `volumeMounts` inside the `containers` block

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts:
        - mountPath: "/var/www/html"
          name: mypd
  volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: pvc-name
```

> Note : A Pod can actually use different volume types (Local/Remote) with a mountPoint for each

### Storage Class

Create/provisions persistent Volumes dynamically whever a Persistent Volume Claim claims it.

Another abstraction level:

- abstracts underlying storage provider
- parameters for that storage
- Requested by `PersistentVolumeClaim` the same way we calim normal Persistent Volumes
- When :
  1. a Pod claims storage via PVC
  2. PVC requests storage from SC
  3. SC creates PV that meets the needs of the claim

Storage backend is degined in the Storage class component via the **provisioner** attribute

There are internal/external provisioners (internal: starts with kubernetes.io)

Example

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: storage-class-name
provisioner: kubernetes.io/aws-ebs
parameters:
  type: io1
  iopsPerGB: "10"
  fsType: ext4
```

## ConfigMap and Secret as Kubernetes Volumes

ConfigMap ans Secret are used for external configuration of individual values. But can also be used to create files that can be injected into containers (as local volumes)

ConfigMap and Secret Volumes are not created by PV and PVC. They are managed by kubernetes itself.

If we need a configuration file/certificate file for pod, we need to do this :

- Define ConfigMap or Secret k8s component. With the file defined inside the `data` block
- Mount that into Pod/container via :

```yaml
template:
  spec:
    containers:
      - name: ...
        image: ...
        volumeMounts:
          - name: config-dir
            mountPath: /etc/myconfigfile
            readOnly: true
      - name: ...
        image: ...
volumes:
  - name: myconfigfile
    configMap:
      name: bb-configmap
```

## StatefulSet

Stateless Applications:

- Deployed using StatefulSet
  - can be used to replicate Pods

Stateful application :

- Databases / applications that store data
- Deployed using Deployments
  - can be used to replicate Pods

We can configure storage the same way in both deployments and Stateful Set

### Deployment vs StatefulSet

Deployments

- Pods are :
  - identical and interchangeable
  - Created in random order with random hashes
  - One service that load balances to any Pod

StatefulSet:

- Sticky identity for each Pod to retain state even if the pod does
  - (statefulsetname)-ordinal
  - Ordinal starts at 0 and increments
  - Next Pod is only created iv previous is up and running
- Each Pod has individual DNS name
- Create from **same specification** but not interchangeable
- persistent identifier even if the pod is re scheduled
- They are doable, but not perfect for containerized applications and container orchestration tools

### Scaling database applications

in databases, One pod can write/read (master). The rest of the Pods (slave) can only read.

Pods continuously synchronize the changes. The master changes data and the slaves update their volumes to the latest version of the data.

Each pod should be backed up by its own volume to read from. So even if the Pod dies, its state is still there in the volume.

## K8s on Cloud and Managed K8s Service

### Kubernetes on Cloud plateform

#### Method 1 : Kubernetes from scratch

- Create our own cluster from scratch ( 3 worker nodes and 3 master nodes for example)

#### Method 2 : Use managed service

Example : Linode Kubernetes Engine

- Only care about worker nodes
- everything preinstalled
- Master nodes created and managed by cloud provider
- we only pay for Worker nodes.
- For Persistent volumes, we can use the storage service provided by the cloud provider ( for example EBS in AWS )
- We can use the cloud providers loadblanacer that connects to the ingress to connect to the cluster.
  - Certifications is done in lindoe used kindoe cert-manager
