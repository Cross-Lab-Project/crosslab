import { ServiceConfig } from '../generated/device/types'

/**
 * This interface describes a generic message.
 */
export interface Message {
    messageType: string
    [key: string]: any
}
/**
 * This function checks if an object is a {@link Message}.
 * @param object The object to be checked.
 * @returns True if the object is a {@link Message}, else false.
 */
export function isMessage(object: object): object is Message {
    return 'messageType' in object
}

/**
 * This interface describes a {@link Message} used for commands.
 */
export interface CommandMessage extends Message {
    messageType: 'command'
    command: string
}
/**
 * This function checks if a {@link Message} is a {@link CommandMessage}.
 * @param message The {@link Message} to be checked.
 * @returns True if the object is a {@link CommandMessage}, else false.
 */
export function isCommandMessage(message: Message): message is CommandMessage {
    return (
        message.messageType === 'command' &&
        message.command &&
        typeof message.command === 'string'
    )
}

/**
 * This interface describes a {@link CommandMessage} to create a peerconnection.
 */
export interface CreatePeerConnectionMessage extends CommandMessage {
    command: 'createPeerConnection'
    connectiontype: string
    url: string
    services: ServiceConfig[]
    tiebreaker: boolean
}
/**
 * This function checks if a {@link CommandMessage} is a {@link CreatePeerConnectionMessage}.
 * @param commandMessage The {@link CommandMessage} to be checked.
 * @returns True if the {@link CommandMessage} is a {@link CreatePeerConnectionMessage}, else false.
 */
export function isCreatePeerConnectionMessage(
    commandMessage: CommandMessage
): commandMessage is CreatePeerConnectionMessage {
    return (
        commandMessage.command === 'createPeerConnection' &&
        commandMessage.connectiontype &&
        typeof commandMessage.connectiontype === 'string' &&
        commandMessage.url &&
        typeof commandMessage.url === 'string' &&
        commandMessage.services && // TODO: maybe add function to validate services
        commandMessage.tiebreaker &&
        typeof commandMessage.tiebreaker === 'boolean'
    )
}

/**
 * This interface describes a {@link Message} used for signaling during the establishment of a peerconnection.
 */
export interface SignalingMessage extends Message {
    messageType: 'signaling'
    signalingType: 'offer' | 'answer' | 'candidate'
    connectionUrl: string
    content?: {
        [key: string]: unknown
    }
}
/**
 * This function checks if a {@link Message} is a {@link SignalingMessage}.
 * @param message The {@link Message} to be checked.
 * @returns True if the {@link Message} is a {@link SignalingMessage}, else false.
 */
export function isSignalingMessage(message: Message): message is SignalingMessage {
    return (
        message.messageType === 'signaling' &&
        message.connectionUrl &&
        typeof message.connectionUrl === 'string'
    )
}

/**
 * This interface describes a {@link Message} used for authenticating the websocket connection of a device.
 */
export interface AuthenticationMessage extends Message {
    messageType: 'authenticate'
    url: string
    token?: string
    authenticated?: boolean
}
/**
 * This function checks if a {@link Message} is an {@link AuthenticationMessage}.
 * @param message The {@link Message} to be checked.
 * @returns True if the {@link Message} is an {@link AuthenticationMessage}, else false.
 */
export function isAuthenticationMessage(
    message: Message
): message is AuthenticationMessage {
    return (
        message.messageType === 'authenticate' &&
        message.url &&
        typeof message.url === 'string' &&
        (message.token ? typeof message.token === 'string' : true) &&
        (message.authenticated ? typeof message.authenticated === 'boolean' : true)
    )
}

// TODO: check if this message is really needed and if it needs to be a command message.
/**
 * This interface describes a {@link CommandMessage} used for closing a connection.
 */
export interface CloseMessage extends CommandMessage {
    messageType: 'command'
    command: 'close'
    connectionUrl: string
}
/**
 * This function checks if a {@link CommandMessage} is a {@link CloseMessage}.
 * @param commandMessage The {@link CommandMessage} to be checked.
 * @returns True if the {@link CommandMessage} is a {@link CloseMessage}.
 */
export function isCloseMessage(
    commandMessage: CommandMessage
): commandMessage is CloseMessage {
    return (
        commandMessage.command === 'close' &&
        commandMessage.connectionUrl &&
        typeof commandMessage.connectionUrl === 'string'
    )
}
