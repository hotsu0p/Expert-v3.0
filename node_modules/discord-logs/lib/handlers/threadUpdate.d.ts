import { Client, ThreadChannel } from 'discord.js';
/**
 * @handler Thread Channel Events
 * @related threadUpdate
 */
export declare function handleThreadChannelUpdateEvent(client: Client, oldThread: ThreadChannel, newThread: ThreadChannel): Promise<void>;
