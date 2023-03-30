[//]: # ({{print badges}})

|     | build-spec | lint-spec | build | lint | build-docker |
| --- | --- | --- | --- | --- | --- |
| services/auth |  [![build-spec](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build-spec.log) | [![lint-spec](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/lint-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/lint.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/main/services/auth/dist/build-docker.log) |

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
clients/api/js --> services/auth:build[build]
helper/crosslab-typescript-addon --> clients/api/js
helper/crosslab-typescript-addon --> services/auth:build[build]
helper/openapi-codegeneration --> clients/api/js
helper/openapi-codegeneration --> helper/crosslab-typescript-addon
helper/openapi-codegeneration --> services/auth:build[build]
helper/tsdoc-theme --> clients/api/js
services/auth:build[build] --> services/auth:build-docker[build-docker]
services/auth:build[build] --> services/auth:lint[lint]
services/auth:build-spec[build-spec] --> clients/api/js
services/auth:build-spec[build-spec] --> services/auth:build[build]
services/auth:build-spec[build-spec] --> services/auth:lint-spec[lint-spec]
services/booking --> clients/api/js
services/common --> services/auth:build[build]
services/device --> clients/api/js
services/experiment --> clients/api/js
services/federation --> clients/api/js
services/update --> clients/api/js
```
[//]: # ({{end}})
