import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ISessionsState, SessionsType } from "../redux/sessions/types";
import { $api } from "../http";
import { addSessionDto } from "../redux/sessions/types/add-session-dto";

type SubscriberType = (sessions: SessionsType[]) => void;

let connection: HubConnection | null = null;

// const closeHandler = () => {
//   console.log("Close WS");
//   setTimeout(createChanel, 3000);
// };

const sessionsHandler = (e: SessionsType, callback: any) => {
  const newSessions = e;
  callback(newSessions);
};

async function createChanel() {
  if (connection === null) {
    connection = new HubConnectionBuilder()
      .withUrl("http://reddit-bot-rest-api.herokuapp.com/ws/front")
      .withAutomaticReconnect()
      .build();
  }
}

export const sessionsAPI = {
  async start() {
    await createChanel();
    try {
      await connection?.start();
    } catch (e) {
      console.log("Connection failed: ", e);
      setTimeout(this.start, 5000);
    }
  },
  stop() {
    connection?.stop();
  },
  async subscribe(callback: SubscriberType) {
    await connection?.on("UpdateStatus", (e) => sessionsHandler(e, callback));
  },
  async unsubscribe() {
    await connection?.onclose((e) => console.log("Connection closed..."));
  },
};

export const getSessions = async () => {
  const response = await $api.get<ISessionsState>("Session/getSession");
  return response.data;
};

export const getSessionUsers = async () => {
  const response = await $api.get("Session/getUsers");
  return response.data;
};

export const getSessionPresets = async () => {
  const response = await $api.get("Session/getPresets");
  return response.data;
};

export const postAddSession = async (dto: addSessionDto) => {
  const response = await $api.post("Session/create", dto);
  return response.data;
};

export const startSession = async (dto: number[]) => {
  const response = await $api.put("Session/startSession", dto);
  return response.data;
};

export const stopSession = async (dto: number[]) => {
  const response = await $api.put("Session/stopSession", dto);
  return response.data;
};
