# Markdown-Based Blog

## Overview

This project is a JavaScript-powered markdown blog that dynamically loads and displays markdown articles. Articles can be fetched from a GitHub repository or a local directory. uses `marked` library to convert markdown content into HTML.

## Features

- Fetch and display markdown articles.
- Load content from a GitHub repository or a local folder.
- Convert markdown to HTML for easy readability.
- Display articles in reverse chronological order (latest first).
- Configurable settings through URL parameters:
  - `useGitAPI=true` to fetch articles from GitHub.
  - `maxArticles=100` to set the number of local articles to load.

### Configuration

You can modify behavior via URL parameters:

### GitHub Repository Settings

The script fetches markdown files from a GitHub repository using the following parameters:

- `repoOwner = "username"` → The GitHub username or organization that owns the repository.
- `repoName = "repository"` → The name of the repository that contains the markdown articles.
- `branch = "main"` → The branch from which to fetch content (typically "main" or "master").
- `articlesPath = "articles"` → The directory within the repository where markdown files are stored.

If using the GitHub API, these settings determine where the blog pulls content from. To change the repository, modify these values in `script.js` or dynamically pass them via a configuration system.

- `useGitAPI=true` → Fetch from GitHub.
- `maxArticles=100` → Set the number of local markdown files to load.

## Dependencies

- `marked.js` (for parsing markdown)
- GitHub API (if using remote fetching)
