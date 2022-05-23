---
layout: page
title: About
permalink: /
---

# Introduction and Goals

Crosslab is a complete architecture overhaul of the GOLDi System, which is a Remote Laboratory Managment System (RLMS).
It includes custom hardware interfacing the remote laboratory equipment, the connecting services and a web based user frontend for interacting with the remote laboratory.

The unique feature of GOLDi is that the Remote Laboratory is user configurable by selecting an indepedent CU and independent PS that are linked for the duration of the running experiment.

# Building Block View
## Whitebox Overall System

![](/assets/images/whiteboxOverview.drawio.png)

### Motivation::

The architecture follows a pretty standard webapplication structure where the browser executes the webapplication that connects to an API Service in the background. The API contains the business logic of the application and has an backend (Some Database or Stuff) which is not further specified at this point. External Systems can communicate throug this API with our System. The mechanisms for this are not specified and can consists of an API endpoint or other services inbetween if necessary.
This standard decomposition (Web Application, API, Backend) was choosen because of its simplicity.

For the experiment execution we view the all the Hardware Units and the webapplication as devices, to simplify the connection between those - they are all handled the same.

In all cases the devices need some side channel informations to connect each other. In some cases they might not even be able to communicate with each other at all, so that a relay server is needed. The services to provide this (Devices Connection Services) is decoupled from the actual API, because the task is very different from a Request / Response or REST pattern used in the API. However, the Devices still need to register and authentificate with the API. The Rational behind this is to keep all relevant information and authorization requests at the one single point: the API.

Because Devices are passive, the application needs some way of controlling the Device Connection Services.

### Contained Building Blocks:

#### Webapplication
* User interface,
  * configure and use experiments
  * use ICOs
* connect to the experiment
  * as  user device
  * as experiment devices, in case a virtual CU or PS is used.

#### API
* Central component containing all buisness logic
  * handles user authentification, registration
  * experiment queueing and priority,
  * controls which devices are connected to each other
  * keeps all persistent records of any kind
* Provides link to external systems, possible using dedicated system adapters

#### Hardware Units
* Provide the access to the physical hardware

#### Devices (Webapplication and Hardware Units)
* Provide specific experiment services (like sensors / actuators, webcam image etc.)
  * register and authenticate with the API
  * connect to each other under the control of the device connection services to provide these during an experiment

#### Device Connection Services
* Controls all connected Devices and helps them to connect to each other either directly, or act as a relay for them
* In special case also transcodes the transmitted video / audio.

### Important Interfaces::
1. **RESTful over HTTP**: TODO
2. **RESTful over HTTP**: TODO
3. **Request / Response over Websockets**: TODO
4. **WebRTC**: WebRTC is used for its ability for peer to peer connections and support in browsers. Possibly this interface is additionaly used between the Devices and Device Connection Services, in case these act as a relay.
5. **Bidirectional RESTful over HTTP**: TODO

## Level 2



### Device Connection Services
![](/assets/images/DeviceConnectionServices.drawio.png)


# Runtime View



## Experiment Lifecycle

![](/assets/images/runtimeExperimentLifecycle.drawio.png)

The Experiment Lifecycle begins with creating an experiment on thee API. In this initial State all the devices that the experiment is composed of need to be added to the experiment. When the experiment is started all the necessary connections between the devices should be established. And when this is done the experiment is essentially running. In all states Users can be added or removed from the experiment. In case the experiment fails to start up or looses its connection to any experiment device it will be terminated.

### Configuring an Experiment
![](/assets/images/runtimeExperimentConfiguration.drawio.png)

The Webapplication can at any time register a new Experiment. As soon as this is done it can retrieve tokens from the API to authorize devices for this Experiment. These are only needed, if the Experiment uses devices created on the fly (i.e. they are not registrated in the API like the real PS or CU). With this token a client can connect to the Coordinator. As the token will also contain a unique identifier for this device the Webapplication can configure the experiment to use this device at the same time that the device register with the Coordinator (they do not depend on each other)

### Starting an Experiment
![](/assets/images/runtimeExperiment.drawio.png)

When an experiment starts the webapplication will call the API with the preconfigured experiment. The API will then do the *Connection Planning* and send it to the Coordinator. The Coordinator will then establish the device connections. Do be sucessful all devices need to be connected to the Coordinator at this point. The devices are then able to use the Coordinator as a relay for their signaling and establish their connecting. Once the all Devices report that their connections are established. The Coordinator will return the Call from the API.

### Connecting a User

![](/assets/images/runtimeExperimentAddUser.drawio.png)

When a user wants to connet to an Experiment he first needs to obtain a authorization token form the API. With this he can connect to the Coordinator. Once connected the experiment configuration needs to be changed to include the user identifier used to connect to the coordinator. Depending on wheter the experiment is already started, the API will then instruct the coordinator to establish the new connections.

# Cross-cutting Concepts

## Controlling and Observing Users

When considering an Experiment (this does not include system users in general) there are only two types of users. Controlling users have the ability to interact with the experiment, while observing can only observe. Controlling users are a subclass of observing users, meaning that everything that a observer can see about the experiment is also avaiable for the controlling user.

![Controller is a subclass of Observer](/assets/images/controlObserveUser.drawio.png)

## Experiment

The main object of concern for this System is the experiment that is executed.
An experiment in this context is defined as a collection of _devices_ and connections between those.
Each connection, has a specific service (identified by a string) as well as exactly one provider and at least one consumer device. The dataflow of each connection is unidirectional, which ensures that there is no conflict with multiple cunsumer devices.
The experiment has essential two (or three if you consider Observing Users and Controlling Users seperatly) device collections: The experiment devices and the user devices. Experiment devices must all be connected for an experiment to exist and can not be changed during runtime. User devices can be added or removed during the runtime.

![Example Experiment Definition](/assets/images/experimentDefinition.drawio.png)

> **IMPORTANT:** This is neiter the public interface that is exposed to external users nor a internal representation. It is conceptual representation of what an Experiment is. There are other propeties (e.g. state, security stuff) that need do be considered. Also WebRTC cant handle point to multipoint connections.

> **Note:**
> The current use case of a single PS and CU with one ECP will map to these services / connections:
> 
> | Service     | Provider     | Consumer       |
> |:------------|:-------------|:---------------|
> | Webcam      | PS           | _Observer_     |
> | Actuators   | CU           | PS, _Observer_ |
> | Sensors     | PS           | CU, _Observer_ |
> | UserSensors | _Controller_ | CU, _Observer_ |