import path from "path";
import catchAsync from "../helpers/catchAsync";
import { ChatModel, CustomRequest, CustomResponse, UserModel } from "../types";
import { NextFunction } from "express";
import { readFile, writeFile } from "../helpers/readWrite";
import AppResponse from "../helpers/AppResponse";
import { commonResponseMessages } from "../data/constants";
import { generateRandomId } from "../helpers/generateRandomId";

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

export const createUserChat = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { recipientId } = req.body;

    // Cant add itself to chat
    if (recipientId === req.userId) {
      return next(new AppResponse(commonResponseMessages.CANNOT_ADD));
    }

    const userData: UserModel = await readFile();

    const chatData: ChatModel = await readFile(chatPath);

    const user = userData.users.find(
      (userDetail: any) => userDetail.id === recipientId
    );

    const checkIfChatExists = chatData.chats.findIndex(
      (chat) =>
        chat.participantId.includes(recipientId) &&
        chat.participantId.includes(req.userId) &&
        !chat.isGroupChat
    );

    if (checkIfChatExists !== -1) {
      return next(new AppResponse("Dont Create New"));
    }

    const payload = {
      id: generateRandomId(21),
      participantId: [req.userId, recipientId],
      participantName: [req.user?.username, user?.username],
      isGroupChat: false,
      messages: [], // initializing an empty message array
    };

    chatData.chats.push(payload);

    await writeFile(JSON.stringify(chatData), chatPath);

    return next(
      new AppResponse(commonResponseMessages.FETCHED_SUCCESSFULLY, chatData)
    );
  }
);
