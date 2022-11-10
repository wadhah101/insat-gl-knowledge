from pathlib import Path
import re
import os
import itertools
from PIL import Image


ds = Path("docs").glob("**/DS/*.md")
exams = Path("docs").glob("**/Exams/*.md")


for i in itertools.chain(ds, exams):
    dir_name = os.path.dirname(i)
    print(dir_name)

    asset_dir = os.path.join(dir_name, "assets")
    if not os.path.exists(asset_dir):
        raise Exception("Assert directory not found")

    exam_year = os.path.splitext(i.name)[0]
    exam_images_path = Path(asset_dir).glob(f"{exam_year}*")
    sorted_images = sorted([i.absolute() for i in exam_images_path])

    images_list = [Image.open(i).convert("RGB") for i in sorted_images]

    images_list[0].save(
        os.path.join(asset_dir, f"{exam_year}.pdf"),
        save_all=True,
        append_images=images_list[1:],
    )
