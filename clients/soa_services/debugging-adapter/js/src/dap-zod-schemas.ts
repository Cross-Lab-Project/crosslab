import { z } from 'zod';

import { DebugAdapterProtocol } from './dap-types';

const protocolMessageSchema = z.object({
  seq: z.number(),
  type: z.union([
    z.literal('request'),
    z.literal('response'),
    z.literal('event'),
    z.string(),
  ]),
});

const requestSchema = protocolMessageSchema.extend({
  command: z.string(),
  arguments: z.any().optional(),
});

const eventSchema = protocolMessageSchema.extend({
  event: z.string(),
  body: z.any().optional(),
});

const responseSchema = protocolMessageSchema.extend({
  request_seq: z.number(),
  success: z.boolean(),
  command: z.string(),
  message: z
    .union([z.literal('cancelled'), z.literal('notStopped'), z.string()])
    .optional(),
  body: z.any().optional(),
});

const cancelArgumentsSchema = z.object({
  requestId: z.number().optional(),
  progressId: z.string().optional(),
});

const cancelResponseSchema = responseSchema;

const initializedEventSchema = eventSchema.extend({
  event: z.literal('initialized'),
});

const stoppedEventSchema = eventSchema.extend({
  event: z.literal('stopped'),
  body: z.object({
    reason: z.union([
      z.literal('step'),
      z.literal('breakpoint'),
      z.literal('exception'),
      z.literal('pause'),
      z.literal('entry'),
      z.literal('goto'),
      z.literal('function breakpoint'),
      z.literal('data breakpoint'),
      z.literal('instruction breakpoint'),
      z.string(),
    ]),
    description: z.string().optional(),
    threadId: z.number().optional(),
    preserveFocusHint: z.boolean().optional(),
    text: z.string().optional(),
    allThreadsStopped: z.boolean().optional(),
    hitBreakpointIds: z.array(z.number()).optional(),
  }),
});

const continuedEventSchema = eventSchema.extend({
  event: z.literal('continued'),
  body: z.object({
    threadId: z.number(),
    allThreadsContinued: z.boolean().optional(),
  }),
});

const exitedEventSchema = eventSchema.extend({
  event: z.literal('exited'),
  body: z.object({
    exitCode: z.number(),
  }),
});

const terminatedEventSchema = eventSchema.extend({
  event: z.literal('terminated'),
  body: z
    .object({
      restart: z.any().optional(),
    })
    .optional(),
});

const threadEventSchema = eventSchema.extend({
  event: z.literal('thread'),
  body: z.object({
    reason: z.union([z.literal('started'), z.literal('exited'), z.string()]),
    threadId: z.number(),
  }),
});

const processEventSchema = eventSchema.extend({
  event: z.literal('process'),
  body: z.object({
    name: z.string(),
    systemProcessId: z.number().optional(),
    isLocalProcess: z.boolean().optional(),
    startMethod: z
      .union([
        z.literal('launch'),
        z.literal('attach'),
        z.literal('attachForSuspendedLaunch'),
      ])
      .optional(),
    pointerSize: z.number().optional(),
  }),
});

const progressStartEventSchema = eventSchema.extend({
  event: z.literal('progressStart'),
  body: z.object({
    progressId: z.string(),
    title: z.string(),
    requestId: z.number().optional(),
    cancellable: z.boolean().optional(),
    message: z.string().optional(),
    percentage: z.number().optional(),
  }),
});

const progressUpdateEventSchema = eventSchema.extend({
  event: z.literal('progressUpdate'),
  body: z.object({
    progressId: z.string(),
    message: z.string().optional(),
    percentage: z.number().optional(),
  }),
});

const progressEndEventSchema = eventSchema.extend({
  event: z.literal('progressEnd'),
  body: z.object({
    progressId: z.string(),
    message: z.string().optional(),
  }),
});

const memoryEventSchema = eventSchema.extend({
  event: z.literal('memory'),
  body: z.object({
    memoryReference: z.string(),
    offset: z.number(),
    count: z.number(),
  }),
});

const runInTerminalRequestArgumentsSchema = z.object({
  kind: z.union([z.literal('integrated'), z.literal('external')]).optional(),
  title: z.string().optional(),
  cwd: z.string(),
  args: z.array(z.string()),
  env: z.record(z.string().nullable()).optional(),
  argsCanBeInterpretedByShell: z.boolean().optional(),
});

const runInTerminalResponseSchema = responseSchema.extend({
  command: z.literal('runInTerminal'),
  body: z.object({
    processId: z.number().optional(),
    shellProcessId: z.number().optional(),
  }),
});

const startDebuggingRequestArgumentsSchema = z.object({
  configuration: z.record(z.any()),
  request: z.union([z.literal('launch'), z.literal('attach')]),
});

const startDebuggingResponseSchema = responseSchema.extend({
  command: z.literal('startDebugging'),
});

const initializeRequestArgumentsSchema = z.object({
  clientID: z.string().optional(),
  clientName: z.string().optional(),
  adapterID: z.string(),
  locale: z.string().optional(),
  linesStartAt1: z.boolean().optional(),
  columnsStartAt1: z.boolean().optional(),
  pathFormat: z.union([z.literal('path'), z.literal('uri'), z.string()]).optional(),
  supportsVariableType: z.boolean().optional(),
  supportsVariablePaging: z.boolean().optional(),
  supportsRunInTerminalRequest: z.boolean().optional(),
  supportsMemoryReferences: z.boolean().optional(),
  supportsProgressReporting: z.boolean().optional(),
  supportsInvalidatedEvent: z.boolean().optional(),
  supportsMemoryEvent: z.boolean().optional(),
  supportsArgsCanBeInterpretedByShell: z.boolean().optional(),
  supportsStartDebuggingRequest: z.boolean().optional(),
  supportsANSIStyling: z.boolean().optional(),
});

const configurationDoneArgumentsSchema = z.object({});

const configurationDoneResponseSchema = responseSchema.extend({
  command: z.literal('configurationDone'),
});

const launchRequestArgumentsSchema = z.object({
  noDebug: z.boolean().optional(),
  __restart: z.any().optional(),
});

const launchResponseSchema = responseSchema.extend({
  command: z.literal('launch'),
});

const attachRequestArgumentsSchema = z.object({
  __restart: z.any().optional(),
});

const attachResponseSchema = responseSchema.extend({
  command: z.literal('attach'),
});

const restartArgumentsSchema = z.object({
  arguments: z
    .union([launchRequestArgumentsSchema, attachRequestArgumentsSchema])
    .optional(),
});

