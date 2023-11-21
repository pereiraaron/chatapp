import axios from "axios";
import { MessageGroup, MessageType } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;
const APIKey = process.env.REACT_APP_API_KEY;

export const regexPatterns = {
  hasTouchScreen:
    /\b(BlackBerry|webOS|iPhone|IEMobile|Android|Windows Phone|iPad|iPod)\b/i,
};

/**
 * Returns if the device type is mobile or not (desktop)
 * @return {boolean} true/false      Returns if the device is mobile or not
 */
export const isMobile = (): boolean => {
  let hasTouchScreen = false;
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = (navigator as any).msMaxTouchPoints > 0;
  } else {
    const mQ = (window as any).matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true;
    } else {
      var UA = (navigator as any).userAgent;
      hasTouchScreen = regexPatterns.hasTouchScreen.test(UA);
    }
  }
  if (hasTouchScreen) {
    return true;
  }
  return false;
};

/**
 * Returns formatted date
 * @return {string}      Returns formatted date
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hour = date.getHours() > 12 ? 24 - date.getHours() : date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const zone = date.getHours() > 12 ? "pm" : "am";
  return `${hour}:${minutes}${zone}`;
};

/**
 * Method to check if the passed string contains any Emojis
 * @param {string} endPoint               endpoint where api call needs to be made
 *
 * @param {string} method                  type of api call
 *
 * @param {any} body                       body of the request
 *
 * @return {any} data        Returns response from the server
 */

export const sendRequest = async (
  endPoint: string,
  method: "GET" | "POST" | "DELETE",
  body?: any
) => {
  const config = {
    method: method.toLowerCase(),
    url: `${baseUrl}${endPoint}`,
    headers: { Authorization: `${APIKey}` },
    data: body || null,
  };
  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `${error.response.status} - ${error.response.statusText}`
      );
    } else {
      throw new Error("Request failed");
    }
  }
};

export const parseMessages = (data: any) => {
  if (!Boolean(data?.length)) return [];

  let messages: MessageType[] = [];

  data.forEach((value: any) => {
    const message: MessageType = {
      id: value.id,
      content: value?.text ?? "",
      userId: value?.source ?? "",
      timestamp: value.timestamp,
    };
    messages.push(message);
  });
  return messages;
};

export const groupedMessages = (messages: any) => {
  const data: MessageGroup = {};
  messages.map((message: MessageType) => {
    const date = new Date(message.timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    data[date] = data[date] || [];
    data[date].push(message);
  });
  return data;
};

export const formatDateDivider = (date: string) => {
  const currentDate: any = new Date();
  const messageDate: any = new Date(date);
  const diffInDays = Math.floor(
    (currentDate - messageDate) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays > 1 && diffInDays <= 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[messageDate.getDay()];
  } else {
    return date;
  }
};
