#!/usr/bin/env python3
"""Generate 1200x630 OG images for every article in /content.

Usage:  python3 scripts/generate-og.py
Requires: pip install pillow

Reads title / category / verdict from each MDX frontmatter and writes to
public/og/<slug>.png, matching the `ogImage` field in that article.
Re-run after adding or retitling an article.
"""
import os
import re
import glob
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SERIF_B = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

W, H = 1200, 630
CREAM = (250, 249, 246)
DARK = (26, 26, 26)
GREEN = (46, 125, 50)
ORANGE = (230, 81, 0)
MUTED = (120, 118, 112)
BORDER = (224, 221, 213)

VERDICT_COLOR = {"PROVEN": GREEN, "PROMISING": ORANGE, "LIMITED": (110, 110, 110)}


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for word in words:
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def make_og(path, kicker, title, verdict=None):
    img = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 10, H], fill=GREEN)

    d.text((72, 78), kicker.upper(), font=ImageFont.truetype(MONO, 22), fill=GREEN)

    size = 60
    while size >= 34:
        f_title = ImageFont.truetype(SERIF_B, size)
        lines = wrap(d, title, f_title, W - 144)
        if len(lines) <= 4:
            break
        size -= 4

    y = 148
    for line in lines[:4]:
        d.text((72, y), line, font=f_title, fill=DARK)
        y += int(size * 1.28)

    if verdict:
        f_b = ImageFont.truetype(SANS_B, 24)
        label = verdict.upper()
        tw = d.textlength(label, font=f_b)
        by = min(y + 26, H - 170)
        d.rounded_rectangle([72, by, 72 + tw + 44, by + 52], radius=26,
                            fill=VERDICT_COLOR.get(label, MUTED))
        d.text((72 + 22, by + 12), label, font=f_b, fill=(255, 255, 255))

    d.line([(72, H - 96), (W - 72, H - 96)], fill=BORDER, width=2)
    d.text((72, H - 70), "HerbVerdict", font=ImageFont.truetype(SANS_B, 26), fill=DARK)
    f_foot = ImageFont.truetype(SANS, 20)
    tag = "Evidence-first Ayurveda research"
    d.text((W - 72 - d.textlength(tag, font=f_foot), H - 66), tag, font=f_foot, fill=MUTED)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "PNG", optimize=True)


def fm_get(text, key):
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', text, re.M)
    return m.group(1) if m else None


def main():
    out_dir = os.path.join(ROOT, "public", "og")
    os.makedirs(out_dir, exist_ok=True)

    make_og(os.path.join(out_dir, "default.png"),
            "Independent research",
            "What does science actually say about Ayurveda?")

    count = 0
    for path in glob.glob(os.path.join(ROOT, "content", "*", "*.mdx")):
        raw = open(path).read()
        head = raw.split("---")[1]
        section = os.path.basename(os.path.dirname(path))
        slug = os.path.basename(path)[:-4]
        title = fm_get(head, "title") or slug
        verdict = fm_get(head, "verdict")
        kicker = fm_get(head, "category") or section
        og = fm_get(head, "ogImage") or f"/og/{slug}.png"
        make_og(os.path.join(ROOT, "public" + og), kicker, title, verdict)
        count += 1

    print(f"Generated {count} article OG images + default.png")


if __name__ == "__main__":
    main()
