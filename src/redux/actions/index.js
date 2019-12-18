import { ADD_COMMAND } from "../constants/action-types";

export function addCommand(botCommand) {
  return { type: ADD_COMMAND, botCommand }
};