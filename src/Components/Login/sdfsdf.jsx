const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "ffbc598a32f044ab935465bbf1cb48c5";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private","user-library-modify","playlist-modify-private","playlist-modify-public","ugc-image-upload","playlist-modify-public","playlist-modify-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
