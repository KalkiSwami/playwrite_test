import { test, expect } from "../fixtures/base.fixture";
import { songsList } from "../data/songs-data";

test.describe("App tests", () => {
  test("search functionality filters tracks by name", async ({ appPage }) => {
    for (const song of songsList.songs) {
      await appPage.typeSongTitle(song);
      await appPage.checkSearchedSongs(song);
    }
  });
  test("should add track to playlist when clicking Plus button", async ({ appPage }) => {
    await appPage.checkRandomSongAddedToPlaylist();
  });
  test("should match total duration of songs in Playlist", async ({ appPage }) => {
    await appPage.addRandomSongsToPlaylist();
    await appPage.addRandomSongsToPlaylist();
    await appPage.checkTotalPlaylistDuration();
  });
});
