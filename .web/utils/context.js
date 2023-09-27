import { createContext } from "react"
import { Event, hydrateClientStorage } from "/utils/state.js"

export const initialState = {"chat_titles": ["Intros"], "chats": {"Intros": [[["question", "What is your name?"], ["answer", "Mohammad"]]]}, "current_chat": "Intros", "drawer_open": false, "is_hydrated": false, "modal_open": false, "new_chat_name": "", "processing": false, "question": ""}
export const StateContext = createContext(null);
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}
export const initialEvents = [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
]