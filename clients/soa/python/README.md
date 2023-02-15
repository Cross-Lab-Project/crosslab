[//]: # ({{print badges}})

|     | build | lint | test |
| --- | --- | --- | --- |
| clients/soa/python |  [![build](https://ci.goldi-labs.de/crosslab/publishingscripts/clients/soa/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/clients/soa/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/publishingscripts/clients/soa/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/clients/soa/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/publishingscripts/clients/soa/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/publishingscripts/clients/soa/python/dist/test.log) |

[//]: # ({{end}})
# Python SOA Client

## Dependency Graph
[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph clients/api/python
    clients/api/python:build[build]
  end
  subgraph clients/soa/python
    clients/soa/python:build[build]
    clients/soa/python:lint[lint]
    clients/soa/python:test[test]
  end
  subgraph helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
  end
  subgraph services/auth
    services/auth:build-spec[build-spec]
  end
  subgraph services/booking
    services/booking:build-spec[build-spec]
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
  subgraph services/openapi
    services/openapi:build[build]
  end
  subgraph services/update
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
