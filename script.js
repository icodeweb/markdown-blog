// Flag to determine whether to fetch articles from GitHub or load them locally
let useGitAPI = false;

document.addEventListener("DOMContentLoaded", loadArticles);

// Function to load articles and display them on the page
async function loadArticles() {
    const articlesContainer = document.getElementById("articles");
    // Determine the source of articles based on useGitAPI flag
    const articleFiles = useGitAPI ? await fetchFromGitHub() : generateLocalArticlePaths(500);

    // Loop through each article file and fetch its content
    for (const file of articleFiles) {
        try {
            const response = await fetch(file.url);
            if (!response.ok) {
                console.warn(`File not found: ${file.url}`);
                break;
            }
            // Parse the markdown content and create an article element
            const markdown = await response.text();
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = marked.parse(markdown);
            // Prepend the article to display the latest one first
            articlesContainer.prepend(articleElement);
        } catch (error) {
            console.error("Error loading article:", error);
        }
    }
}

// Function to fetch article list from GitHub repository
async function fetchFromGitHub() {
    const repoOwner = "icodeweb";
    const repoName = "markdown-blog";
    const branch = "main";
    const articlesPath = "articles";

    try {
        // Fetch file list from GitHub API
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${articlesPath}?ref=${branch}`);
        const files = await response.json();
        // Filter markdown files and return their URLs
        return files.filter(file => file.name.endsWith(".md")).map(file => ({ url: file.download_url }));
    } catch (error) {
        console.error("Error fetching from GitHub:", error);
        return [];
    }
}

// Function to generate a list of local article file paths
function generateLocalArticlePaths(maxCount) {
    const existingFiles = [];
    for (let i = 1; i <= maxCount; i++) {
        const filePath = `articles/article${i}.md`;
        existingFiles.push({ url: filePath });
    }
    return existingFiles;
}