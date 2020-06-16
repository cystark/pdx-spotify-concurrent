import React, { unstable_useTransition, useState } from "react";
import { getSongsData } from "../api";
import createResource, { createResourceProp } from "./createResource";

export default function useSpotifySearch(search) {
  const [resource, setResource] = useState<createResourceProp | null>(null);
  const [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 4000,
    busyDelayMs: 400,
    busyMinDurationMs: 500,
  });
  React.useLayoutEffect(() => {
    if (!search) {
      return;
    }
    startTransition(() => {
      setResource(createResource(() => getSongsData(search)));
    });
  }, [search]);

  return [resource, isPending];
}
