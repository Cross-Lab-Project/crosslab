
# CI Status

The following table shows the status for all jobs in this repository.

> **Important** The README.md must be updated whenever the branch is switched.
> This can be done by running `scripts/housekeeping.sh`. For your convenience
> this script can be run as pre-commit hook. Run `scripts/install-hooks.sh` to
> install the hook.

[//]: # ({{print badges}})

|     | build-spec | build | lint | test | lint-spec | build-docker |
| --- | --- | --- | --- | --- | --- | --- |
| /workspaces/crosslab/helper/development-container |   |  |  |  |  |  |
| /workspaces/crosslab/helper/tsdoc-theme |   |  |  |  |  |  |
| /workspaces/crosslab/helper/openapi-codegeneration |   |  |  |  |  |  |
| /workspaces/crosslab/helper/crosslab-typescript-addon |   |  |  |  |  |  |
| /workspaces/crosslab/helper/dummy-device/js |   |  |  |  |  |  |
| /workspaces/crosslab/helper/dummy-device/python |   |  |  |  |  |  |
| /workspaces/crosslab/services/common |   |  |  |  |  |  |
| /workspaces/crosslab/services/auth |   |  |  |  |  |  |
| /workspaces/crosslab/services/booking |   |  |  |  |  |  |
| /workspaces/crosslab/services/device |   |  |  |  |  |  |
| /workspaces/crosslab/services/experiment |   |  |  |  |  |  |
| /workspaces/crosslab/services/federation |   |  |  |  |  |  |
| /workspaces/crosslab/services/update |   |  |  |  |  |  |
| /workspaces/crosslab/services/openapi |   |  |  |  |  |  |
| /workspaces/crosslab/services/gateway |   |  |  |  |  |  |
| /workspaces/crosslab/clients/api/js |   |  |  |  |  |  |
| /workspaces/crosslab/clients/api/python |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa/python |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa/js |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/electricalConnection/python |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/electricalConnection/js |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/webcam/python |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/webcam/js |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/file/python |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/file/js |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/message/python |   |  |  |  |  |  |
| /workspaces/crosslab/clients/soa_services/message/js |   |  |  |  |  |  |
| /workspaces/crosslab/integration-test |   |  |  |  |  |  |

[//]: # ({{end}})




[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph /workspaces/crosslab/clients/api/js
    clients/api/js:build[build]
    clients/api/js:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/api/python
    clients/api/python:build[build]
    clients/api/python:lint[lint]
    clients/api/python:test[test]
  end
  subgraph /workspaces/crosslab/clients/soa/js
    clients/soa/js:build[build]
    clients/soa/js:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa/python
    clients/soa/python:build[build]
    clients/soa/python:lint[lint]
    clients/soa/python:test[test]
  end
  subgraph /workspaces/crosslab/clients/soa_services/electricalConnection/js
    clients/soa_services/electricalConnection/js:build[build]
    clients/soa_services/electricalConnection/js:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa_services/electricalConnection/python
    clients/soa_services/electricalConnection/python:build[build]
    clients/soa_services/electricalConnection/python:lint[lint]
    clients/soa_services/electricalConnection/python:test[test]
  end
  subgraph /workspaces/crosslab/clients/soa_services/file/js
    clients/soa_services/file/js:build[build]
    clients/soa_services/file/js:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa_services/file/python
    clients/soa_services/file/python:build[build]
    clients/soa_services/file/python:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa_services/message/js
    clients/soa_services/message/js:build[build]
    clients/soa_services/message/js:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa_services/message/python
    clients/soa_services/message/python:build[build]
    clients/soa_services/message/python:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa_services/webcam/js
    clients/soa_services/webcam/js:build[build]
    clients/soa_services/webcam/js:lint[lint]
  end
  subgraph /workspaces/crosslab/clients/soa_services/webcam/python
    clients/soa_services/webcam/python:build[build]
    clients/soa_services/webcam/python:lint[lint]
  end
  subgraph /workspaces/crosslab/helper/crosslab-typescript-addon
    helper/crosslab-typescript-addon:build[build]
    helper/crosslab-typescript-addon:lint[lint]
  end
  subgraph /workspaces/crosslab/helper/development-container
    helper/development-container:build[build]
  end
  subgraph /workspaces/crosslab/helper/dummy-device/js
    helper/dummy-device/js:build[build]
    helper/dummy-device/js:lint[lint]
  end
  subgraph /workspaces/crosslab/helper/dummy-device/python
    helper/dummy-device/python:build[build]
    helper/dummy-device/python:lint[lint]
  end
  subgraph /workspaces/crosslab/helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
    helper/openapi-codegeneration:lint[lint]
  end
  subgraph /workspaces/crosslab/helper/tsdoc-theme
    helper/tsdoc-theme:build[build]
    helper/tsdoc-theme:lint[lint]
  end
  subgraph /workspaces/crosslab/integration-test
    integration-test:lint[lint]
    integration-test:test[test]
  end
  subgraph /workspaces/crosslab/services/auth
    services/auth:build[build]
    services/auth:build-docker[build-docker]
    services/auth:build-spec[build-spec]
    services/auth:lint[lint]
    services/auth:lint-spec[lint-spec]
  end
  subgraph /workspaces/crosslab/services/booking
    services/booking:build-spec[build-spec]
    services/booking:lint-spec[lint-spec]
  end
  subgraph /workspaces/crosslab/services/common
    services/common:build[build]
    services/common:lint[lint]
  end
  subgraph /workspaces/crosslab/services/device
    services/device:build[build]
    services/device:build-docker[build-docker]
    services/device:build-spec[build-spec]
    services/device:lint-spec[lint-spec]
  end
  subgraph /workspaces/crosslab/services/experiment
    services/experiment:build[build]
    services/experiment:build-docker[build-docker]
    services/experiment:build-spec[build-spec]
    services/experiment:lint[lint]
    services/experiment:lint-spec[lint-spec]
  end
  subgraph /workspaces/crosslab/services/federation
    services/federation:build[build]
    services/federation:build-docker[build-docker]
    services/federation:build-spec[build-spec]
    services/federation:lint-spec[lint-spec]
  end
  subgraph /workspaces/crosslab/services/gateway
    services/gateway:build[build]
    services/gateway:build-docker[build-docker]
  end
  subgraph /workspaces/crosslab/services/openapi
    services/openapi:build[build]
    services/openapi:lint[lint]
  end
  subgraph /workspaces/crosslab/services/update
    services/update:build[build]
    services/update:build-docker[build-docker]
    services/update:build-spec[build-spec]
    services/update:lint-spec[lint-spec]
  end
  services/auth:build-spec[build-spec] --> clients/api/js:build[build]
  services/booking:build-spec[build-spec] --> clients/api/js:build[build]
  services/device:build-spec[build-spec] --> clients/api/js:build[build]
  services/experiment:build-spec[build-spec] --> clients/api/js:build[build]
  services/federation:build-spec[build-spec] --> clients/api/js:build[build]
  services/update:build-spec[build-spec] --> clients/api/js:build[build]
  helper/crosslab-typescript-addon:build[build] --> clients/api/js:build[build]
  helper/tsdoc-theme:build[build] --> clients/api/js:build[build]
  helper/openapi-codegeneration:build[build] --> clients/api/js:build[build]
  clients/api/js:build[build] --> clients/api/js:lint[lint]
  services/openapi:build[build] --> clients/api/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/api/python:build[build]
  clients/api/python:build[build] --> clients/api/python:lint[lint]
  clients/api/python:build[build] --> clients/api/python:test[test]
  clients/soa/js:build[build] --> clients/soa/js:lint[lint]
  services/openapi:build[build] --> clients/soa/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/soa/python:build[build]
  clients/api/python:build[build] --> clients/soa/python:build[build]
  clients/soa/python:build[build] --> clients/soa/python:lint[lint]
  clients/soa/python:build[build] --> clients/soa/python:test[test]
  clients/soa/js:build[build] --> clients/soa_services/electricalConnection/js:build[build]
  clients/soa_services/electricalConnection/js:build[build] --> clients/soa_services/electricalConnection/js:lint[lint]
  helper/openapi-codegeneration:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/api/python:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/soa_services/electricalConnection/python:build[build] --> clients/soa_services/electricalConnection/python:lint[lint]
  clients/soa_services/electricalConnection/python:build[build] --> clients/soa_services/electricalConnection/python:test[test]
  clients/soa/js:build[build] --> clients/soa_services/file/js:build[build]
  clients/soa_services/file/js:build[build] --> clients/soa_services/file/js:lint[lint]
  clients/api/python:build[build] --> clients/soa_services/file/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/file/python:build[build]
  clients/soa_services/file/python:build[build] --> clients/soa_services/file/python:lint[lint]
  clients/soa/js:build[build] --> clients/soa_services/message/js:build[build]
  clients/soa_services/message/js:build[build] --> clients/soa_services/message/js:lint[lint]
  clients/api/python:build[build] --> clients/soa_services/message/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/message/python:build[build]
  clients/soa_services/message/python:build[build] --> clients/soa_services/message/python:lint[lint]
  clients/soa/js:build[build] --> clients/soa_services/webcam/js:build[build]
  clients/soa_services/webcam/js:build[build] --> clients/soa_services/webcam/js:lint[lint]
  clients/api/python:build[build] --> clients/soa_services/webcam/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/webcam/python:build[build]
  clients/soa_services/webcam/python:build[build] --> clients/soa_services/webcam/python:lint[lint]
  helper/openapi-codegeneration:build[build] --> helper/crosslab-typescript-addon:build[build]
  helper/crosslab-typescript-addon:build[build] --> helper/crosslab-typescript-addon:lint[lint]
  clients/api/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa_services/electricalConnection/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa_services/file/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa_services/webcam/js:build[build] --> helper/dummy-device/js:build[build]
  helper/dummy-device/js:build[build] --> helper/dummy-device/js:lint[lint]
  clients/api/python:build[build] --> helper/dummy-device/python:build[build]
  clients/soa/python:build[build] --> helper/dummy-device/python:build[build]
  clients/soa_services/electricalConnection/python:build[build] --> helper/dummy-device/python:build[build]
  helper/dummy-device/python:build[build] --> helper/dummy-device/python:lint[lint]
  helper/openapi-codegeneration:build[build] --> helper/openapi-codegeneration:lint[lint]
  helper/tsdoc-theme:build[build] --> helper/tsdoc-theme:lint[lint]
  integration-test:test[test] --> integration-test:lint[lint]
  services/common:build[build] --> integration-test:test[test]
  services/auth:build[build] --> integration-test:test[test]
  services/device:build[build] --> integration-test:test[test]
  services/experiment:build[build] --> integration-test:test[test]
  services/federation:build[build] --> integration-test:test[test]
  clients/api/js:build[build] --> integration-test:test[test]
  clients/soa/js:build[build] --> integration-test:test[test]
  clients/soa_services/electricalConnection/js:build[build] --> integration-test:test[test]
  helper/dummy-device/js:build[build] --> integration-test:test[test]
  helper/dummy-device/python:build[build] --> integration-test:test[test]
  services/auth:build-spec[build-spec] --> services/auth:build[build]
  services/common:build[build] --> services/auth:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/auth:build[build]
  helper/openapi-codegeneration:build[build] --> services/auth:build[build]
  clients/api/js:build[build] --> services/auth:build[build]
  services/auth:build[build] --> services/auth:build-docker[build-docker]
  services/auth:build[build] --> services/auth:lint[lint]
  services/auth:build-spec[build-spec] --> services/auth:lint-spec[lint-spec]
  services/booking:build-spec[build-spec] --> services/booking:lint-spec[lint-spec]
  services/common:build[build] --> services/common:lint[lint]
  services/device:build-spec[build-spec] --> services/device:build[build]
  services/common:build[build] --> services/device:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/device:build[build]
  helper/openapi-codegeneration:build[build] --> services/device:build[build]
  clients/api/js:build[build] --> services/device:build[build]
  services/device:build[build] --> services/device:build-docker[build-docker]
  services/device:build-spec[build-spec] --> services/device:lint-spec[lint-spec]
  services/experiment:build-spec[build-spec] --> services/experiment:build[build]
  services/common:build[build] --> services/experiment:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/experiment:build[build]
  helper/openapi-codegeneration:build[build] --> services/experiment:build[build]
  clients/api/js:build[build] --> services/experiment:build[build]
  services/experiment:build[build] --> services/experiment:build-docker[build-docker]
  services/experiment:build[build] --> services/experiment:lint[lint]
  services/experiment:build-spec[build-spec] --> services/experiment:lint-spec[lint-spec]
  services/federation:build-spec[build-spec] --> services/federation:build[build]
  services/common:build[build] --> services/federation:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/federation:build[build]
  helper/openapi-codegeneration:build[build] --> services/federation:build[build]
  clients/api/js:build[build] --> services/federation:build[build]
  services/federation:build[build] --> services/federation:build-docker[build-docker]
  services/federation:build-spec[build-spec] --> services/federation:lint-spec[lint-spec]
  services/gateway:build[build] --> services/gateway:build-docker[build-docker]
  services/auth:build-spec[build-spec] --> services/openapi:build[build]
  services/booking:build-spec[build-spec] --> services/openapi:build[build]
  services/device:build-spec[build-spec] --> services/openapi:build[build]
  services/experiment:build-spec[build-spec] --> services/openapi:build[build]
  services/federation:build-spec[build-spec] --> services/openapi:build[build]
  services/update:build-spec[build-spec] --> services/openapi:build[build]
  services/openapi:build[build] --> services/openapi:lint[lint]
  services/update:build-spec[build-spec] --> services/update:build[build]
  services/common:build[build] --> services/update:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/update:build[build]
  helper/openapi-codegeneration:build[build] --> services/update:build[build]
  clients/api/js:build[build] --> services/update:build[build]
  services/update:build[build] --> services/update:build-docker[build-docker]
  services/update:build-spec[build-spec] --> services/update:lint-spec[lint-spec]
```
[//]: # ({{end}})


## Publishing

run `./scripts/ci.sh --release`

Create `$HOME/.pypirc` with the following content:
```
[pypi]
    username: XXXXXX
    password: xxxxxxxxxxxxxxxx
```

run `./scripts/publish.sh --latest`