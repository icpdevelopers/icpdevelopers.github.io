## create directory map of whole repo.

> since github pages doesn't support directory listing, we use this directory to manually generate the listing and server index from /listing/

- make sure the listing directories dont have .git and other such files and folders:
`find . \( -name ".git" -o -name ".vscode" -o -name ".gitignore" \) -prune -exec rm -rf {} \;`

- run `php generate_listings.php`
_This will generate directory listing index for each directory that do not contain index.html file_

- push
