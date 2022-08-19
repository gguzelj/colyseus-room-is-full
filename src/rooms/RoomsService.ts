import type { RegisteredHandler } from 'colyseus'
import {MyRoom} from "./MyRoom";

class RoomService {
    private activeRoomsById = new Map<string, MyRoom>()

    watchChanges(handler: RegisteredHandler) {
        handler.on('create', (room: MyRoom) => {
            if (this.activeRoomsById.has(room.roomId)) {
                console.info('Room already created...')
                void room.disconnect()
                return
            }
            this.activeRoomsById.set(room.roomId, room)
        })

        handler.on('dispose', (room: MyRoom) => {
            console.info(`removing itself from OrgRoomsService`)
            this.activeRoomsById.delete(room.roomId)
        })
    }
}

const sharedInstance = new RoomService()

;(globalThis as any).orgRooms = sharedInstance

export { sharedInstance }
