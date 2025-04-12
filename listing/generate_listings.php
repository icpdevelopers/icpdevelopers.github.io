<?php

$rootDir = dirname(__DIR__);
$listingBaseDir = __DIR__;

function cleanListingDirectory($listingDir) {
    $keep = ['generate_listings.php', 'README.md', 'assets_78623784'];
    $items = scandir($listingDir);

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        $fullPath = "$listingDir/$item";

        if (!in_array($item, $keep)) {
            if (is_dir($fullPath)) {
                system("rm -rf " . escapeshellarg($fullPath));
            } else {
                unlink($fullPath);
            }
        }
    }
}

// Run cleanup before generation
cleanListingDirectory(__DIR__);

// Process root directory first
generateDirectoryListing($rootDir, '', true);

// Process subdirectories
$directoryIterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($rootDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

foreach ($directoryIterator as $path => $dir) {
    if ($dir->isDir()) {
        $originalPath = $dir->getRealPath();
        $relativePath = ltrim(substr($originalPath, strlen($rootDir)), '/');

        // Skip if has index.html or is the listing directory
        if (file_exists("$originalPath/index.html") ||
            strpos($relativePath, 'listing') === 0) {
            continue;
        }

        generateDirectoryListing($originalPath, $relativePath);
    }
}

echo "All listings generated successfully!\n";

function generateDirectoryListing($originalPath, $relativePath, $isRoot = false) {
    global $listingBaseDir;

    // Create mirrored directory
    $mirroredPath = $listingBaseDir . ($relativePath ? "/$relativePath" : '');
    if (!file_exists($mirroredPath)) {
        mkdir($mirroredPath, 0755, true);
    }

    // Generate HTML
    $html = buildListingHtml($originalPath, $relativePath, $isRoot);
    file_put_contents("$mirroredPath/index.html", $html);
}

function buildListingHtml($dirPath, $relativePath,  $isRoot = false) {
    $items = scandir($dirPath);
    $breadcrumbs = generateBreadcrumbs($relativePath);
    $itemList = '';

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        if ($isRoot && $item === 'listing') continue;

        $fullPath = "$dirPath/$item";
        $isDir = is_dir($fullPath);
        $escapedItem = htmlspecialchars($item, ENT_QUOTES, 'UTF-8');

        if ($isDir) {
            $icon = '📁';
            if (file_exists("$fullPath/index.html")) {
                $target = "/" . ($relativePath ? "$relativePath/" : '') . "$item/"; // Original path
            }else{
                $target = "./$item/";
            }
        } else {
            $icon = '📄';
            $target = ($relativePath ? "/$relativePath/" : '/') . $item;
        }

        $itemList .= "<li><a href='$target'>$icon $escapedItem</a></li>";
    }
    $pathTitle = $relativePath ?: 'Root';
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory: {$pathTitle}</title>
    <link rel="stylesheet" href="/listing/assets_78623784/style.css">
</head>
<body>
    <div class="directory-listing">
        <header>
            <h1>📂 <?php echo $relativePath ?? 'Root Directory'; ?></h1>
            <div class="breadcrumb">{$breadcrumbs}</div>
        </header>
        <ul class="item-list">{$itemList}</ul>
    </div>
</body>
</html>
HTML;
}

function generateBreadcrumbs($path) {
    if (!$path) return '<a href="/listing/">Home</a>';

    $parts = explode('/', $path);
    $breadcrumbs = ['<a href="/listing/">Home</a>'];
    $currentPath = '';

    foreach ($parts as $i => $part) {
        $currentPath .= "/$part";
        $breadcrumbs[] = $i < count($parts) - 1
            ? "<a href='" . str_repeat('../', count($parts) - $i - 1) . "index.html'>$part</a>"
            : $part;
    }

    return implode(' / ', $breadcrumbs);
}
?>
