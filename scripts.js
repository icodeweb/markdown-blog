let useGitAPI = false;

async function loadArticles() {
    const articlesContainer = document.getElementById("articles");
    const articleFiles = useGitAPI ? await fetchFromGitHub() : generateLocalArticlePaths(50);

    for (const file of articleFiles) {
        try {
            const response = await fetch(file.url);
            if (!response.ok) {
                console.warn(`File not found: ${file.url}`);
                break;
            }
            const markdown = await response.text();
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = marked.parse(markdown);
            articlesContainer.appendChild(articleElement);
        } catch (error) {
            console.error("Error loading article:", error);
        }
    }
}

async function fetchFromGitHub() {
    const repoOwner = "icodeweb";
    const repoName = "Layers-Blog";
    const branch = "main";
    const articlesPath = "articles";

    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${articlesPath}?ref=${branch}`);
        const files = await response.json();
        return files.filter(file => file.name.endsWith(".md")).map(file => ({ url: file.download_url }));
    } catch (error) {
        console.error("Error fetching from GitHub:", error);
        return [];
    }
}

function generateLocalArticlePaths(maxCount) {
    const existingFiles = [];
    for (let i = 1; i <= maxCount; i++) {
        const filePath = `articles/article${i}.md`;
        existingFiles.push({ url: filePath });
    }
    return existingFiles;
}
window.onload = loadArticles;
