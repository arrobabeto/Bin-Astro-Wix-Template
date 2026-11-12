# Content

The owner edits collections, posts, taxonomy, and media in the Wix dashboard. Changing a title does not require a commit or a release: the page reads it at runtime.

The developer does not copy those items into a data folder in the repo or paste them into the component so the page does not depend on the network. If a field is missing, design the empty state or the error state. Do not fill it from an array in the repo.

A seed is legitimate when someone supplies or describes real content: a JSON file, a CSV, a list, texts, photos. The `seed-content` skill writes it to `plans/` and runs the vertical's script. If the request is to invent examples, the skill refuses.

Legal text does live in Git, in `src/content/legal/`. The site name, locale, description, URL, email, and social image live in `src/config/site.ts`.
