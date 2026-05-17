/// <reference types="@solidjs/start/env" />

declare module "@fontsource-variable/plus-jakarta-sans";
declare module "@fontsource/press-start-2p";

declare module "@solidjs/start/http" {
  export interface SessionConfig {
    password: string;
    name?: string;
    cookie?: {
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
      maxAge?: number;
      path?: string;
    };
  }

  export type SessionUpdate<T> =
    | Partial<T>
    | ((oldData: T) => Partial<T> | undefined);

  export function useSession<T extends Record<string, any>>(
    config: SessionConfig,
  ): Promise<{
    readonly id: string | undefined;
    readonly data: T;
    update: (update: SessionUpdate<T>) => Promise<any>;
    clear: () => Promise<any>;
  }>;
}
