"""Prepare the three new dispatch photos for the factory gallery."""
from pathlib import Path

from PIL import Image

ASSETS = Path(
    r"C:\Users\user\.cursor\projects\c-Users-user-Projects-wanda-group-landing\assets"
)
OUT = Path(r"C:\Users\user\Projects\wanda-group-landing\public\images\wg")
MAX_EDGE = 1600
QUALITY = 84
RATIO = 4 / 3


def find(fragment: str) -> Path:
    matches = [p for p in ASSETS.glob("*photo_*.png") if fragment in p.name]
    if len(matches) != 1:
        raise SystemExit(f"expected 1 match for {fragment}, got {matches}")
    return matches[0]


def crop_ratio(im: Image.Image, ratio: float, bias: str = "center") -> Image.Image:
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio)
        left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h))
    nh = int(w / ratio)
    top = h - nh if bias == "bottom" else (h - nh) // 2
    top = max(0, min(top, h - nh))
    return im.crop((0, top, w, top + nh))


def save(im: Image.Image, dest: Path) -> None:
    w, h = im.size
    scale = MAX_EDGE / max(w, h)
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"wrote {dest.name:28s} {dest.stat().st_size // 1024:4d}KB  {im.size[0]}x{im.size[1]}")


def main() -> None:
    truck = Image.open(find("5226646742068043599")).convert("RGB").transpose(Image.ROTATE_90)
    save(crop_ratio(truck, RATIO, "bottom"), OUT / "g13-truck-dispatch.jpg")

    cargo = Image.open(find("5226646742068043600")).convert("RGB")
    save(crop_ratio(cargo, RATIO, "bottom"), OUT / "g14-night-cargo.jpg")

    boxes = Image.open(find("5226646742068043602")).convert("RGB")
    save(crop_ratio(boxes, RATIO, "center"), OUT / "g15-boxed-stock.jpg")


if __name__ == "__main__":
    main()
