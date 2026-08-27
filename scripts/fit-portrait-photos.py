"""Fit portrait factory shots: tight crop, keep portrait JPEG; CSS uses object-fit: contain."""
from pathlib import Path

from PIL import Image

ASSETS = Path(
    r"C:\Users\user\.cursor\projects\c-Users-user-Projects-wanda-group-landing\assets"
)
OUT = Path(r"C:\Users\user\Projects\wanda-group-landing\public\images\wg")
MAX_EDGE = 1600
QUALITY = 85

# (left, top, right, bottom) on the original PNG
CROPS = {
    # Cut the person at the top; keep tank, hose, torch box, trolley
    "5458649369180573899": (8, 96, 568, 1024),
    # Inset cardboard walls so fittings fill the frame
    "5242520906834318474": (48, 36, 740, 1008),
}


def find(fragment: str) -> Path:
    matches = [p for p in ASSETS.glob("*photo_*.png") if fragment in p.name]
    if len(matches) != 1:
        raise SystemExit(f"expected 1 match for {fragment}, got {matches}")
    return matches[0]


def save_cropped(fragment: str, dest: Path) -> None:
    im = Image.open(find(fragment)).convert("RGB")
    im = im.crop(CROPS[fragment])
    w, h = im.size
    scale = MAX_EDGE / max(w, h)
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"wrote {dest.name:28s} {dest.stat().st_size // 1024:4d}KB  {im.size[0]}x{im.size[1]}")


def main() -> None:
    save_cropped("5458649369180573899", OUT / "product-generator.jpg")
    save_cropped("5458649369180573899", OUT / "g11-heavy-fabrication.jpg")
    save_cropped("5242520906834318474", OUT / "g10-pipe-welding.jpg")


if __name__ == "__main__":
    main()