const restartResponseSchema = responseSchema.extend({
  command: z.literal('restart'),
});

const disconnectArgumentsSchema = z.object({
  restart: z.boolean().optional(),
  terminateDebuggee: z.boolean().optional(),
  suspendDebuggee: z.boolean().optional(),
});

const disconnectResponseSchema = responseSchema.extend({
  command: z.literal('disconnect'),
});

const terminateArgumentsSchema = z.object({
  restart: z.boolean().optional(),
});

const terminateResponseSchema = responseSchema.extend({
  command: z.literal('terminate'),
});

const dataBreakpointInfoArgumentsSchema = z.object({
  variablesReference: z.number().optional(),
  name: z.string(),
  frameId: z.number().optional(),
  bytes: z.number().optional(),
  asAddress: z.boolean().optional(),
  mode: z.string().optional(),
});

const continueArgumentsSchema = z.object({
  threadId: z.number(),
  singleThread: z.boolean().optional(),
});

const continueResponseSchema = responseSchema.extend({
  command: z.literal('continue'),
  body: z.object({
    allThreadsContinued: z.boolean().optional(),
  }),
});

const nextResponseSchema = responseSchema.extend({
  command: z.literal('next'),
});

const stepInResponseSchema = responseSchema.extend({
  command: z.literal('stepIn'),
});

const stepOutResponseSchema = responseSchema.extend({
  command: z.literal('stepOut'),
});

const stepBackResponseSchema = responseSchema.extend({
  command: z.literal('stepBack'),
});

const reverseContinueArgumentsSchema = z.object({
  threadId: z.number(),
  singleThread: z.boolean().optional(),
});

const reverseContinueResponseSchema = responseSchema.extend({
  command: z.literal('reverseContinue'),
});

const restartFrameArgumentsSchema = z.object({
  frameId: z.number(),
});

const restartFrameResponseSchema = responseSchema.extend({
  command: z.literal('restartFrame'),
});

const gotoArgumentsSchema = z.object({
  threadId: z.number(),
  targetId: z.number(),
});

const gotoResponseSchema = responseSchema.extend({
  command: z.literal('goto'),
});

const pauseArgumentsSchema = z.object({
  threadId: z.number(),
});

const pauseResponseSchema = responseSchema.extend({
  command: z.literal('pause'),
});

const scopesArgumentsSchema = z.object({
  frameId: z.number(),
});

const setVariableResponseSchema = responseSchema.extend({
  command: z.literal('setVariable'),
  body: z.object({
    value: z.string(),
    type: z.string().optional(),
    variablesReference: z.number().optional(),
    namedVariables: z.number().optional(),
    indexedVariables: z.number().optional(),
    memoryReference: z.string().optional(),
    valueLocationReference: z.number().optional(),
  }),
});

const sourceResponseSchema = responseSchema.extend({
  command: z.literal('source'),
  body: z.object({
    content: z.string(),
    mimeType: z.string().optional(),
  }),
});

const threadsRequestSchema = requestSchema.extend({
  command: z.literal('threads'),
});

const terminateThreadsArgumentsSchema = z.object({
  threadIds: z.array(z.number()).optional(),
});

const terminateThreadsResponseSchema = responseSchema.extend({
  command: z.literal('terminateThreads'),
});

const modulesArgumentsSchema = z.object({
  startModule: z.number().optional(),
  moduleCount: z.number().optional(),
});

const loadedSourcesArgumentsSchema = z.object({});

const stepInTargetsArgumentsSchema = z.object({
  frameId: z.number(),
});

const completionsArgumentsSchema = z.object({
  frameId: z.number().optional(),
  text: z.string(),
  column: z.number(),
  line: z.number().optional(),
});

const exceptionInfoArgumentsSchema = z.object({
  threadId: z.number(),
});

const readMemoryArgumentsSchema = z.object({
  memoryReference: z.string(),
  offset: z.number().optional(),
  count: z.number(),
});

const readMemoryResponseSchema = responseSchema.extend({
  command: z.literal('readMemory'),
  body: z
    .object({
      address: z.string(),
      unreadableBytes: z.number().optional(),
      data: z.string().optional(),
    })
    .optional(),
});

const writeMemoryArgumentsSchema = z.object({
  memoryReference: z.string(),
  offset: z.number().optional(),
  allowPartial: z.boolean().optional(),
  data: z.string(),
});

const writeMemoryResponseSchema = responseSchema.extend({
  command: z.literal('writeMemory'),
  body: z
    .object({
      offset: z.number().optional(),
      bytesWritten: z.number().optional(),
    })
    .optional(),
});

const disassembleArgumentsSchema = z.object({
  memoryReference: z.string(),
  offset: z.number().optional(),
  instructionOffset: z.number().optional(),
  instructionCount: z.number(),
  resolveSymbols: z.boolean().optional(),
});

const locationsArgumentsSchema = z.object({
  locationReference: z.number(),
});

const exceptionBreakpointsFilterSchema = z.object({
  filter: z.string(),
  label: z.string(),
  description: z.string().optional(),
  default: z.boolean().optional(),
  supportsCondition: z.boolean().optional(),
  conditionDescription: z.string().optional(),
});

const messageSchema = z.object({
  id: z.number(),
  format: z.string(),
  variables: z.record(z.string()).optional(),
  sendTelemetry: z.boolean().optional(),
  showUser: z.boolean().optional(),
  url: z.string().optional(),
  urlLabel: z.string().optional(),
});

const moduleSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  path: z.string().optional(),
  isOptimized: z.boolean().optional(),
  isUserCode: z.boolean().optional(),
  version: z.string().optional(),
  symbolStatus: z.string().optional(),
  symbolFilePath: z.string().optional(),
  dateTimeStamp: z.string().optional(),
  addressRange: z.string().optional(),
});

const columnDescriptorSchema = z.object({
  attributeName: z.string(),
  label: z.string(),
  format: z.string().optional(),
  type: z
    .union([
      z.literal('string'),
      z.literal('number'),
      z.literal('boolean'),
      z.literal('unixTimestampUTC'),
    ])
    .optional(),
  width: z.number().optional(),
});

const threadSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const variablePresentationHintSchema = z.object({
  kind: z
    .union([
      z.literal('property'),
      z.literal('method'),
      z.literal('class'),
      z.literal('data'),
      z.literal('event'),
      z.literal('baseClass'),
      z.literal('innerClass'),
      z.literal('interface'),
      z.literal('mostDerivedClass'),
      z.literal('virtual'),
      z.literal('dataBreakpoint'),
      z.string(),
    ])
    .optional(),
  attributes: z
    .array(
      z.union([
        z.literal('static'),
        z.literal('constant'),
        z.literal('readOnly'),
        z.literal('rawString'),
        z.literal('hasObjectId'),
        z.literal('canHaveObjectId'),
        z.literal('hasSideEffects'),
        z.literal('hasDataBreakpoint'),
        z.string(),
      ]),
    )
    .optional(),
  visibility: z
    .union([
      z.literal('public'),
      z.literal('private'),
      z.literal('protected'),
      z.literal('internal'),
      z.literal('final'),
      z.string(),
    ])
    .optional(),
  lazy: z.boolean().optional(),
});

const breakpointLocationSchema = z.object({
  line: z.number(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
});

const sourceBreakpointSchema = z.object({
  line: z.number(),
  column: z.number().optional(),
  condition: z.string().optional(),
  hitCondition: z.string().optional(),
  logMessage: z.string().optional(),
  mode: z.string().optional(),
});

const functionBreakpointSchema = z.object({
  name: z.string(),
  condition: z.string().optional(),
  hitCondition: z.string().optional(),
});

const dataBreakpointAccessTypeSchema = z.union([
  z.literal('read'),
  z.literal('write'),
  z.literal('readWrite'),
]);

const dataBreakpointSchema = z.object({
  dataId: z.string(),
  accessType: dataBreakpointAccessTypeSchema.optional(),
  condition: z.string().optional(),
  hitCondition: z.string().optional(),
});

const instructionBreakpointSchema = z.object({
  instructionReference: z.string(),
  offset: z.number().optional(),
  condition: z.string().optional(),
  hitCondition: z.string().optional(),
  mode: z.string().optional(),
});

const steppingGranularitySchema = z.union([
  z.literal('statement'),
  z.literal('line'),
  z.literal('instruction'),
]);

const stepInTargetSchema = z.object({
  id: z.number(),
  label: z.string(),
  line: z.number().optional(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
});

const gotoTargetSchema = z.object({
  id: z.number(),
  label: z.string(),
  line: z.number(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
  instructionPointerReference: z.string().optional(),
});

const completionItemTypeSchema = z.union([
  z.literal('method'),
  z.literal('function'),
  z.literal('constructor'),
  z.literal('field'),
  z.literal('variable'),
  z.literal('class'),
  z.literal('interface'),
  z.literal('module'),
  z.literal('property'),
  z.literal('unit'),
  z.literal('value'),
  z.literal('enum'),
  z.literal('keyword'),
  z.literal('snippet'),
  z.literal('text'),
  z.literal('color'),
  z.literal('file'),
  z.literal('reference'),
  z.literal('customcolor'),
]);

const checksumAlgorithmSchema = z.union([
  z.literal('MD5'),
  z.literal('SHA1'),
  z.literal('SHA256'),
  z.literal('timestamp'),
]);

const checksumSchema = z.object({
  algorithm: checksumAlgorithmSchema,
  checksum: z.string(),
});

const valueFormatSchema = z.object({
  hex: z.boolean().optional(),
});

const stackFrameFormatSchema = valueFormatSchema.extend({
  parameters: z.boolean().optional(),
  parameterTypes: z.boolean().optional(),
  parameterNames: z.boolean().optional(),
  parameterValues: z.boolean().optional(),
  line: z.boolean().optional(),
  module: z.boolean().optional(),
  includeAll: z.boolean().optional(),
});

const exceptionFilterOptionsSchema = z.object({
  filterId: z.string(),
  condition: z.string().optional(),
  mode: z.string().optional(),
});

const exceptionBreakModeSchema = z.union([
  z.literal('never'),
  z.literal('always'),
  z.literal('unhandled'),
  z.literal('userUnhandled'),
]);

const exceptionPathSegmentSchema = z.object({
  negate: z.boolean().optional(),
  names: z.array(z.string()),
});

const exceptionDetailsSchema: z.ZodSchema<DebugAdapterProtocol.ExceptionDetails> = z.lazy(
  () =>
    z.object({
      message: z.string().optional(),
      typeName: z.string().optional(),
      fullTypeName: z.string().optional(),
      evaluateName: z.string().optional(),
      stackTrace: z.string().optional(),
      innerException: z.array(exceptionDetailsSchema).optional(),
    }),
);

const invalidatedAreasSchema = z.union([
  z.literal('all'),
  z.literal('stacks'),
  z.literal('threads'),
  z.literal('variables'),
  z.string(),
]);

const breakpointModeApplicabilitySchema = z.union([
  z.literal('source'),
  z.literal('exception'),
  z.literal('data'),
  z.literal('instruction'),
  z.string(),
]);

const errorResponseSchema = responseSchema.extend({
  body: z.object({
    error: messageSchema.optional(),
  }),
});

const cancelRequestSchema = requestSchema.extend({
  command: z.literal('cancel'),
  arguments: cancelArgumentsSchema.optional(),
});

const moduleEventSchema = eventSchema.extend({
  event: z.literal('module'),
  body: z.object({
    reason: z.union([z.literal('new'), z.literal('changed'), z.literal('removed')]),
    module: moduleSchema,
  }),
});

const invalidatedEventSchema = eventSchema.extend({
  event: z.literal('invalidated'),
  body: z.object({
    areas: z.array(invalidatedAreasSchema).optional(),
    threadId: z.number().optional(),
    stackFrameId: z.number().optional(),
  }),
});

const runInTerminalRequestSchema = requestSchema.extend({
  command: z.literal('runInTerminal'),
  arguments: runInTerminalRequestArgumentsSchema,
});

const startDebuggingRequestSchema = requestSchema.extend({
  command: z.literal('startDebugging'),
  arguments: startDebuggingRequestArgumentsSchema,
});

const initializeRequestSchema = requestSchema.extend({
  command: z.literal('initialize'),
  arguments: initializeRequestArgumentsSchema,
});

const configurationDoneRequestSchema = requestSchema.extend({
  command: z.literal('configurationDone'),
  arguments: configurationDoneArgumentsSchema.optional(),
});

const launchRequestSchema = requestSchema.extend({
  command: z.literal('launch'),
  arguments: launchRequestArgumentsSchema,
});

const attachRequestSchema = requestSchema.extend({
  command: z.literal('attach'),
  arguments: attachRequestArgumentsSchema,
});

const restartRequestSchema = requestSchema.extend({
  command: z.literal('restart'),
  arguments: restartArgumentsSchema.optional(),
});

const disconnectRequestSchema = requestSchema.extend({
  command: z.literal('disconnect'),
  arguments: disconnectArgumentsSchema.optional(),
});

const terminateRequestSchema = requestSchema.extend({
  command: z.literal('terminate'),
  arguments: terminateArgumentsSchema.optional(),
});

const breakpointLocationsResponseSchema = responseSchema.extend({
  command: z.literal('breakpointLocations'),
  body: z.object({
    breakpoints: z.array(breakpointLocationSchema),
  }),
});

const setFunctionBreakpointsArgumentsSchema = z.object({
  breakpoints: z.array(functionBreakpointSchema),
});

const dataBreakpointInfoRequestSchema = requestSchema.extend({
  command: z.literal('dataBreakpointInfo'),
  arguments: dataBreakpointInfoArgumentsSchema,
});

const dataBreakpointInfoResponseSchema = responseSchema.extend({
  command: z.literal('dataBreakpointInfo'),
  body: z.object({
    dataId: z.string().nullable(),
    description: z.string(),
    accessTypes: z.array(dataBreakpointAccessTypeSchema).optional(),
    canPersist: z.boolean().optional(),
  }),
});

const setDataBreakpointsArgumentsSchema = z.object({
  breakpoints: z.array(dataBreakpointSchema),
});

const setInstructionBreakpointsArgumentsSchema = z.object({
  breakpoints: z.array(instructionBreakpointSchema),
});

const continueRequestSchema = requestSchema.extend({
  command: z.literal('continue'),
  arguments: continueArgumentsSchema,
});

const nextArgumentsSchema = z.object({
  threadId: z.number(),
  singleThread: z.boolean().optional(),
  granularity: steppingGranularitySchema.optional(),
});

const stepInArgumentsSchema = z.object({
  threadId: z.number(),
  singleThread: z.boolean().optional(),
  targetId: z.number().optional(),
  granularity: steppingGranularitySchema.optional(),
});

const stepOutArgumentsSchema = z.object({
  threadId: z.number(),
  singleThread: z.boolean().optional(),
  granularity: steppingGranularitySchema.optional(),
});

const stepBackArgumentsSchema = z.object({
  threadId: z.number(),
  singleThread: z.boolean().optional(),
  granularity: steppingGranularitySchema.optional(),
});

const reverseContinueRequestSchema = requestSchema.extend({
  command: z.literal('reverseContinue'),
  arguments: reverseContinueArgumentsSchema,
});

const restartFrameRequestSchema = requestSchema.extend({
  command: z.literal('restartFrame'),
  arguments: restartFrameArgumentsSchema,
});

const gotoRequestSchema = requestSchema.extend({
  command: z.literal('goto'),
  arguments: gotoArgumentsSchema,
});

const pauseRequestSchema = requestSchema.extend({
  command: z.literal('pause'),
  arguments: pauseArgumentsSchema,
});

const stackTraceArgumentsSchema = z.object({
  threadId: z.number(),
  startFrame: z.number().optional(),
  levels: z.number().optional(),
  format: stackFrameFormatSchema.optional(),
});

const scopesRequestSchema = requestSchema.extend({
  command: z.literal('scopes'),
  arguments: scopesArgumentsSchema,
});

const variablesArgumentsSchema = z.object({
  variablesReference: z.number(),
  filter: z.union([z.literal('indexed'), z.literal('named')]).optional(),
  start: z.number().optional(),
  count: z.number().optional(),
  format: valueFormatSchema.optional(),
});

const setVariableArgumentsSchema = z.object({
  variablesReference: z.number(),
  name: z.string(),
  value: z.string(),
  format: valueFormatSchema.optional(),
});

const threadsResponseSchema = responseSchema.extend({
  command: z.literal('threads'),
  body: z.object({
    threads: z.array(threadSchema),
  }),
});

const terminateThreadsRequestSchema = requestSchema.extend({
  command: z.literal('terminateThreads'),
  arguments: terminateThreadsArgumentsSchema,
});

const modulesRequestSchema = requestSchema.extend({
  command: z.literal('modules'),
  arguments: modulesArgumentsSchema,
});

const modulesResponseSchema = responseSchema.extend({
  command: z.literal('modules'),
  body: z.object({
    modules: z.array(moduleSchema),
    totalModules: z.number().optional(),
  }),
});

const loadedSourcesRequestSchema = requestSchema.extend({
  command: z.literal('loadedSources'),
  arguments: loadedSourcesArgumentsSchema.optional(),
});

const evaluateResponseSchema = responseSchema.extend({
  command: z.literal('evaluate'),
  body: z.object({
    result: z.string(),
    type: z.string().optional(),
    presentationHint: variablePresentationHintSchema.optional(),
    variablesReference: z.number(),
    namedVariables: z.number().optional(),
    indexedVariables: z.number().optional(),
    memoryReference: z.string().optional(),
    valueLocationReference: z.number().optional(),
  }),
});

const setExpressionArgumentsSchema = z.object({
  expression: z.string(),
  value: z.string(),
  frameId: z.number().optional(),
  format: valueFormatSchema.optional(),
});

const setExpressionResponseSchema = responseSchema.extend({
  command: z.literal('setExpression'),
  body: z.object({
    value: z.string(),
    type: z.string().optional(),
    presentationHint: variablePresentationHintSchema.optional(),
    variablesReference: z.number().optional(),
    namedVariables: z.number().optional(),
    indexedVariables: z.number().optional(),
    memoryReference: z.string().optional(),
    valueLocationReference: z.number().optional(),
  }),
});

const stepInTargetsRequestSchema = requestSchema.extend({
  command: z.literal('stepInTargets'),
  arguments: stepInTargetsArgumentsSchema,
});

const stepInTargetsResponseSchema = responseSchema.extend({
  command: z.literal('stepInTargets'),
  body: z.object({
    targets: z.array(stepInTargetSchema),
  }),
});

const gotoTargetsResponseSchema = responseSchema.extend({
  command: z.literal('gotoTargets'),
  body: z.object({
    targets: z.array(gotoTargetSchema),
  }),
});

const completionsRequestSchema = requestSchema.extend({
  command: z.literal('completions'),
  arguments: completionsArgumentsSchema,
});

const exceptionInfoRequestSchema = requestSchema.extend({
  command: z.literal('exceptionInfo'),
  arguments: exceptionInfoArgumentsSchema,
});

const exceptionInfoResponseSchema = responseSchema.extend({
  command: z.literal('exceptionInfo'),
  body: z.object({
    exceptionId: z.string(),
    description: z.string().optional(),
    breakMode: exceptionBreakModeSchema,
    details: exceptionDetailsSchema.optional(),
  }),
});

const readMemoryRequestSchema = requestSchema.extend({
  command: z.literal('readMemory'),
  arguments: readMemoryArgumentsSchema,
});

const writeMemoryRequestSchema = requestSchema.extend({
  command: z.literal('writeMemory'),
  arguments: writeMemoryArgumentsSchema,
});

const disassembleRequestSchema = requestSchema.extend({
  command: z.literal('disassemble'),
  arguments: disassembleArgumentsSchema,
});

const locationsRequestSchema = requestSchema.extend({
  command: z.literal('locations'),
  arguments: locationsArgumentsSchema,
});

const sourceSchema: z.ZodSchema<DebugAdapterProtocol.Source> = z.lazy(() =>
  z.object({
    name: z.string().optional(),
    path: z.string().optional(),
    sourceReference: z.number().optional(),
    presentationHint: z
      .union([z.literal('normal'), z.literal('emphasize'), z.literal('deemphasize')])
      .optional(),
    origin: z.string().optional(),
    sources: z.array(sourceSchema).optional(),
    adapterData: z.any().optional(),
    checksums: z.array(checksumSchema).optional(),
  }),
);

const stackFrameSchema = z.object({
  id: z.number(),
  name: z.string(),
  source: sourceSchema.optional(),
  line: z.number(),
  column: z.number(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
  canRestart: z.boolean().optional(),
  instructionPointerReference: z.string().optional(),
  moduleId: z.union([z.number(), z.string()]).optional(),
  presentationHint: z
    .union([z.literal('normal'), z.literal('label'), z.literal('subtle')])
    .optional(),
});

const scopeSchema = z.object({
  name: z.string(),
  presentationHint: z
    .union([
      z.literal('arguments'),
      z.literal('locals'),
      z.literal('registers'),
      z.literal('returnValue'),
      z.string(),
    ])
    .optional(),
  variablesReference: z.number(),
  namedVariables: z.number().optional(),
  indexedVariables: z.number().optional(),
  expensive: z.boolean(),
  source: sourceSchema.optional(),
  line: z.number().optional(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
});

const variableSchema = z.object({
  name: z.string(),
  value: z.string(),
  type: z.string().optional(),
  presentationHint: variablePresentationHintSchema.optional(),
  evaluateName: z.string().optional(),
  variablesReference: z.number(),
  namedVariables: z.number().optional(),
  indexedVariables: z.number().optional(),
  memoryReference: z.string().optional(),
  declarationLocationReference: z.number().optional(),
  valueLocationReference: z.number().optional(),
});

const breakpointSchema = z.object({
  id: z.number().optional(),
  verified: z.boolean(),
  message: z.string().optional(),
  source: sourceSchema.optional(),
  line: z.number().optional(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
  instructionReference: z.string().optional(),
  offset: z.number().optional(),
  reason: z.union([z.literal('pending'), z.literal('failed')]).optional(),
});

const completionItemSchema = z.object({
  label: z.string(),
  text: z.string().optional(),
  sortText: z.string().optional(),
  detail: z.string().optional(),
  type: completionItemTypeSchema.optional(),
  start: z.number().optional(),
  length: z.number().optional(),
  selectionStart: z.number().optional(),
  selectionLength: z.number().optional(),
});

const exceptionOptionsSchema = z.object({
  path: z.array(exceptionPathSegmentSchema).optional(),
  breakMode: exceptionBreakModeSchema,
});

const disassembledInstructionSchema = z.object({
  address: z.string(),
  instructionBytes: z.string().optional(),
  instruction: z.string(),
  symbol: z.string().optional(),
  location: sourceSchema.optional(),
  line: z.number().optional(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
  presentationHint: z.union([z.literal('normal'), z.literal('invalid')]).optional(),
});

const breakpointModeSchema = z.object({
  mode: z.string(),
  label: z.string(),
  description: z.string().optional(),
  appliesTo: z.array(breakpointModeApplicabilitySchema),
});

const outputEventSchema = eventSchema.extend({
  event: z.literal('output'),
  body: z.object({
    category: z
      .union([
        z.literal('console'),
        z.literal('important'),
        z.literal('stdout'),
        z.literal('stderr'),
        z.literal('telemetry'),
        z.string(),
      ])
      .optional(),
    output: z.string(),
    group: z
      .union([z.literal('start'), z.literal('startCollapsed'), z.literal('end')])
      .optional(),
    variablesReference: z.number().optional(),
    source: sourceSchema.optional(),
    line: z.number().optional(),
    column: z.number().optional(),
    data: z.any().optional(),
    locationReference: z.number().optional(),
  }),
});

const breakpointEventSchema = eventSchema.extend({
  event: z.literal('breakpoint'),
  body: z.object({
    reason: z.union([
      z.literal('changed'),
      z.literal('new'),
      z.literal('removed'),
      z.string(),
    ]),
    breakpoint: breakpointSchema,
  }),
});

const loadedSourceEventSchema = eventSchema.extend({
  event: z.literal('loadedSource'),
  body: z.object({
    reason: z.union([z.literal('new'), z.literal('changed'), z.literal('removed')]),
    source: sourceSchema,
  }),
});

const breakpointLocationsArgumentsSchema = z.object({
  source: sourceSchema,
  line: z.number(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
});

const setBreakpointsArgumentsSchema = z.object({
  source: sourceSchema,
  breakpoints: z.array(sourceBreakpointSchema).optional(),
  lines: z.array(z.number()).optional(),
  sourceModified: z.boolean().optional(),
});

const setBreakpointsResponseSchema = responseSchema.extend({
  command: z.literal('setBreakpoints'),
  body: z.object({
    breakpoints: z.array(breakpointSchema),
  }),
});

const setFunctionBreakpointsRequestSchema = requestSchema.extend({
  command: z.literal('setFunctionBreakpoints'),
  arguments: setFunctionBreakpointsArgumentsSchema,
});

const setFunctionBreakpointsResponseSchema = responseSchema.extend({
  command: z.literal('setFunctionBreakpoints'),
  body: z.object({
    breakpoints: z.array(breakpointSchema),
  }),
});

const setExceptionBreakpointsArgumentsSchema = z.object({
  filters: z.array(z.string()),
  filterOptions: z.array(exceptionFilterOptionsSchema).optional(),
  exceptionOptions: z.array(exceptionOptionsSchema).optional(),
});

const setExceptionBreakpointsResponseSchema = responseSchema.extend({
  command: z.literal('setExceptionBreakpoints'),
  body: z
    .object({
      breakpoints: z.array(breakpointSchema).optional(),
    })
    .optional(),
});

const setDataBreakpointsRequestSchema = requestSchema.extend({
  command: z.literal('setDataBreakpoints'),
  arguments: setDataBreakpointsArgumentsSchema,
});

const setDataBreakpointsResponseSchema = responseSchema.extend({
  command: z.literal('setDataBreakpoints'),
  body: z.object({
    breakpoints: z.array(breakpointSchema),
  }),
});

const setInstructionBreakpointsRequestSchema = requestSchema.extend({
  command: z.literal('setInstructionBreakpoints'),
  arguments: setInstructionBreakpointsArgumentsSchema,
});

const setInstructionBreakpointsResponseSchema = responseSchema.extend({
  command: z.literal('setInstructionBreakpoints'),
  body: z.object({
    breakpoints: z.array(breakpointSchema),
  }),
});

const nextRequestSchema = requestSchema.extend({
  command: z.literal('next'),
  arguments: nextArgumentsSchema,
});

const stepInRequestSchema = requestSchema.extend({
  command: z.literal('stepIn'),
  arguments: stepInArgumentsSchema,
});

const stepOutRequestSchema = requestSchema.extend({
  command: z.literal('stepOut'),
  arguments: stepOutArgumentsSchema,
});

const stepBackRequestSchema = requestSchema.extend({
  command: z.literal('stepBack'),
  arguments: stepBackArgumentsSchema,
});

const stackTraceRequestSchema = requestSchema.extend({
  command: z.literal('stackTrace'),
  arguments: stackTraceArgumentsSchema,
});

const stackTraceResponseSchema = responseSchema.extend({
  command: z.literal('stackTrace'),
  body: z.object({
    stackFrames: z.array(stackFrameSchema),
    totalFrames: z.number().optional(),
  }),
});

const scopesResponseSchema = responseSchema.extend({
  command: z.literal('scopes'),
  body: z.object({
    scopes: z.array(scopeSchema),
  }),
});

const variablesRequestSchema = requestSchema.extend({
  command: z.literal('variables'),
  arguments: variablesArgumentsSchema,
});

const variablesResponseSchema = responseSchema.extend({
  command: z.literal('variables'),
  body: z.object({
    variables: z.array(variableSchema),
  }),
});

const setVariableRequestSchema = requestSchema.extend({
  command: z.literal('setVariable'),
  arguments: setVariableArgumentsSchema,
});

const sourceArgumentsSchema = z.object({
  source: sourceSchema.optional(),
  sourceReference: z.number(),
});

const loadedSourcesResponseSchema = responseSchema.extend({
  command: z.literal('loadedSources'),
  body: z.object({
    sources: z.array(sourceSchema),
  }),
});

const evaluateArgumentsSchema = z.object({
  expression: z.string(),
  frameId: z.number().optional(),
  line: z.number().optional(),
  column: z.number().optional(),
  source: sourceSchema.optional(),
  context: z
    .union([
      z.literal('watch'),
      z.literal('repl'),
      z.literal('hover'),
      z.literal('clipboard'),
      z.literal('variables'),
      z.string(),
    ])
    .optional(),
  format: valueFormatSchema.optional(),
});

const setExpressionRequestSchema = requestSchema.extend({
  command: z.literal('setExpression'),
  arguments: setExpressionArgumentsSchema,
});

const gotoTargetsArgumentsSchema = z.object({
  source: sourceSchema,
  line: z.number(),
  column: z.number().optional(),
});

const completionsResponseSchema = responseSchema.extend({
  command: z.literal('completions'),
  body: z.object({
    targets: z.array(completionItemSchema),
  }),
});

const disassembleResponseSchema = responseSchema.extend({
  command: z.literal('disassemble'),
  body: z
    .object({
      instructions: z.array(disassembledInstructionSchema),
    })
    .optional(),
});

const locationsResponseSchema = responseSchema.extend({
  command: z.literal('locations'),
  body: z
    .object({
      source: sourceSchema,
      line: z.number(),
      column: z.number().optional(),
      endLine: z.number().optional(),
      endColumn: z.number().optional(),
    })
    .optional(),
});

const capabilitiesSchema = z.object({
  supportsConfigurationDoneRequest: z.boolean().optional(),
  supportsFunctionBreakpoints: z.boolean().optional(),
  supportsConditionalBreakpoints: z.boolean().optional(),
  supportsHitConditionalBreakpoints: z.boolean().optional(),
  supportsEvaluateForHovers: z.boolean().optional(),
  exceptionBreakpointFilters: z.array(exceptionBreakpointsFilterSchema).optional(),
  supportsStepBack: z.boolean().optional(),
  supportsSetVariable: z.boolean().optional(),
  supportsRestartFrame: z.boolean().optional(),
  supportsGotoTargetsRequest: z.boolean().optional(),
  supportsStepInTargetsRequest: z.boolean().optional(),
  supportsCompletionsRequest: z.boolean().optional(),
  completionTriggerCharacters: z.array(z.string()).optional(),
  supportsModulesRequest: z.boolean().optional(),
  additionalModuleColumns: z.array(columnDescriptorSchema).optional(),
  supportedChecksumAlgorithms: z.array(checksumAlgorithmSchema).optional(),
  supportsRestartRequest: z.boolean().optional(),
  supportsExceptionOptions: z.boolean().optional(),
  supportsValueFormattingOptions: z.boolean().optional(),
  supportsExceptionInfoRequest: z.boolean().optional(),
  supportTerminateDebuggee: z.boolean().optional(),
  supportSuspendDebuggee: z.boolean().optional(),
  supportsDelayedStackTraceLoading: z.boolean().optional(),
  supportsLoadedSourcesRequest: z.boolean().optional(),
  supportsLogPoints: z.boolean().optional(),
  supportsTerminateThreadsRequest: z.boolean().optional(),
  supportsSetExpression: z.boolean().optional(),
  supportsTerminateRequest: z.boolean().optional(),
  supportsDataBreakpoints: z.boolean().optional(),
  supportsReadMemoryRequest: z.boolean().optional(),
  supportsWriteMemoryRequest: z.boolean().optional(),
  supportsDisassembleRequest: z.boolean().optional(),
  supportsCancelRequest: z.boolean().optional(),
  supportsBreakpointLocationsRequest: z.boolean().optional(),
  supportsClipboardContext: z.boolean().optional(),
  supportsSteppingGranularity: z.boolean().optional(),
  supportsInstructionBreakpoints: z.boolean().optional(),
  supportsExceptionFilterOptions: z.boolean().optional(),
  supportsSingleThreadExecutionRequests: z.boolean().optional(),
  supportsDataBreakpointBytes: z.boolean().optional(),
  breakpointModes: z.array(breakpointModeSchema).optional(),
  supportsANSIStyling: z.boolean().optional(),
});

const capabilitiesEventSchema = eventSchema.extend({
  event: z.literal('capabilities'),
  body: z.object({
    capabilities: capabilitiesSchema,
  }),
});

const initializeResponseSchema = responseSchema.extend({
  command: z.literal('initialize'),
  body: capabilitiesSchema.optional(),
});

const breakpointLocationsRequestSchema = requestSchema.extend({
  command: z.literal('breakpointLocations'),
  arguments: breakpointLocationsArgumentsSchema.optional(),
});

const setBreakpointsRequestSchema = requestSchema.extend({
  command: z.literal('setBreakpoints'),
  arguments: setBreakpointsArgumentsSchema,
});

const setExceptionBreakpointsRequestSchema = requestSchema.extend({
  command: z.literal('setExceptionBreakpoints'),
  arguments: setExceptionBreakpointsArgumentsSchema,
});

const sourceRequestSchema = requestSchema.extend({
  command: z.literal('source'),
  arguments: sourceArgumentsSchema,
});

const evaluateRequestSchema = requestSchema.extend({
  command: z.literal('evaluate'),
  arguments: evaluateArgumentsSchema,
});

const gotoTargetsRequestSchema = requestSchema.extend({
  command: z.literal('gotoTargets'),
  arguments: gotoTargetsArgumentsSchema,
});

export const DebugAdapterProtocolSchemas = {
  ProtocolMessage: protocolMessageSchema,
  Request: requestSchema,
  Event: eventSchema,
  Response: responseSchema,
  CancelArguments: cancelArgumentsSchema,
  CancelResponse: cancelResponseSchema,
  InitializedEvent: initializedEventSchema,
  StoppedEvent: stoppedEventSchema,
  ContinuedEvent: continuedEventSchema,
  ExitedEvent: exitedEventSchema,
  TerminatedEvent: terminatedEventSchema,
  ThreadEvent: threadEventSchema,
  ProcessEvent: processEventSchema,
  ProgressStartEvent: progressStartEventSchema,
  ProgressUpdateEvent: progressUpdateEventSchema,
  ProgressEndEvent: progressEndEventSchema,
  MemoryEvent: memoryEventSchema,
  RunInTerminalRequestArguments: runInTerminalRequestArgumentsSchema,
  RunInTerminalResponse: runInTerminalResponseSchema,
  StartDebuggingRequestArguments: startDebuggingRequestArgumentsSchema,
  StartDebuggingResponse: startDebuggingResponseSchema,
  InitializeRequestArguments: initializeRequestArgumentsSchema,
  ConfigurationDoneArguments: configurationDoneArgumentsSchema,
  ConfigurationDoneResponse: configurationDoneResponseSchema,
  LaunchRequestArguments: launchRequestArgumentsSchema,
  LaunchResponse: launchResponseSchema,
  AttachRequestArguments: attachRequestArgumentsSchema,
  AttachResponse: attachResponseSchema,
  RestartArguments: restartArgumentsSchema,
  RestartResponse: restartResponseSchema,
  DisconnectArguments: disconnectArgumentsSchema,
  DisconnectResponse: disconnectResponseSchema,
  TerminateArguments: terminateArgumentsSchema,
  TerminateResponse: terminateResponseSchema,
  DataBreakpointInfoArguments: dataBreakpointInfoArgumentsSchema,
  ContinueArguments: continueArgumentsSchema,
  ContinueResponse: continueResponseSchema,
  NextResponse: nextResponseSchema,
  StepInResponse: stepInResponseSchema,
  StepOutResponse: stepOutResponseSchema,
  StepBackResponse: stepBackResponseSchema,
  ReverseContinueArguments: reverseContinueArgumentsSchema,
  ReverseContinueResponse: reverseContinueResponseSchema,
  RestartFrameArguments: restartFrameArgumentsSchema,
  RestartFrameResponse: restartFrameResponseSchema,
  GotoArguments: gotoArgumentsSchema,
  GotoResponse: gotoResponseSchema,
  PauseArguments: pauseArgumentsSchema,
  PauseResponse: pauseResponseSchema,
  ScopesArguments: scopesArgumentsSchema,
  SetVariableResponse: setVariableResponseSchema,
  SourceResponse: sourceResponseSchema,
  ThreadsRequest: threadsRequestSchema,
  TerminateThreadsArguments: terminateThreadsArgumentsSchema,
  TerminateThreadsResponse: terminateThreadsResponseSchema,
  ModulesArguments: modulesArgumentsSchema,
  LoadedSourcesArguments: loadedSourcesArgumentsSchema,
  StepInTargetsArguments: stepInTargetsArgumentsSchema,
  CompletionsArguments: completionsArgumentsSchema,
  ExceptionInfoArguments: exceptionInfoArgumentsSchema,
  ReadMemoryArguments: readMemoryArgumentsSchema,
  ReadMemoryResponse: readMemoryResponseSchema,
  WriteMemoryArguments: writeMemoryArgumentsSchema,
  WriteMemoryResponse: writeMemoryResponseSchema,
  DisassembleArguments: disassembleArgumentsSchema,
  LocationsArguments: locationsArgumentsSchema,
  ExceptionBreakpointsFilter: exceptionBreakpointsFilterSchema,
  Message: messageSchema,
  Module: moduleSchema,
  ColumnDescriptor: columnDescriptorSchema,
  Thread: threadSchema,
  VariablePresentationHint: variablePresentationHintSchema,
  BreakpointLocation: breakpointLocationSchema,
  SourceBreakpoint: sourceBreakpointSchema,
  FunctionBreakpoint: functionBreakpointSchema,
  DataBreakpointAccessType: dataBreakpointAccessTypeSchema,
  DataBreakpoint: dataBreakpointSchema,
  InstructionBreakpoint: instructionBreakpointSchema,
  SteppingGranularity: steppingGranularitySchema,
  StepInTarget: stepInTargetSchema,
  GotoTarget: gotoTargetSchema,
  CompletionItemType: completionItemTypeSchema,
  ChecksumAlgorithm: checksumAlgorithmSchema,
  Checksum: checksumSchema,
  ValueFormat: valueFormatSchema,
  StackFrameFormat: stackFrameFormatSchema,
  ExceptionFilterOptions: exceptionFilterOptionsSchema,
  ExceptionBreakMode: exceptionBreakModeSchema,
  ExceptionPathSegment: exceptionPathSegmentSchema,
  InvalidatedAreas: invalidatedAreasSchema,
  BreakpointModeApplicability: breakpointModeApplicabilitySchema,
  ErrorResponse: errorResponseSchema,
  CancelRequest: cancelRequestSchema,
  ModuleEvent: moduleEventSchema,
  InvalidatedEvent: invalidatedEventSchema,
  RunInTerminalRequest: runInTerminalRequestSchema,
  StartDebuggingRequest: startDebuggingRequestSchema,
  InitializeRequest: initializeRequestSchema,
  ConfigurationDoneRequest: configurationDoneRequestSchema,
  LaunchRequest: launchRequestSchema,
  AttachRequest: attachRequestSchema,
  RestartRequest: restartRequestSchema,
  DisconnectRequest: disconnectRequestSchema,
  TerminateRequest: terminateRequestSchema,
  BreakpointLocationsResponse: breakpointLocationsResponseSchema,
  SetFunctionBreakpointsArguments: setFunctionBreakpointsArgumentsSchema,
  DataBreakpointInfoRequest: dataBreakpointInfoRequestSchema,
  DataBreakpointInfoResponse: dataBreakpointInfoResponseSchema,
  SetDataBreakpointsArguments: setDataBreakpointsArgumentsSchema,
  SetInstructionBreakpointsArguments: setInstructionBreakpointsArgumentsSchema,
  ContinueRequest: continueRequestSchema,
  NextArguments: nextArgumentsSchema,
  StepInArguments: stepInArgumentsSchema,
  StepOutArguments: stepOutArgumentsSchema,
  StepBackArguments: stepBackArgumentsSchema,
  ReverseContinueRequest: reverseContinueRequestSchema,
  RestartFrameRequest: restartFrameRequestSchema,
  GotoRequest: gotoRequestSchema,
  PauseRequest: pauseRequestSchema,
  StackTraceArguments: stackTraceArgumentsSchema,
  ScopesRequest: scopesRequestSchema,
  VariablesArguments: variablesArgumentsSchema,
  SetVariableArguments: setVariableArgumentsSchema,
  ThreadsResponse: threadsResponseSchema,
  TerminateThreadsRequest: terminateThreadsRequestSchema,
  ModulesRequest: modulesRequestSchema,
  ModulesResponse: modulesResponseSchema,
  LoadedSourcesRequest: loadedSourcesRequestSchema,
  EvaluateResponse: evaluateResponseSchema,
  SetExpressionArguments: setExpressionArgumentsSchema,
  SetExpressionResponse: setExpressionResponseSchema,
  StepInTargetsRequest: stepInTargetsRequestSchema,
  StepInTargetsResponse: stepInTargetsResponseSchema,
  GotoTargetsResponse: gotoTargetsResponseSchema,
  CompletionsRequest: completionsRequestSchema,
  ExceptionInfoRequest: exceptionInfoRequestSchema,
  ExceptionInfoResponse: exceptionInfoResponseSchema,
  ReadMemoryRequest: readMemoryRequestSchema,
  WriteMemoryRequest: writeMemoryRequestSchema,
  DisassembleRequest: disassembleRequestSchema,
  LocationsRequest: locationsRequestSchema,
  StackFrame: stackFrameSchema,
  Scope: scopeSchema,
  Variable: variableSchema,
  Breakpoint: breakpointSchema,
  CompletionItem: completionItemSchema,
  ExceptionOptions: exceptionOptionsSchema,
  DisassembledInstruction: disassembledInstructionSchema,
  BreakpointMode: breakpointModeSchema,
  OutputEvent: outputEventSchema,
  BreakpointEvent: breakpointEventSchema,
  LoadedSourceEvent: loadedSourceEventSchema,
  BreakpointLocationsArguments: breakpointLocationsArgumentsSchema,
  SetBreakpointsArguments: setBreakpointsArgumentsSchema,
  SetBreakpointsResponse: setBreakpointsResponseSchema,
  SetFunctionBreakpointsRequest: setFunctionBreakpointsRequestSchema,
  SetFunctionBreakpointsResponse: setFunctionBreakpointsResponseSchema,
  SetExceptionBreakpointsArguments: setExceptionBreakpointsArgumentsSchema,
  SetExceptionBreakpointsResponse: setExceptionBreakpointsResponseSchema,
  SetDataBreakpointsRequest: setDataBreakpointsRequestSchema,
  SetDataBreakpointsResponse: setDataBreakpointsResponseSchema,
  SetInstructionBreakpointsRequest: setInstructionBreakpointsRequestSchema,
  SetInstructionBreakpointsResponse: setInstructionBreakpointsResponseSchema,
  NextRequest: nextRequestSchema,
  StepInRequest: stepInRequestSchema,
  StepOutRequest: stepOutRequestSchema,
  StepBackRequest: stepBackRequestSchema,
  StackTraceRequest: stackTraceRequestSchema,
  StackTraceResponse: stackTraceResponseSchema,
  ScopesResponse: scopesResponseSchema,
  VariablesRequest: variablesRequestSchema,
  VariablesResponse: variablesResponseSchema,
  SetVariableRequest: setVariableRequestSchema,
  SourceArguments: sourceArgumentsSchema,
  LoadedSourcesResponse: loadedSourcesResponseSchema,
  EvaluateArguments: evaluateArgumentsSchema,
  SetExpressionRequest: setExpressionRequestSchema,
  GotoTargetsArguments: gotoTargetsArgumentsSchema,
  CompletionsResponse: completionsResponseSchema,
  DisassembleResponse: disassembleResponseSchema,
  LocationsResponse: locationsResponseSchema,
  Capabilities: capabilitiesSchema,
  CapabilitiesEvent: capabilitiesEventSchema,
  InitializeResponse: initializeResponseSchema,
  BreakpointLocationsRequest: breakpointLocationsRequestSchema,
  SetBreakpointsRequest: setBreakpointsRequestSchema,
  SetExceptionBreakpointsRequest: setExceptionBreakpointsRequestSchema,
  SourceRequest: sourceRequestSchema,
  EvaluateRequest: evaluateRequestSchema,
  GotoTargetsRequest: gotoTargetsRequestSchema,
};

export function isDebugAdapterProtocolType<
  T extends keyof typeof DebugAdapterProtocolSchemas,
>(type: T, input: unknown): input is z.infer<(typeof DebugAdapterProtocolSchemas)[T]> {
  return DebugAdapterProtocolSchemas[type].safeParse(input).success;
}
