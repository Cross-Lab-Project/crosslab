[//]: # ({{print badges}})

|     | build-spec | build | lint | lint-spec | build-docker |
| --- | --- | --- | --- | --- | --- |
| services/auth |  [![build-spec](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/build.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/lint.log) | [![lint-spec](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/lint-spec.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/services/auth/dist/build-docker.log) |

[//]: # ({{end}})
# Authentication Service

## Dependency Graph
[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph clients/api/js
    clients/api/js:build[build]
  end
  subgraph helper/crosslab-typescript-addon
    helper/crosslab-typescript-addon:build[build]
  end
  subgraph helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
  end
  subgraph helper/tsdoc-theme
    helper/tsdoc-theme:build[build]
  end
  subgraph services/auth
    services/auth:build[build]
    services/auth:build-docker[build-docker]
    services/auth:build-spec[build-spec]
    services/auth:lint[lint]
    services/auth:lint-spec[lint-spec]
  end
  subgraph services/booking
    services/booking:build-spec[build-spec]
  end
  subgraph services/common
    services/common:build[build]
  end
  subgraph services/device
    services/device:build-spec[build-spec]
  end
  subgraph services/experiment
    services/experiment:build-spec[build-spec]
  end
  subgraph services/federation
    services/federation:build-spec[build-spec]
  end
  subgraph services/update
    services/update:build-spec[build-spec]
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
  helper/openapi-codegeneration:build[build] --> helper/crosslab-typescript-addon:build[build]
  services/auth:build-spec[build-spec] --> services/auth:build[build]
  services/common:build[build] --> services/auth:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/auth:build[build]
  helper/openapi-codegeneration:build[build] --> services/auth:build[build]
  clients/api/js:build[build] --> services/auth:build[build]
  services/auth:build[build] --> services/auth:build-docker[build-docker]
  services/auth:build[build] --> services/auth:lint[lint]
  services/auth:build-spec[build-spec] --> services/auth:lint-spec[lint-spec]
```
[//]: # ({{end}})
