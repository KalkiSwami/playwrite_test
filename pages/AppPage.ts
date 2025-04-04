import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { HeaderComponent } from "./components/HeaderComponent";
import { convertToSeconds } from "../utils/helper";

export class AppPage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  get searchInput(): Locator {
    return this.page.locator("//input[following-sibling::fieldset[1]]");
  }

  get searchedTrackList(): Locator {
    return this.page.locator("#tracklist > div > div");
  }

  get songRows(): Locator {
    return this.page.locator("#tracklist > div > div:has(button:has-text('+'))");
  }

  get playlistRows(): Locator {
    return this.page.locator("#playlist > div > div");
  }

  get playlistDuration(): Locator {
    return this.page.locator("#playlist-duration");
  }

  async typeSongTitle(songName: string) {
    await this.searchInput.fill(songName);
  }

  async checkSearchedSongs(songName: string) {
    const tracklistCount = await this.searchedTrackList.count();
    for (let i = 0; i < tracklistCount; i++) {
      const actualText = (await this.searchedTrackList.nth(i).textContent())?.trim() || "";
      expect(actualText.toLowerCase()).toContain(songName.toLowerCase());
    }
  }
  async addRandomSongsToPlaylist() {
    const songCount = await this.songRows.count();
    const randomIndex = Math.floor(Math.random() * songCount);
    const randomSongRow = this.songRows.nth(randomIndex);
    await randomSongRow.locator('button:has-text("+")').click();
  }
  async checkTotalPlaylistDuration() {
    const playlistCount = await this.playlistRows.count();
    let totalDuration = 0;
    for (let i = 0; i < playlistCount; i++) {
      const song = this.playlistRows.nth(i).locator("div >> p").nth(1);
      const songDuration = (await song.textContent())?.trim() || "";
      const seconds = convertToSeconds(songDuration);
      totalDuration += seconds;
    }

    const playlistDurationText = await this.playlistDuration.textContent();
    expect(playlistDurationText).toBe(totalDuration.toString());
  }
  async checkRandomSongAddedToPlaylist() {
    const songCount = await this.songRows.count();
    const randomIndex = Math.floor(Math.random() * songCount);
    const randomSongRow = this.songRows.nth(randomIndex);
    const songName = await randomSongRow.locator("div >> p").first().textContent();
    await randomSongRow.locator('button:has-text("+")').click();
    const playlistSong = this.playlistRows.nth(0);
    const playlistSongName = await playlistSong.locator("div >> p").first().textContent();

    expect(playlistSongName?.trim()).toBe(songName);
  }
}
