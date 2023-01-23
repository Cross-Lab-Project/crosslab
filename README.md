
# CI Status

The following table shows the status for all jobs in this repository.

> **Important** The README.md must be updated whenever the branch is switched.
> This can be done by running `scripts/housekeeping.sh`. For your convenience
> this script can be run as pre-commit hook. Run `scripts/install-hooks.sh` to
> install the hook.

[//]: # ({{print badges}})

|     | build-spec | build | lint | test |
| --- | --- | --- | --- | --- |
| helper/development-container |   | [![build](https://ci.goldi-labs.de/crosslab/main/helper/development-container/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/helper/development-container/dist/build.log) |  |  |
| helper/tsdoc-theme |   | [![build](https://ci.goldi-labs.de/crosslab/main/helper/tsdoc-theme/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/helper/tsdoc-theme/dist/build.log) |  |  |
| helper/openapi-codegeneration |   | [![build](https://ci.goldi-labs.de/crosslab/main/helper/openapi-codegeneration/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/helper/openapi-codegeneration/dist/build.log) |  |  |
| helper/crosslab-typescript-addon |   | [![build](https://ci.goldi-labs.de/crosslab/main/helper/crosslab-typescript-addon/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/helper/crosslab-typescript-addon/dist/build.log) |  |  |
| services/common |   | [![build](https://ci.goldi-labs.de/crosslab/main/services/common/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/common/dist/build.log) |  |  |
| services/auth |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/lint.log) |  |
| services/booking |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/booking/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/booking/dist/build-spec.log) |  | [![lint](https://ci.goldi-labs.de/crosslab/main/services/booking/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/booking/dist/lint.log) |  |
| services/device |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/device/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/device/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/main/services/device/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/device/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/services/device/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/device/dist/lint.log) |  |
| services/experiment |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/experiment/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/experiment/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/main/services/experiment/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/experiment/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/services/experiment/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/experiment/dist/lint.log) |  |
| services/federation |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/federation/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/federation/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/main/services/federation/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/federation/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/services/federation/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/federation/dist/lint.log) |  |
| services/update |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/update/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/update/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/main/services/update/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/update/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/services/update/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/update/dist/lint.log) |  |
| services/openapi |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/openapi/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/openapi/dist/build-spec.log) |  | [![lint](https://ci.goldi-labs.de/crosslab/main/services/openapi/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/openapi/dist/lint.log) |  |
| services/gateway |   | [![build](https://ci.goldi-labs.de/crosslab/main/services/gateway/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/gateway/dist/build.log) |  |  |
| clients/api/js |   | [![build](https://ci.goldi-labs.de/crosslab/main/clients/api/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/clients/api/js/dist/build.log) |  |  |
| clients/api/python |   | [![build](https://ci.goldi-labs.de/crosslab/main/clients/api/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/clients/api/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/clients/api/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/clients/api/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/main/clients/api/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/main/clients/api/python/dist/test.log) |
| clients/soa/python |   | [![build](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/test.log) |
| clients/soa_services/electricalConnection/python |   | [![build](https://ci.goldi-labs.de/crosslab/main/clients/soa_services/electricalConnection/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa_services/electricalConnection/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/clients/soa_services/electricalConnection/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa_services/electricalConnection/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/main/clients/soa_services/electricalConnection/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa_services/electricalConnection/python/dist/test.log) |

[//]: # ({{end}})




[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph clients/api/js
    clients/api/js:build[build]
  end
  subgraph clients/api/python
    clients/api/python:build[build]
    clients/api/python:lint[lint]
    clients/api/python:test[test]
  end
  subgraph clients/soa/python
    clients/soa/python:build[build]
    clients/soa/python:lint[lint]
    clients/soa/python:test[test]
  end
  subgraph clients/soa_services/electricalConnection/python
    clients/soa_services/electricalConnection/python:build[build]
    clients/soa_services/electricalConnection/python:lint[lint]
    clients/soa_services/electricalConnection/python:test[test]
  end
  subgraph helper/crosslab-typescript-addon
    helper/crosslab-typescript-addon:build[build]
  end
  subgraph helper/development-container
    helper/development-container:build[build]
  end
  subgraph helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
  end
  subgraph helper/tsdoc-theme
    helper/tsdoc-theme:build[build]
  end
  subgraph services/auth
    services/auth:build[build]
    services/auth:build-spec[build-spec]
    services/auth:lint[lint]
  end
  subgraph services/booking
    services/booking:build-spec[build-spec]
    services/booking:lint[lint]
  end
  subgraph services/common
    services/common:build[build]
  end
  subgraph services/device
    services/device:build[build]
    services/device:build-spec[build-spec]
    services/device:lint[lint]
  end
  subgraph services/experiment
    services/experiment:build[build]
    services/experiment:build-spec[build-spec]
    services/experiment:lint[lint]
  end
  subgraph services/federation
    services/federation:build[build]
    services/federation:build-spec[build-spec]
    services/federation:lint[lint]
  end
  subgraph services/gateway
    services/gateway:build[build]
  end
  subgraph services/openapi
    services/openapi:build-spec[build-spec]
    services/openapi:lint[lint]
  end
  subgraph services/update
    services/update:build[build]
    services/update:build-spec[build-spec]
    services/update:lint[lint]
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
  services/openapi:build-spec[build-spec] --> clients/api/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/api/python:build[build]
  clients/api/python:build[build] --> clients/api/python:lint[lint]
  clients/api/python:build[build] --> clients/api/python:test[test]
  services/openapi:build-spec[build-spec] --> clients/soa/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/soa/python:build[build]
  clients/api/python:build[build] --> clients/soa/python:build[build]
  clients/soa/python:build[build] --> clients/soa/python:lint[lint]
  clients/soa/python:build[build] --> clients/soa/python:test[test]
  helper/openapi-codegeneration:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/api/python:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/soa_services/electricalConnection/python:build[build] --> clients/soa_services/electricalConnection/python:lint[lint]
  clients/soa_services/electricalConnection/python:build[build] --> clients/soa_services/electricalConnection/python:test[test]
  helper/openapi-codegeneration:build[build] --> helper/crosslab-typescript-addon:build[build]
  services/auth:build-spec[build-spec] --> services/auth:build[build]
  services/common:build[build] --> services/auth:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/auth:build[build]
  helper/openapi-codegeneration:build[build] --> services/auth:build[build]
  clients/api/js:build[build] --> services/auth:build[build]
  services/auth:build-spec[build-spec] --> services/auth:lint[lint]
  services/booking:build-spec[build-spec] --> services/booking:lint[lint]
  services/device:build-spec[build-spec] --> services/device:build[build]
  services/common:build[build] --> services/device:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/device:build[build]
  helper/openapi-codegeneration:build[build] --> services/device:build[build]
  clients/api/js:build[build] --> services/device:build[build]
  services/device:build-spec[build-spec] --> services/device:lint[lint]
  services/experiment:build-spec[build-spec] --> services/experiment:build[build]
  services/common:build[build] --> services/experiment:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/experiment:build[build]
  helper/openapi-codegeneration:build[build] --> services/experiment:build[build]
  clients/api/js:build[build] --> services/experiment:build[build]
  services/experiment:build-spec[build-spec] --> services/experiment:lint[lint]
  services/federation:build-spec[build-spec] --> services/federation:build[build]
  services/common:build[build] --> services/federation:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/federation:build[build]
  helper/openapi-codegeneration:build[build] --> services/federation:build[build]
  clients/api/js:build[build] --> services/federation:build[build]
  services/federation:build-spec[build-spec] --> services/federation:lint[lint]
  services/auth:build-spec[build-spec] --> services/openapi:build-spec[build-spec]
  services/booking:build-spec[build-spec] --> services/openapi:build-spec[build-spec]
  services/device:build-spec[build-spec] --> services/openapi:build-spec[build-spec]
  services/experiment:build-spec[build-spec] --> services/openapi:build-spec[build-spec]
  services/federation:build-spec[build-spec] --> services/openapi:build-spec[build-spec]
  services/update:build-spec[build-spec] --> services/openapi:build-spec[build-spec]
  services/openapi:build-spec[build-spec] --> services/openapi:lint[lint]
  services/update:build-spec[build-spec] --> services/update:build[build]
  services/common:build[build] --> services/update:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/update:build[build]
  helper/openapi-codegeneration:build[build] --> services/update:build[build]
  clients/api/js:build[build] --> services/update:build[build]
  services/update:build-spec[build-spec] --> services/update:lint[lint]
```
[//]: # ({{end}})
