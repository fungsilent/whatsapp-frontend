import { useAppStore } from "#root/app/store";
import useFetch from "#root/hooks/useFetch";

function ApiTest() {
  const { user } = useAppStore();

  return { user };
}

export default ApiTest;
