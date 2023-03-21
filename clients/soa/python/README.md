[//]: # ({{print badges}})

|     | build | lint | test |
| --- | --- | --- | --- |
| /workspaces/crosslab/clients/soa/python |   |  |  |

[//]: # ({{end}})
# Python SOA Client

## Dependency Graph
[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph /workspaces/crosslab/clients/api/python
    clients/api/python:build[build]
  end
  subgraph /workspaces/crosslab/clients/soa/python
    clients/soa/python:build[build]
    clients/soa/python:lint[lint]
    clients/soa/python:test[test]
  end
  subgraph /workspaces/crosslab/helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
  end
  subgraph /workspaces/crosslab/services/auth
    services/auth:build-spec[build-spec]
  end
  subgraph /workspaces/crosslab/services/booking
    services/booking:build-spec[build-spec]
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
  subgraph /workspaces/crosslab/services/openapi
    services/openapi:build[build]
  end
  subgraph /workspaces/crosslab/services/update
    services/update:build-spec[build-spec]
  end
  services/openapi:build[build] --> clients/api/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/api/python:build[build]
  services/openapi:build[build] --> clients/soa/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/soa/python:build[build]
  clients/api/python:build[build] --> clients/soa/python:build[build]
  clients/soa/python:build[build] --> clients/soa/python:lint[lint]
  clients/soa/python:build[build] --> clients/soa/python:test[test]
  services/auth:build-spec[build-spec] --> services/openapi:build[build]
  services/booking:build-spec[build-spec] --> services/openapi:build[build]
  services/device:build-spec[build-spec] --> services/openapi:build[build]
  services/experiment:build-spec[build-spec] --> services/openapi:build[build]
  services/federation:build-spec[build-spec] --> services/openapi:build[build]
  services/update:build-spec[build-spec] --> services/openapi:build[build]
```
[//]: # ({{end}})
