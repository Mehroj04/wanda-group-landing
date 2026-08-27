"""Fit studio shots of condensing units onto 16:10 JPEG cards."""
from pathlib import Path

from PIL import Image

ASSETS = Path(
    r"C:\Users\user\.cursor\projects\c-Users-user-Projects-wanda-group-landing\assets"
)
OUT = Path(r"C:\Users\user\Projects\wanda-group-landing\public\images\wg")
TW, TH = 1600, 1000
BG = (244, 244, 245)
QUALITY = 85

# fragment -> dest
PICKS = {
    "5208788006058269890": "ref-copeland.jpg",
    "5208788006058269891": "ref-bitzer.jpg",
    "5208788006058269886": "ref-enclosed.jpg",
    "5208788006058269892": "ref-four-fan.jpg",
}


def find(fragment: str) -> Path:
    matches = [p for p in ASSETS.glob(f"*{fragment}*") if p.suffix.lower() in {".png", ".jpg", ".jpeg"}]
    if len(matches) != 1:
        raise SystemExit(f"expected 1 match for {fragment}, got {matches}")
    return matches[0]


def fit(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    scale = min(TW / im.width, TH / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (TW, TH), BG)
    canvas.paste(im, ((TW - nw) // 2, (TH - nh) // 2))
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"wrote {dest.name:22s} {dest.stat().st_size // 1024:4d}KB  {TW}x{TH}")


def main() -> None:
    for fragment, name in PICKS.items():
        fit(find(fragment), OUT / name)


if __name__ == "__main__":
    main()
