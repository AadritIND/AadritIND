"""Build transparent dragon seals from logo.jpg.

The source is a flat black dragon on a yellow field with a soft drop shadow.
We take a hard silhouette (green channel) so the shadow cannot survive, dilate
by a pixel, feather it, then recolor the ink and keep the red eye.
"""
from PIL import Image, ImageFilter

SRC = "logo.jpg"
SIZE = 320
TARGETS = {
    "seal-gold.png": ((242, 193, 78), (226, 96, 58)),
    "seal-ink.png": ((23, 19, 16), (182, 73, 38)),
}
CUT = 118  # anything darker than this is ink, not shadow

im = Image.open(SRC).convert("RGB")
w, h = im.size
src = im.load()

alpha = Image.new("L", (w, h), 0)
alpha_px = alpha.load()
red = Image.new("L", (w, h), 0)
red_px = red.load()

for y in range(h):
    for x in range(w):
        r, g, b = src[x, y]
        if g < CUT or (r > 110 and g < 95 and b < 95):
            alpha_px[x, y] = 255
        if r > 95 and r > g * 1.8 and r > b * 1.8:
            red_px[x, y] = 255

# Grow a hair, then soften so the edge is anti-aliased without a halo.
alpha = alpha.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.7))

box = alpha.getbbox()
art_w, art_h = box[2] - box[0], box[3] - box[1]
side = max(art_w, art_h)
canvas = Image.new("L", (side, side), 0)
canvas.paste(alpha.crop(box), ((side - art_w) // 2, (side - art_h) // 2))
alpha = canvas.resize((SIZE, SIZE), Image.LANCZOS)

red_canvas = Image.new("L", (side, side), 0)
red_canvas.paste(red.crop(box), ((side - art_w) // 2, (side - art_h) // 2))
red = red_canvas.resize((SIZE, SIZE), Image.LANCZOS)

for name, (ink, eye_color) in TARGETS.items():
    layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    px = layer.load()
    a = alpha.load()
    rmask = red.load()
    for y in range(SIZE):
        for x in range(SIZE):
            av = a[x, y]
            if not av:
                continue
            rv = rmask[x, y]
            col = eye_color if rv > 110 else ink
            px[x, y] = (col[0], col[1], col[2], av)
    layer.save(f"assets/{name}", optimize=True)
    print(f"assets/{name}  {SIZE}x{SIZE}")
