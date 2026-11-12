# BAWT

Bin Astro and Wix Template. It is a stack, not a site: Astro 7 on Wix hosting, Tailwind 4, and the kit's auth seam. Business content lives in the Wix dashboard.

Start at [docs/guides/start-here.md](docs/guides/start-here.md).

Repository: https://github.com/arrobabeto/Bin-Astro-Wix-Template

The **Quality** workflow runs on every pull request and uses no secrets. The **Release** workflow runs on `main` only when the repository already has `wix.config.json`. This template does not have that file, and the job is skipped: a skipped check is not a failure. Publishing starts in the client repo, after `new-site`.

## License

MIT. Copyright (c) 2026 arrobabeto. See [LICENSE](LICENSE).

The name BAWT is not licensed to brand another product.
