import {Room, Client} from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { Dispatcher } from "@colyseus/command";
import {OnLeaveCommand} from "./OnLeaveCommand";
import {sharedInstance as roomService} from "./RoomsService";

export class MyRoom extends Room<MyRoomState> {
  dispatcher = new Dispatcher(this);

  async onCreate (options: any) {
    await new Promise((resolve) => {
      setTimeout(()=> {
        resolve()
      },100)
    })

    this.setState(new MyRoomState());
    this.autoDispose = false
    this.roomId = options.roomId
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    client.send(this.state)
  }

  async onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    // allow disconnected client to reconnect into this room until 20 seconds
    await this.allowReconnection(client, 20);
    this.dispatcher.dispatch(new OnLeaveCommand(), {
      room: this,
    });
  }

  onDispose() {
  }

}
