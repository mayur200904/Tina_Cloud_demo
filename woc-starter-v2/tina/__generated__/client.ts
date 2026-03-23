import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '6e122eefc0648b97748519ce4b6c8b678283185d', queries,  });
export default client;
  