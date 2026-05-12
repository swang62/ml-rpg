import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export function useNotFound(shouldRedirect: () => unknown) {
  const navigate = useNavigate();
  createEffect(() => {
    if (shouldRedirect()) navigate("/404");
  });
}
