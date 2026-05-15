import { h, renderToString } from "solid-js/web";

const Test = () => h("div", { class: "test" }, h("code", null, "hello world"));
const html = renderToString(() => h(Test, null));
console.log("RENDERED:", html);
