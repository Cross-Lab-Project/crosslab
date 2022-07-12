# OpenAPI-Codegeneration

The package openapi-codegeneration can be used to generate server-side typescript code from an openapi-specification.

## Generated Files

```
generated
├── index.ts
├── routes
│   ├── route_0.ts
│   ├── route_1.ts
│   ├── ...
│   └── route_n.ts
├── operations_templates
│   ├── operations_0.ts
│   ├── operations_1.ts
│   ├── ...
│   └── operations_n.ts
├── types.ts
└── validation
    ├── validation_0.ts
    ├── validation_1.ts
    ├── ...
    ├── validation_n.ts
    └── validation.mjs
```

The file **index.ts** exports the express application. The generated type declarations are available in **types.ts**. The folder **routes** contains the routers for the different endpoints of the api, each in their corresponding file. For each route there will also be a template in **operations_templates** containing stubs of the functions that need to be implemented for the given route. Validation functions are also generated for each route's body, parameters and responses. These can be found in the **validation** folder along with the file **validation.mjs** which contains the validation functions for all schemas contained in the openapi-specification.

## Project Structure / Using the generated Files

```
src
├── generated
│   └── ...
├── index.ts
├── security.ts
├── operations
│   ├── operations_0.ts
│   ├── operations_1.ts
│   ├── ...
│   └── operations_n.ts
└── ...
```

In order to use the generated code the missing implementation of the functions contained in the files of the **operations_templates** folder must be added. For this one should create a folder **operations** which contains the corresponding files (e.g. copying and filling out the templates). Furthermore a file **security.ts** must be added which has to contain the implementation of the function **checkJWT()**. Finally the project should then contain an **index.ts** file which handles its execution.

## Dependencies

The following dependencies are needed to work with the generated code:

```
"devDependencies": {
    "typescript": "^4.7.3",
    "@types/node": "^17.0.41",
    "@types/express": "^4.17.13",
    "@types/body-parser": "^1.19.2"
},
"dependencies": {
    "express": "^4.18.1",
    "body-parser": "^1.20.0"
}
```