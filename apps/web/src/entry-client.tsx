import { mount, StartClient } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: <vinxi default>
mount(() => <StartClient />, document.getElementById("app")!);
