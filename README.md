# Quarto Hover-Preview Starter

This starter gives you a Quarto website with a **left-rail menu** and a **hover-to-preview** image panel on the home page — deployable to **GitHub Pages**.

## Option A workflow (recommended)

- Local development: run and render posts normally. Outputs are **frozen** (cached) and committed.
- CI deploys without executing any code (fast, no heavy deps).

Key setting in `_quarto.yml`:

```yaml
execute:
  freeze: auto
```

And the CI profile disables execution:

```yaml
profiles:
  - id: ci
    execute:
      enabled: false
      freeze: auto
```

On GitHub Actions we set `QUARTO_PROFILE=ci` so CI won't execute code cells.

## Develop locally

```bash
quarto preview
# or
quarto render
```

If a post uses heavy dependencies (e.g., PyTorch), **render it locally** so the frozen outputs are created, then commit the changes (including the `_freeze/` artifacts Quarto manages automatically).

## Add posts

Create a file under `posts/` like:

```bash
quarto create post posts/my-new-post
```

Or copy `posts/hello-world.qmd` and edit.

## Deploy

Push to the `main` branch. The included workflow will render and publish to `gh-pages` using the CI profile.
