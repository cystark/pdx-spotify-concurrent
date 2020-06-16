import SpotifyWebApi from "spotify-web-api-node";

// const staticResults = [
//   {
//     artist: "Sarah Blasko",
//     song: "Winds",
//     url: "https://url.com",
//   },
//   {
//     artist: "Neil Young",
//     song: "Harvest Moon",
//     url: "https://url.com",
//   },
//   {
//     artist: "Jimmy Page",
//     song: "Check this page",
//     url: "https://url.com",
//   },
// ];

// credentials are optional
const getArtistString = (item) =>
  `${item.album.artists.map((artist) => artist.name).join(", ")}`;
// const getSpotifyTrackId = (data) => data.tracks.items.map((item) => item.uri);

const getSpotifyTrackData = (data) =>
  data.tracks.items.map((item) => ({
    artist: getArtistString(item),
    song: item.name,
    url: item.external_urls.spotify,
  }));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
});
spotifyApi.setAccessToken(process.env.REACT_APP_SPOTIFY_AUTH_CODE);

const runSpotifySearch = (query) => {
  return new Promise((resolve) => {
    spotifyApi.searchTracks(query).then(
      function (data) {
        setTimeout(() => {
          resolve(getSpotifyTrackData(data.body));
        }, 2000);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  });
};

export const getSongsData = async (search) => runSpotifySearch(search);
