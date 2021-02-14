import { Client, ClientOptions, Collection } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import BaseCommand from "../utils/structures/BaseCommand";
import { io, Socket } from "socket.io-client";

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = ".";
  private _io: Socket = io("http://localhost:4000");

  constructor(options?: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }
  get events(): Collection<string, BaseEvent> {
    return this._events;
  }
  get prefix(): string {
    return this._prefix;
  }
  get io(): Socket {
    return this._io;
  }

  set prefix(prefix: string) {
    this._prefix = prefix;
  }
}
