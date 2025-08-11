type EventType = "login" | "logout";

type EventPayloads = {
  login: { name: string; surname: string };
  logout: { name: string; reason: string };
};

type EventCallbacks = {
  [K in EventType]: Set<(payload: EventPayloads[K]) => void>;
};

const eventMap: Partial<EventCallbacks> = {};

type UseEventBusResult = {
  on: <K extends EventType>(event: K, callback: (payload: EventPayloads[K]) => void) => void;
  off: <K extends EventType>(event: K, callback: (payload: EventPayloads[K]) => void) => void;
  emit: <K extends EventType>(event: K, payload: EventPayloads[K]) => void;
};

const useEventBus = (): UseEventBusResult => ({
  on: (event, callback) => {
    const currentSet = eventMap[event] ?? new Set();
    currentSet.add(callback);
    (eventMap[event] as Set<typeof callback>) = currentSet;
  },
  off: (event, callback) => {
    eventMap[event]?.delete(callback);
  },
  emit: (event, payload) => {
    eventMap[event]?.forEach((cb) => cb(payload));
  },
});

export default useEventBus;
