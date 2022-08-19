import { Command } from "@colyseus/command";
import {MyRoom} from "./MyRoom";

export class OnLeaveCommand extends Command<MyRoom, {
    room: MyRoom
}> {

    async execute() {
        // setTimeout(async () => {
        //     await this.room.disconnect()
        // }, 10500)

    }

}