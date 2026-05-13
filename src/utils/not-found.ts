import { useNavigate } from "@solidjs/router";
import { NOT_FOUND_PATH } from "~/utils/constants";

export function useNotFound(shouldRedirect: boolean) {
  const navigate = useNavigate();
  if (shouldRedirect) navigate(NOT_FOUND_PATH);
}
