---
slug: /gl5/semester-1/devops/cheat-sheet
---

# Cheat sheet

Author [@Saief1999](https://github.com/Saief1999)

## 1. Prometheus, Grafana

we should use `snake_case` to name metrics in prometheus ( as a norm )
Example : `http_request_total`

counter

Metrics :

- Counters ( Difference in time + rate , variety in time, we don't want the number of elements, but the rate each second for exemple)
- Gauges ( a certain value at a certain time : How much free memory we have)
- Histograms : example , how many request we managed to answer under one second, between 1~2 seconds, +3 seconds ect... we divide our values into buckets. ( intervals )

How to show metrics externally :

- Approach 1 : our applications exports its metrics to a db that's compatible with prometheus within fixed intervals
  - Our application will depend from Prometheus
  - it will handle the different errors in case it can't access it
  - Might be more suitable for a Lambda function

- Approach 2 : expose metrics in an endpoints ( like `/metrics` ) and let prometheus access it.
  - decoupling between db an app
  - Generally more used

Labels : used to identify variables having the same name ( like a property on a metric )

We first create a metric and give it all the possible labels ( that can have multiple values ), we then specify the label when we increment for example

---

In order to register our application in Prometheus :

Method 1 : Static configuration

we add this to `prometheus.yml`

```yaml
- job_name: "fact"
  static_configs:
      - targets: ["localhost:5000"]
```

Method 2 : Dynamic configuration (using Service Discovery)

We can use PromQL to query the metrics

Graph : Shows the progress of metrics in time

Alternative to Prometheus : DataDog ( we send data to it and then show the different metrics )

Grafana : a dashboard that uses prometheus as a source of truth

We first configure the data sources ( such as Prometheus )

There's two types of metrics :

- application metrics
- host metrics ( Status of the machine , for example )

we can use `prometheus-node-exporter` ( from the package manager ) to serve system monitoring info on port 9100 , we need to add it later as another job in prometheus, and later we add a dashboard for it in grafana ( we can import one done by the community )

## 2. Helm

In Kubernetes, we define the desired state in a declarative way . We define the desired state using YAML configuration files. Kubernetes tries to get to the desired state from the current state.

Helm helps us **package** multiple kubernetes components together. and Makes it **configurable** in order to run full setups easily and efficiently

Helm is also a template engine :

- Input : Values.yaml + template
- Output: Manifest Files

---

- We create an Azure cluster ( with Dev/Test and container registry, the rest is default

run `az login`

run `az aks get-credentials --resource-group RESOURCEGROUPE_NAME --name CLUSTER_NAME`

running:

```bash
kubectl get nodes
```

we get the nodes.

> Note : We can also use **kind** which is similar to **minikube**

- We add the repo for the charts via :
  
```bash
helm add repo <repo_url>
```

```bash
helm search repo prometheus-community
```

To install the prometheus chart and give it the name `prometheus` we run this ( brings the definition, uses the default values, generates the manifests, applies the config ):

```bash
helm install prometheus prometheus-community/prometheus
```

this is similar to doing

```bash
helm template ... | kubectl apply
```

To see all applications currently installed through helm:

```bash
helm list 
```

To only generate the template without applying

```bash
helm template prometheus prometheus-community/prometheus
```

To select a configuration file to use for templating, we add this part to the previous command:

```bash
-f values.yaml 
```

to uninstall a chart

```bash
helm uninstall prometheus
```

> In order for a directory to contain a Helm chart, it should contain a `Chart.yaml`

After creating the Helm chart ( and the deployment inside),  we can do :

```bash
helm install "fact-service" .
```

in Kubernetes : we have an `overlay network` : even if two pods are far from each other ( in two different nodes )  they share the same local network with each other and can communicate

nodeport : attach port in node to service

Load balancer : IP/port but in the cloud provider level , not in the node level

To forward the Requests from the prometheus server port 80 to 9090 in our machine , we do

```bash
kubectl port-forward pod/prometheus-server-6cfc854b6f-44s4v 9090:9090
```

Before, we linked our metrics statically (by providing a link for prometheus), this doesn't scale well.

Now we'll try to configure our servies to dynamically bind to prometheus and send the logs automatically

**Inversion Of Control**: Instead of control in prometheus to decide which services to scrap from, we give control to applications to enable/disable scraping

Kubernetes has an API Server : Gateway to the cluster

We will give Prometheus access to the Api server to get pods that have a certain label , if they enable scraping, prometheus will scrap from them.

-> In this case, the Api gateway will play the role of a **service registry** for prometheus to get the list of pods

For prometheus to get access to list pods feature, we will create a **Service Account**

---

## 3. Watchdog 1

Log levels :

- Debug
- Info
- Warn
- Error
- Critical

`requestLogger = rootLogger.with("request_id", "1234")` -> We will inherit the rootLogger and add the request_id to each and every log message

agent : reads the logs ( outputs from the app ) - and send  it to datadog/loki for visualization

In kubernetes : nodes , within each node multiple pods

for each **node** , we need a **global agent** to collect the traces ( One DataDog agent for example )

daemonset : Only one copy of the Pod in each **node**

- A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are garbage collected. Deleting a DaemonSet will clean up the Pods it created.

In Datadog, we will generate an access key to access datadog from the agents and send logs to it.

we add the Datadog helm chart by running :

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

To install the chart , we run  ( found in `https://github.com/DataDog/helm-charts/tree/main/charts/datadog` )

```bash
helm install <RELEASE_NAME> \
    --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
```

## 4. Watchdog 2

When using DataDog, we need to enable the functionality / Service that we need ( for example , logs by adding the `logs` block)

This time, we will add more configuration before applying the chart

In `datadog-values.yml`

```yaml
datadog:
  apiKey: MYKEY

  kubelet:
    tlsVerify: false # needed if working with azure
  
  logs: 
    enabled: true #enable logs
    containerCollectAll: true # collect logs of all containers
```

```bash
helm install datadog -f datadog-values.yml  datadog/datadog
```

After that we add a simple `console.log`, redeploy the application in dockerhub then in kubernetes :

```bash
kubectl port-forward factservice-deployment-6c7bb95d7b-92qnl 6000:5000
```

We run this a few times to get logs , and then we check them in datadog

Datadog : There are two parts , tags and attributes

  tags : dependent from the appllcation
     Message : blabla
     requestId: 1234

  attributes: ( added to pinpoint the location )

- podName
- serviceName

Datadog query language: key:value

Next Task -> We added the requestId to all the logs

other tools for logging open source : logstash (from elk), loki ( from grafana loki )
-> Problem with opensource tools: storage

Layer 0 : Provisioning/Infra: Terraform

Layer 1 : Configuration ( Ansible )

Layer 2 : Bootstrap env ( The different tools we might need, Datadog, ect ... )

Layer 3 : The application

## 5. Tracing

For tracing , The app should send the traces to the tools and not the other way around

Each request has its own traces, and it can get quite large. That's why we don't store it in the machine but send it directly to the tracing service.

We add

```yaml
oltp:
receiver:
    protocols:
    grpc:
        enabled: true
```
