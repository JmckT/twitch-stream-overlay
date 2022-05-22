import { RefreshingAuthProvider } from "@twurple/auth";
import { promises as fs } from "fs";

const clientId = (await fs.readFile("/home/sarah/.twitch_client_id"))
  .toString()
  .trim();
const clientSecret = (await fs.readFile("/home/sarah/.twitch_client_secret"))
  .toString()
  .trim();
const tokenData = JSON.parse((await fs.readFile("./tokens.json")).toString());
// const tokenData = {
//   accessToken: (await fs.readFile("/home/sarah/.twitch_access_token"))
//     .toString()
//     .trim(),
//   refreshToken: (await fs.readFile("/home/sarah/.twitch_refresh"))
//     .toString()
//     .trim(),
// };
const authProvider = new RefreshingAuthProvider(
  {
    clientId,
    clientSecret,
    onRefresh: async (newTokenData) =>
      await fs.writeFile(
        "./tokens.json",
        JSON.stringify(newTokenData, null, 4)
      ),
  },
  tokenData
);

authProvider.refresh();
//authProvider.getAccessToken(scopes);
