import { createAsync } from "@solidjs/router";
import { createContext, type ParentProps, useContext } from "solid-js";
import { querySession } from "~/server/auth";

interface AuthValue {
  user: () =>
    | { id: number; username: string; displayname: string | null }
    | null
    | undefined;
  signedIn: () => boolean;
}

const Context = createContext<AuthValue>();

export default function AuthProvider(props: ParentProps) {
  const user = createAsync(() => querySession(), { deferStream: true });
  const signedIn = () => Boolean(user()?.id);

  return (
    <Context.Provider value={{ user, signedIn }}>
      {props.children}
    </Context.Provider>
  );
}

export function useAuth() {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth must be used within Auth context");
  return context;
}
