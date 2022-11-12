from pathlib import Path
import re
import os
import itertools
from PIL import Image
import logging

logger = logging.Logger("main")

ds = Path("docs").glob("**/DS/*.md")
exams = Path("docs").glob("**/Exams/*.md")


output_pdfs = []

for i in itertools.chain(ds, exams):
    dir_name = os.path.dirname(i)

    asset_dir = os.path.join(dir_name, "assets")
    if not os.path.exists(asset_dir):
        raise Exception("Assert directory not found")

    exam_year = os.path.splitext(i.name)[0]
    exam_images_path = [
        i
        for i in Path(asset_dir).glob(f"{exam_year}*")
        if i.suffix.lower() in [".jpg", ".webp", ".png"]
    ]
    pdf_file_path = os.path.join(asset_dir, f"{exam_year}.pdf")
    output_pdfs.append(pdf_file_path)

    sorted_images = sorted([i.absolute() for i in exam_images_path])

    images_list = [Image.open(i).convert("RGB") for i in sorted_images]

    images_list[0].save(
        pdf_file_path,
        save_all=True,
        append_images=images_list[1:],
    )


with open("exams_pdf_list.txt", "w") as f:
    file_names = " ".join([f'"{i}"' for i in output_pdfs])
    f.write(file_names)
