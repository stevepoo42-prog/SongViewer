# Song Viewer

A small offline-capable web app (PWA) for showing chord charts on an iPad, inspired by OnSong. It opens the text files produced by
ChordClean and **ChordPro** files.

## Features
- **Songs, Books and Sets** (Library): add files from the Files app, build books (subsets) and sets (ordered lists), step through a set with the
  screen edges or a pedal
- Chords above the lyrics, inline `[G]word` (ChordPro), or at the end of the line `[C], [C], [F], [F]`; tap near the top for the controls and pick a
  key: all chords transpose (flats/sharps chosen to suit the key)
- Section colours (Intro, Verse, Chorus, Bridge, Solo, Outro); chords always yellow
- Auto-fit to the screen, long lines wrap onto a ` - ` line, short lines can be joined; text size, spacing and the rest are remembered per song
- Hands-free: auto-scroll, edge taps, pedal keys
- Backup and restore; share sets by AirDrop or as an animated QR code (works offline); print sets or books as PDF
- On a Mac the same app opens in an iPad-shaped preview, and ChordClean.app hosts it in a native window

## ChordPro
Files ending `.cho`, `.crd`, `.chopro`, `.chordpro` or `.pro` (and `.txt`) are read as ChordPro. Supported:
- `{title}` `{artist}` `{subtitle}` `{composer}` `{key}` `{capo}` `{tempo}` (also `{meta: name value}`), shown in the header
- `{start_of_verse}` / `{sov}`, `{start_of_chorus}` / `{soc}`, `{start_of_bridge}` / `{sob}` and any `{start_of_xxx}`, with a label
  (`{sov: Verse 1}` or `label="Verse 1"`) and the matching `{end_of_...}`; `{chorus}` repeats the last chorus
- `{start_of_tab}` / `{start_of_grid}` blocks are shown exactly as written
- `{comment: ...}` / `{c:}` / `{ci:}` / `{cb:}` show as italic notes; lines starting with `#` are ignored
- inline chords `[Am7]`, `[C/G]`, plus `[N.C.]` and `[*annotations]` (these are not transposed)
- a file with several songs (`{new_song}` / `{ns}`) is split into one song each

A ChordPro song is named after its content, `Artist - Title.cho`, so importing the same song again replaces it instead of adding a copy.
Not supported (ignored): `{define}`, `{transpose}`, `{columns}`, `{new_page}`, chord diagrams and fonts/colours/sizes.

## Running locally
```bash
python3 -m http.server 8765
```
Then open http://localhost:8765/index.html

## Installing on an iPad
Serve the folder over HTTPS (e.g. GitHub Pages), open it in Safari, then Share → Add to Home Screen.

## Files
- `index.html` – the whole app (HTML, CSS, JS)
- `preview.html` – the iPad-shaped preview used on a computer and inside ChordClean.app
- `manifest.json`, `sw.js` – installable/offline support
- `vendor/` – QR code libraries (bundled so QR sharing works offline)
- `samples/` – example song files for testing
