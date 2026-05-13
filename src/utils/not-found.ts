import { useNavigate } from "@solidjs/router";

export function useNotFound(shouldRedirect: boolean) {
  const navigate = useNavigate();
  if (shouldRedirect) navigate("/404");
}
