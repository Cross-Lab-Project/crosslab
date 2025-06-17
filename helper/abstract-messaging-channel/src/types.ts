import z from 'zod';

const MessageSchema = z.object({
  type: z.string(),
  content: z.unknown(),
});
export type Message = z.infer<typeof MessageSchema>;
export function isMessage(input: unknown): input is Message {
  return MessageSchema.safeParse(input).success;
}

export type MessagingProtocol<M extends string = string, R extends string = string> = {
  messageTypes: M[];
  roles: R[];
  messages: {
    [k in M]: z.Schema;
  };
  roleMessages: {
    [k in R]: {
      incoming: M[];
      outgoing: M[];
    };
  };
};

export type MessageType<MP extends MessagingProtocol> = MP['messageTypes'][number];

export type Role<MP extends MessagingProtocol | undefined = undefined> =
  MP extends MessagingProtocol ? MP['roles'][number] : string;

export type _ProtocolMessage<
  MP extends MessagingProtocol,
  M extends MessageType<MP>[],
> = M extends [infer H, ...infer T]
  ? H extends MessageType<MP>
    ? T extends MessageType<MP>[]
      ? { type: H; content: z.infer<MP['messages'][H]> } | _ProtocolMessage<MP, T>
      : never
    : never
  : never;

export type ProtocolMessage<
  MP extends MessagingProtocol,
  MT extends MessageType<MP> | undefined = undefined,
> =
  MT extends MessageType<MP>
    ? { type: MT; content: z.infer<MP['messages'][MT]> }
    : _ProtocolMessage<MP, MP['messageTypes']>;

export type IncomingMessage<
  MP extends MessagingProtocol | undefined = undefined,
  R extends Role<MP> | undefined = undefined,
> = MP extends MessagingProtocol
  ? R extends Role<MP>
    ? _ProtocolMessage<MP, MP['roleMessages'][R]['incoming']>
    : ProtocolMessage<MP>
  : Message;

export type OutgoingMessage<
  MP extends MessagingProtocol | undefined = undefined,
  R extends Role<MP> | undefined = undefined,
> = MP extends MessagingProtocol
  ? R extends Role<MP>
    ? _ProtocolMessage<MP, MP['roleMessages'][R]['outgoing']>
    : ProtocolMessage<MP>
  : Message;

export function isIncomingMessage<
  MP extends MessagingProtocol | undefined,
  R extends Role<MP> | undefined,
>(protocol: MP, role: R, message: unknown): message is IncomingMessage<MP, R> {
  if (!isMessage(message)) return false;
  if (!protocol) return true;
  if (!protocol.messageTypes.includes(message.type)) return false;
  if (!role) {
    const result = protocol.messages[message.type].safeParse(message.content);
    if (!result.success) {
      console.log(JSON.stringify(result, null, 4));
    }
    return result.success;
  }
  if (!protocol.roleMessages[role].incoming.includes(message.type)) return false;

  const result = protocol.messages[message.type].safeParse(message.content);
  if (!result.success) {
    console.log(JSON.stringify(result, null, 4));
  }
  return result.success;
}

export function isOutgoingMessage<
  MP extends MessagingProtocol | undefined,
  R extends Role<MP> | undefined,
>(protocol: MP, role: R, message: unknown): message is OutgoingMessage<MP, R> {
  if (!isMessage(message)) return false;
  if (!protocol) return true;
  if (!protocol.messageTypes.includes(message.type)) return false;
  if (!role) {
    const result = protocol.messages[message.type].safeParse(message.content);
    if (!result.success) {
      console.log(JSON.stringify(result, null, 4));
    }
    return result.success;
  }
  if (!protocol.roleMessages[role].outgoing.includes(message.type)) return false;

  const result = protocol.messages[message.type].safeParse(message.content);
  if (!result.success) {
    console.log(JSON.stringify(result, null, 4));
  }
  return result.success;
}

export function isProtocolMessage<
  MP extends MessagingProtocol,
  MT extends MessageType<MP> | undefined = undefined,
>(protocol: MP, messageType: MT, message: unknown): message is ProtocolMessage<MP, MT> {
  if (!isMessage(message)) return false;
  if (messageType && messageType !== message.type) return false;
  if (!protocol.messageTypes.includes(message.type)) return false;

  const result = protocol.messages[message.type].safeParse(message.content);
  if (!result.success) {
    console.log(JSON.stringify(result, null, 4));
  }
  return result.success;
}
