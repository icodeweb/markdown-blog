async function loadArticles() {
    const articlesContainer = document.getElementById("articles"); // مكان عرض المقالات
    const articleFiles = ["article1.md", "article2.md", "article3.md", "article4.md", "article5.md", "article6.md"]; // قائمة المقالات

    for (const file of articleFiles) {
        const response = await fetch(`articles/${file}`);
        const markdown = await response.text();
        console.log(response);

        if (!response.ok) {
            break
        } else {
            // console.log(response);
            const htmlContent = markdownToHTML(markdown);
            // تحويل Markdown إلى HTML بسيط

            // إنشاء عنصر لعرض المقال
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");
            articleElement.innerHTML = htmlContent;

            articlesContainer.appendChild(articleElement);
        }
    }
}

// تحويل Markdown إلى HTML (بسيط)
function markdownToHTML(markdown) {
    return markdown
        .replace(/^# (.*$)/gm, "<h2>$1</h2>") // تحويل العناوين
        .replace(/^!\[(.*?)\]\((.*?)\)/gm, '<img src="$2" alt="$1">') // تحويل الصور
        .replace(/\n/g, "<br>"); // تحويل الأسطر الجديدة
}

// تشغيل الدالة بعد تحميل الصفحة
window.onload = loadArticles;





// const repoOwner = "YOUR_GITHUB_USERNAME"; // اسم المستخدم الخاص بك
// const repoName = "YOUR_REPO_NAME"; // اسم الريبو
// const branch = "main"; // الفرع الرئيسي
// const articlesPath = "articles"; // مسار المقالات

// async function loadArticles() {
//     const articlesContainer = document.getElementById("articles");

//     try {
//         // جلب قائمة المقالات من GitHub API
//         const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${articlesPath}?ref=${branch}`);
//         const files = await response.json();

//         // فلترة الملفات بحيث تكون فقط Markdown
//         const markdownFiles = files.filter(file => file.name.endsWith(".md"));

//         for (const file of markdownFiles) {
//             const fileResponse = await fetch(file.download_url);
//             const markdown = await fileResponse.text();

//             // تحويل Markdown إلى HTML
//             const htmlContent = markdownToHTML(markdown);

//             // إنشاء عنصر لعرض المقال
//             const articleElement = document.createElement("div");
//             articleElement.classList.add("article");
//             articleElement.innerHTML = htmlContent;

//             articlesContainer.appendChild(articleElement);
//         }
//     } catch (error) {
//         console.error("Error loading articles:", error);
//     }
// }

// // تحويل Markdown إلى HTML (نفس الدالة السابقة)
// function markdownToHTML(markdown) {
//     return markdown
//         .replace(/^# (.*$)/gm, "<h2>$1</h2>") // تحويل العناوين
//         .replace(/^!\[(.*?)\]\((.*?)\)/gm, '<img src="$2" alt="$1">') // تحويل الصور
//         .replace(/\n/g, "<br>"); // تحويل الأسطر الجديدة
// }

// // تشغيل الدالة بعد تحميل الصفحة
// window.onload = loadArticles;