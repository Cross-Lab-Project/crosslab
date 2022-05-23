---
layout: page
title: Backend
---
# Microservice Architecture
![](/assets/images/microservices.drawio.svg)

The Backend is organised as a Microservice Architecture with an API-Gateway to offload Authentication to a dedicated service. When a client connects to the backend, it will first be authenticated by the user service, which will issue a JWT for the request. The API will then call the relevant microservice and supplies the signed JWT, so that the microservice can authorize the client and fullfill the request.

The individual Services might communicate directly to each other, however as soon as a federated service needs to be called the request must be made through the Federation Service, as this service will hold authenrification details for cooperating institutions.

## Authentification
The User authentification is an implementation detail that might vary from institution to institution. However to enable the federated architecture each instance is obligated to offer non-expiring access tokens for use in institution to institution communication.