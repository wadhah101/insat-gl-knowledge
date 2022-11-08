from pathlib import Path
import re
import os

result = Path("docs").glob("**/*.md")

pattern = r"---\n([\S\s]*)---"

for i in result:
    with open(i) as f:
        content = f.read()
        # content = re.sub(pattern, '', content )
        contains_meta = re.search(pattern, content)
    if not contains_meta:
        slug_with_ext = i.relative_to("docs").as_posix().lower().replace(" ", "-")
        slug = os.path.splitext(slug_with_ext)[0]
        slugg_meta = f"---\nslug: /{slug}\n---"
        with open(i, "w") as f:
            f.write(slugg_meta + "\n\n" + content)
