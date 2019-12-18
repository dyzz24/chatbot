import { ADD_COMMAND, ADD_BOT_ANSWER } from "../constants/action-types";

export function addCommand(botCommand) {
  return { type: ADD_COMMAND, botCommand }
};

export function addBotAnswer(answer) {
  return { type: ADD_BOT_ANSWER, answer }
};