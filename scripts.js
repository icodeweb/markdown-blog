const repoOwner = "icodeweb";
const repoName = "Layers-Blog";
const branch = "main";
const articlesPath = "articles";

async function loadArticles() {
    const articlesContainer = document.getElementById("articles");

    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${articlesPath}?ref=${branch}`);
        const files = await response.json();
        const markdownFiles = files.filter(file => file.name.endsWith(".md"));

        for (const file of markdownFiles) {
            const fileResponse = await fetch(file.download_url);
            const markdown = await fileResponse.text();
            const htmlContent = markdownToHTML(markdown);
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = htmlContent;
            articlesContainer.appendChild(articleElement);
        }
    } catch (error) {
        console.error("Error loading articles:", error);
    }
}

function markdownToHTML(markdown) {
    return markdown
        .replace(/^# (.*$)/gm, "<h2>$1</h2>")
        .replace(/^!\[(.*?)\]\((.*?)\)/gm, '<img src="$2" alt="$1">')
        .replace(/\n/g, "<br>");
}


window.onload = loadArticles;





// async function loadArticles() {
//     const articlesContainer = document.getElementById("articles");
//     const articleFiles = [];

//     for (let articleIndex = 1; articleIndex <= 50; articleIndex++) {
//         let articleFileName = `article${articleIndex}.md`
//         articleFiles.push(articleFileName)
//     }

//     for (const file of articleFiles) {
//         const response = await fetch(`articles/${file}`);
//         const markdown = await response.text();

//         if (!response.ok) {
//             break
//         } else {
//             const htmlContent = markdownToHTML(markdown);
//             const articleElement = document.createElement("div");
//             articleElement.classList.add("article");
//             articleElement.innerHTML = htmlContent;
//             articlesContainer.appendChild(articleElement);
//         }
//     }
// }


