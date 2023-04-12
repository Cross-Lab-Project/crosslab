[//]: # ({{print badges}})

|     | build | lint | test |
| --- | --- | --- | --- |
| clients/soa/python |  [![build](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/main/clients/soa/python/dist/test.log) |

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
  subgraph helper/python-test-helper
    helper/python-test-helper:build[build]
    helper/python-test-helper:test[test]
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
clients/api/python --> clients/soa/python:build[build]
clients/soa/python:build[build] --> clients/soa/python:lint[lint]
clients/soa/python:build[build] --> clients/soa/python:test[test]
helper/openapi-codegeneration --> clients/api/python
helper/openapi-codegeneration --> clients/soa/python:build[build]
helper/python-test-helper --> clients/soa/python:test[test]
services/auth --> services/openapi
services/booking --> services/openapi
services/device --> services/openapi
services/experiment --> services/openapi
services/federation --> services/openapi
services/openapi --> clients/api/python
services/openapi --> clients/soa/python:build[build]
services/update --> services/openapi
```
[//]: # ({{end}})
