import { Emitter } from "subscribe";

export const eventbus = new Emitter<"calendar:new">();
