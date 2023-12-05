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
exports.handleMessageUpdateEvent = void 0;
/**
 * @handler Message Events
 * @related messageUpdate
 */
function handleMessageUpdateEvent(client, oldMessage, newMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        let emitted = false;
        if (!oldMessage.partial && !newMessage.partial) {
            /**
             * @event messagePinned
             * @description Emitted when a message has been pinned.
             * @param {DJS:Message} message The message that was pinned.
             * @example
             * client.on("messagePinned", (message) => {
             *   console.log("This message has been pinned : "+message);
             * });
             */
            if (!oldMessage.pinned && newMessage.pinned) {
                client.emit('messagePinned', newMessage);
                emitted = true;
            }
            /**
             * @event messageContentEdited
             * @description Emitted when a message content has been edited.
             * @param {DJS:Message} message The old message.
             * @param {string} oldContent The message content before it was edited.
             * @param {string} newContent The message content after it was edited.
             * @example
             * client.on("messageContentEdited", (message, oldContent, newContent) => {
             *   console.log("Message '"+message.id+"' has been edited to "+newContent);
             * });
             */
            if (oldMessage.content !== newMessage.content) {
                client.emit('messageContentEdited', newMessage, oldMessage.content, newMessage.content);
                emitted = true;
            }
        }
        /**
         * @event unhandledMessageUpdate
         * @description Emitted when the messageUpdate event is triggered but discord-logs didn't trigger any custom event.
         * @param {DJS:Message} oldMessage The message before the update.
         * @param {DJS:Message} newMessage The message after the update.
         * @example
         * client.on("unhandledMessageUpdate", (oldMessage, newMessage) => {
         *   console.log("Message '"+oldMessage.id+"' was edited but discord-logs couldn't find what was updated...");
         * });
         */
        if (!emitted) {
            client.emit('unhandledMessageUpdate', oldMessage, newMessage);
        }
    });
}
exports.handleMessageUpdateEvent = handleMessageUpdateEvent;
