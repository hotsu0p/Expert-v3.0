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
exports.handlePresenceUpdateEvent = void 0;
/**
 * @handler Presence Events
 * @related presenceUpdate
 */
function handlePresenceUpdateEvent(client, oldPresence, newPresence) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!oldPresence)
            return;
        let emitted = false;
        /**
         * @event guildMemberOffline
         * @description Emitted when a member becomes offline.
         * @param {DJS:GuildMember} member The member who became offline.
         * @param {DJST:Status} oldStatus The old member status, it can be "dnd", "idle" or "online".
         * @example
         * client.on("guildMemberOffline", (member, oldStatus) => {
         *   console.log(member.user.tag+" became offline!");
         * });
         */
        if (oldPresence.status !== 'offline' && newPresence.status === 'offline') {
            client.emit('guildMemberOffline', newPresence.member, oldPresence.status);
            emitted = true;
        }
        /**
         * @event guildMemberOnline
         * @description Emitted when a member becomes online, dnd or idle.
         * @param {DJS:GuildMember} member The member who became online.
         * @param {DJST:Status} newStatus The new member status, it can be "dnd", "idle" or "online".
         * @example
         * client.on("guildMemberOnline", (member, newStatus) => {
         *   console.log(member.user.tag+" was offline and is now "+newStatus+"!");
         * });
         */
        if (oldPresence.status === 'offline' && newPresence.status !== 'offline') {
            client.emit('guildMemberOnline', newPresence.member, newPresence.status);
            emitted = true;
        }
        /**
         * @event unhandledPresenceUpdate
         * @description Emitted when the presenceUpdate event is triggered but discord-logs didn't trigger any custom event.
         * @param {DJS:Presence} oldPresence The presence before the update.
         * @param {DJS:Presence} newPresence The presence after the update.
         * @example
         * client.on("unhandledPresenceUpdate", (oldPresence, newPresence) => {
         *   console.log("Presence for member "+oldPresence.member.user.tag+"' was updated but discord-logs couldn't find what was updated...");
         * });
         */
        if (!emitted) {
            client.emit('unhandledPresenceUpdate', oldPresence, newPresence);
        }
    });
}
exports.handlePresenceUpdateEvent = handlePresenceUpdateEvent;
