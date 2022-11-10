from pathlib import Path
import re
import os

result = Path("docs").glob("**/*.md")

has_meta_pattern = r"(---\n)([\S\s]*)(\n---)"

meta_has_slug_pattern = r"(---\n)([\S\s]*)(slug.*)([\S\s]*)(\n---)"


for i in result:
    slug_with_ext = i.relative_to("docs").as_posix().lower().replace(" ", "-")
    slug = "/" + os.path.splitext(slug_with_ext)[0]

    with open(i) as f:
        content = f.read()
        contains_meta = re.search(has_meta_pattern, content)

    if contains_meta:
        meta_has_slug = re.search(meta_has_slug_pattern, content)

        if meta_has_slug:
            if meta_has_slug.group(3) != slug:
                groups = list(meta_has_slug.groups())
                groups[2] = f"slug: {slug}"
                output = "".join(groups)
                content_updated_slug = re.sub(meta_has_slug_pattern, output, content)
                with open(i, "w") as f:
                    f.write(content_updated_slug)
        else:
            groups = list(contains_meta.groups())
            groups.insert(2, slug)
            output = "".join(groups)
            content_updated_slug = re.sub(contains_meta, output, content)
            with open(i, "w") as f:
                f.write(content_updated_slug)

    else:
        slugg_meta = f"---\nslug: {slug}\n---"
        with open(i, "w") as f:
            f.write(slugg_meta + "\n\n" + content)
