from PIL import Image, ImageDraw


def lerp(a, b, t):
    return int(a + (b - a) * t)


def make(size: int) -> Image.Image:
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    s = size / 48.0

    bg = Image.new("RGBA", (size, size))
    px = bg.load()
    c1, c2 = (251, 146, 60), (234, 88, 12)
    denom = 2 * (size - 1) if size > 1 else 1
    for y in range(size):
        for x in range(size):
            t = (x + y) / denom
            px[x, y] = (
                lerp(c1[0], c2[0], t),
                lerp(c1[1], c2[1], t),
                lerp(c1[2], c2[2], t),
                255,
            )
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=max(1, int(12 * s)), fill=255
    )
    im.paste(bg, (0, 0), mask)

    def box(xy, rgb, rad=0, opacity=1.0):
        x0, y0, x1, y1 = [v * s for v in xy]
        fill = (*rgb, int(255 * opacity))
        layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        ImageDraw.Draw(layer).rounded_rectangle(
            (x0, y0, x1, y1), radius=max(0, int(rad * s)), fill=fill
        )
        im.alpha_composite(layer)

    box((18, 10, 30, 16), (30, 41, 59), 2, 0.9)
    box((20, 6, 28, 12), (249, 115, 22), 1.5)
    box((15, 16, 33, 42), (51, 65, 85), 4)
    box((15, 32, 33, 38), (249, 115, 22), 0, 0.85)
    return im


base = make(512)
base.save("public/favicon-512x512.png")
sizes = {
    16: "public/favicon-16x16.png",
    32: "public/favicon-32x32.png",
    48: "public/favicon-48x48.png",
    96: "public/favicon-96x96.png",
    120: "public/favicon-120x120.png",
    180: "public/apple-touch-icon.png",
    192: "public/favicon-192x192.png",
}
for n, path in sizes.items():
    make(n).save(path)

make(48).save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("wrote favicons")
