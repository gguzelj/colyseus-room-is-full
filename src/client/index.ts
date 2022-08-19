import * as Colyseus from "colyseus.js";
import {Room} from "colyseus.js";

const client = new Colyseus.Client('ws://localhost:2567');
const ROOM_NAME = 'my_room'
const ROOM_ID = 'room-id'

async function connect(): Promise<Room> {
    let room
    try {
        console.log("creating room")
        room = await client.create(ROOM_NAME, {roomId: ROOM_ID})
    } catch (error) {
        console.error('Unexpected error while creating room', error)
    }
    return room
}

async function main() {
 void connect()
 void connect()
}

void main()


