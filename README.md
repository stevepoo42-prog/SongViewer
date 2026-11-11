# Song Viewer

A small offline-capable web app (PWA) for showing chord charts on an iPad, inspired by OnSong.
It opens the plain-text files produced by ChordClean.

## Features
- Add song files from the Files app (multi-select); songs are stored on the device
- Chords above lyrics (`[G]` bracketed chord lines, plain chord lines, or inline `[G]word` ChordPro style)
- Tap the top-right corner for the control panel: pick a key and all chords transpose (flats/sharps chosen to suit the key)
- Section colours (Intro, Verse, Chorus, Bridge, Solo/Instrumental, Outro); chords always yellow
- Tight line spacing, auto-fit to screen, and "join short lines" (`line one, line two`) when they fit the width

## Running locally
```bash
python3 -m http.server 8765
```
Then open http://localhost:8765/index.html

## Installing on an iPad
Serve the folder over HTTPS (e.g. GitHub Pages), open it in Safari, then Share → Add to Home Screen.

## Files
- `index.html` – the whole app (HTML, CSS, JS)
- `manifest.json`, `sw.js` – installable/offline support
- `samples/` – example ChordClean song files for testing
