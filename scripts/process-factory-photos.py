"""Compress unique factory photos into public/images/wg. Drops near-duplicates and ANAN-branded shots."""
from pathlib import Path

from PIL import Image

ASSETS = Path(
    r"C:\Users\user\.cursor\projects\c-Users-user-Projects-wanda-group-landing\assets"
)
OUT = Path(r"C:\Users\user\Projects\wanda-group-landing\public\images\wg")
MAX_EDGE = 1600
QUALITY = 82

# id fragment -> destination jpeg (existing public filenames, so images.ts stays)
PICKS = {
    "5318918011274073221": "g01-finished-stock.jpg",
    "5429122229229784862": "g02-production-weld.jpg",
    "5208604933077276409": "g03-export-pack.jpg",
    "5429122229229784863": "g04-safety-cages.jpg",
    "5415746391105017976": "g05-truck-shipping.jpg",
    "5415746391105017979": "g06-export-docs.jpg",
    "5400226861788370051": "g07-valve-assembly.jpg",
    "5226774362726277240": "g08-oxy-cutting.jpg",
    "5398111882452867025": "g09-shop-welding.jpg",
    "5242520906834318474": "g10-pipe-welding.jpg",
    "5458649369180573899": "g11-heavy-fabrication.jpg",
    "5400226861788370052": "g12-size-range.jpg",
    "hero": ("5318918011274073221", "hero.jpg"),
    "about": ("5429122229229784863", "about.jpg"),
    "story": ("5429122229229784862", "s4-factory.jpg"),
    "generator": ("5458649369180573899", "product-generator.jpg"),
}


def save_jpeg(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = MAX_EDGE / max(w, h)
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"wrote {dest.name:28s} {dest.stat().st_size // 1024:4d}KB  {im.size[0]}x{im.size[1]}")


def find(fragment: str) -> Path:
    matches = [p for p in ASSETS.glob("*photo_*.png") if fragment in p.name]
    if len(matches) != 1:
        raise SystemExit(f"expected 1 match for {fragment}, got {matches}")
    return matches[0]


def main() -> None:
    for fragment, dest_name in list(PICKS.items()):
        if fragment in {"hero", "about", "story", "generator"}:
            continue
        save_jpeg(find(fragment), OUT / dest_name)

    extras = {
        "hero": PICKS["hero"],
        "about": PICKS["about"],
        "story": PICKS["story"],
        "generator": PICKS["generator"],
    }
    for _key, (fragment, dest_name) in extras.items():
        save_jpeg(find(fragment), OUT / dest_name)


if __name__ == "__main__":
    main()
