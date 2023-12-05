"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChannelUpdateEvent = void 0;
const discord_js_1 = require("discord.js");
/**
 * @handler Channel Events
 * @related channelUpdate
 */
function handleChannelUpdateEvent(client, oldChannel, newChannel) {
    return __awaiter(this, void 0, void 0, function* () {
        let emitted = false;
        if (Object.prototype.hasOwnProperty.call(oldChannel, 'guild')) {
            /**
             * @event guildChannelPermissionsUpdate
             * @description Emitted when channel permissions are updated.
             * @param {DJS:GuildChannel} channel The channel whose permissions have been updated.
             * @param {DJS:PermissionOverwrites} oldPermissions Collection of old PermissionOverwrites.
             * @param {DJS:PermissionOverwrites} newPermissions Collection of new PermissionOverwrites.
             * @example
             * client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
             *   console.log(channel.name+"'s permissions updated!");
             * });
             */
            if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
                client.emit('guildChannelPermissionsUpdate', newChannel, oldChannel.permissionOverwrites, newChannel.permissionOverwrites);
                emitted = true;
            }
            /**
             * @event guildChannelTopicUpdate
             * @description Emitted when a channel topic changes.
             * @param {DJS:GuildChannel} channel The channel whose topic have been updated.
             * @param {string} oldTopic The old channel topic.
             * @param {string} newTopic The new channel topic.
             * @example
             * client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
             *   console.log(channel.name+"'s topic changed to " + newTopic +"!");
             * });
             */
            if (oldChannel.type === discord_js_1.ChannelType.GuildText &&
                oldChannel.topic !== newChannel.topic) {
                client.emit('guildChannelTopicUpdate', newChannel, oldChannel.topic, newChannel.topic);
                emitted = true;
            }
        }
        /**
         * @event unhandledGuildChannelUpdate
         * @description Emitted when the guildChannelUpdate event is triggered but discord-logs didn't trigger any custom event.
         * @param {DJS:GuildChannel} oldChannel The channel before the update.
         * @param {DJS:GuildChannel} newChannel The channel after the update.
         * @example
         * client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
         *   console.log("Channel '"+oldChannel.id+"' was edited but discord-logs couldn't find what was updated...");
         * });
         */
        if (!emitted) {
            client.emit('unhandledGuildChannelUpdate', oldChannel, newChannel);
        }
    });
}
exports.handleChannelUpdateEvent = handleChannelUpdateEvent;
