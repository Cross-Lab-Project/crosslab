# CrossLab

This Repository contains all services to provide an CrossLab-Instance. A typescript and python client for interacting with the instance are provided.

## Usage
To Deploy a working instance the different services need to be configured and started. As a starting point you can use the docker compose setup provided in [deployment/production/core](deployment/production/core).

This setup includes an `.env`` file, in which the secrets for the deployment needs to be supplied, and simple configurations can be made.
The config directory in the setup contains the sql init script to initialize the mariadb container, which is used as a central data storage by all services.

So to start:
1. copy all setup files
2. complete the `.env` file
3. run `docker compose up -d`

After this the Crosslab-API should be available under `http://localhost:8080` and the LTI-Service should be available at `http://localhost:8081`

## Publishing

run `./scripts/ci.sh --download-release`

Create `$HOME/.pypirc` with the following content:
```
[pypi]
    username: XXXXXX
    password: xxxxxxxxxxxxxxxx
```

npm adduser

run `./scripts/publish.sh --latest`