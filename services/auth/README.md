[//]: # ({{print badges}})

|     | build-spec | build | lint | lint-spec | build-docker |
| --- | --- | --- | --- | --- | --- |
| /workspaces/crosslab/services/auth |   |  |  |  |  |

[//]: # ({{end}})
# Authentication Service

## Dependency Graph
[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph /workspaces/crosslab/clients/api/js
    clients/api/js:build[build]
  end
  subgraph /workspaces/crosslab/helper/crosslab-typescript-addon
    helper/crosslab-typescript-addon:build[build]
  end
  subgraph /workspaces/crosslab/helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
  end
  subgraph /workspaces/crosslab/helper/tsdoc-theme
    helper/tsdoc-theme:build[build]
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
  end
  subgraph /workspaces/crosslab/services/common
    services/common:build[build]
  end
  subgraph /workspaces/crosslab/services/device
    services/device:build-spec[build-spec]
  end
  subgraph /workspaces/crosslab/services/experiment
    services/experiment:build-spec[build-spec]
  end
  subgraph /workspaces/crosslab/services/federation
    services/federation:build-spec[build-spec]
  end
  subgraph /workspaces/crosslab/services/update
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
