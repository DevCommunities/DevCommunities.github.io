"""Refresh image dimensions after adding local images. Requires Pillow."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
sizes = {}
for file in sorted((root / 'public/images').rglob('*')):
    if not file.is_file():
        continue
    try:
        with Image.open(file) as image:
            sizes['/' + file.relative_to(root / 'public').as_posix()] = {
                'width': image.width, 'height': image.height,
            }
    except (OSError, ValueError):
        continue
(root / 'src/data/image-sizes.json').write_text(
    json.dumps(sizes, ensure_ascii=False, indent=2) + '\n', encoding='utf-8',
)
print(f'Updated dimensions for {len(sizes)} images.')
