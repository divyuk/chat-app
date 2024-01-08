import path from "path";
import catchAsync from "../helpers/catchAsync";
import { ChatModel, CustomRequest, CustomResponse } from "../types";
import { NextFunction } from "express";
import { readFile } from "../helpers/readWrite";
import AppResponse from "../helpers/AppResponse";
import { commonResponseMessages } from "../data/constants";

const chatPath = path.join(__dirname, "..", "data", "chat.json");

export const fetchChatHistory = catchAsync(
  async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    // Read chat data
    const chatData: ChatModel = await readFile(chatPath);

    const chatHistory = chatData.chats.filter((chat) =>
      chat.participantId.includes(req.userId)
    );

    if (chatHistory && chatHistory.length === 0) {
      throw next(new AppResponse(commonResponseMessages.NO_DATA_FOUND));
    }

    return next(
      new AppResponse(commonResponseMessages.FETCHED_SUCCESSFULLY, chatHistory)
    );
  }
);
