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
exports.handleRoleUpdateEvent = void 0;
/**
 * @handler Role Events
 * @related roleUpdate
 */
function handleRoleUpdateEvent(client, oldRole, newRole) {
    return __awaiter(this, void 0, void 0, function* () {
        let emitted = false;
        /**
         * @event rolePositionUpdate
         * @description Emitted when a role position changes.
         * @param {DJS:Role} role The role whose position has changed.
         * @param {number} oldPosition The old role position.
         * @param {number} newPosition The new role position.
         * @example
         * client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
         *   console.log(role.name + " was at position "+oldPosition+" and now is at position "+newPosition);
         * });
         */
        if (oldRole.rawPosition !== newRole.rawPosition) {
            client.emit('rolePositionUpdate', newRole, oldRole.rawPosition, newRole.rawPosition);
            emitted = true;
        }
        /**
         * @event rolePermissionsUpdate
         * @description Emitted when a role permissions changes.
         * @param {DJS:Role} role The role whose permissions has changed.
         * @param {number} oldPermissions The old role permissions.
         * @param {number} newPermissions The new role permissions.
         * @example
         * client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
         *   console.log(role.name + " had as permissions "+oldPermissions+" and now has as permissions "+newPermissions);
         * });
         */
        if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
            client.emit('rolePermissionsUpdate', newRole, oldRole.permissions.bitfield, newRole.permissions.bitfield);
            emitted = true;
        }
        /**
         * @event unhandledRoleUpdate
         * @description Emitted when the roleUpdate event is triggered but discord-logs didn't trigger any custom event.
         * @param {DJS:Role} oldRole The role before the update.
         * @param {DJS:Role} newRole The role after the update.
         * @example
         * client.on("unhandledRoleUpdate", (oldRole, newRole) => {
         *   console.log("Role '"+oldRole.id+"' was updated but discord-logs couldn't find what was updated...");
         * });
         */
        if (!emitted) {
            client.emit('unhandledRoleUpdate', oldRole, newRole);
        }
    });
}
exports.handleRoleUpdateEvent = handleRoleUpdateEvent;
