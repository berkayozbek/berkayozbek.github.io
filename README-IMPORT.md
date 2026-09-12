# Import into berkayozbek.github.io

This is the complete current React/Next.js source, including both chip and NeuroStreamX animations, research pages, figures and downloadable documents. It targets the root user site https://berkayozbek.github.io, not a /repository-name/ project site.

1. Download a backup of your existing repository (Code > Download ZIP), or create a backup branch before replacing files.
2. Clone your existing berkayozbek.github.io repository using GitHub Desktop. Open its local folder.
3. Copy the CONTENTS of this extracted package into that folder. package.json, app/, public/ and .github/ must be directly at the repository root. Replace conflicting files. Keep the repository's .git directory. Include the hidden .github folder containing workflows/deploy-pages.yml.
4. If existing .github/workflows files deploy the old site, disable those workflows in GitHub Actions before enabling this replacement. Do not delete unrelated workflows. Legacy root HTML files are not published by the supplied workflow; it publishes only the new out/ export.
5. On GitHub, open Settings > Pages. Under Build and deployment, choose GitHub Actions as Source. No paid hosting or personal token is required for this workflow.
6. This workflow listens to main. If your publishing branch is master, change branches: [main] to branches: [master] in .github/workflows/deploy-pages.yml before committing.
7. In GitHub Desktop review the changes, commit, then Push origin. This publishes the new site when the workflow succeeds. In Actions, open Deploy research website and wait for both build and deploy to turn green. If Pages was enabled after pushing, use Run workflow.
8. Visit https://berkayozbek.github.io and check homepage, research pages, videos and PDF downloads. A hard refresh can clear an older cached page.

## Subsequent edits

Edit app/, components/, content/ or public/, then commit and push. GitHub builds and publishes automatically. Do not upload this ZIP as one repository file. Do not commit node_modules/, .next/ or out/.

## Optional local preview

Install Node.js 22, then run npm ci and npm run dev from the repository folder. Open http://localhost:3000. npm run build produces the standalone out/ website. Node runs only during build; the published website is static.

## Configuration and scope

Next.js static export and trailing-slash routes are configured. Metadata now uses https://berkayozbek.github.io. Original Sites credentials, git history and hosting manifest are excluded. Source includes the already displayed thesis/CV downloads; these will be publicly downloadable on your public website. This package has not been pushed to your GitHub account.

Sources: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages and https://nextjs.org/docs/app/guides/static-exports
