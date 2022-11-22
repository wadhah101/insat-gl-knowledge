from pathlib import Path
import re
import os
import itertools

md = Path("docs").glob("**/*.md")
mdx = Path("docs").glob("**/*.mdx")

result = itertools.chain(md, mdx)


image_pattern = r"\!\[.*\]\((.*)\)"


for i in result:

    with open(i) as f:
        content = f.read()
        contains_meta = re.search(image_pattern, content)

        while contains_meta:
            re.sub(image_pattern, lambda x: print(x))

            contains_meta = re.search(image_pattern, content)

        # with open(i, "w") as f:
        #     f.write(slugg_meta + "\n\n" + content)
