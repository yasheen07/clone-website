document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    fetch(`https://dev.to/api/articles/${articleId}`)
        .then(response => response.json())
        .then(article => {
            const html = `
                <div class="card">
                    <h1>${article.title}</h1>
                    <div class="tags">
                        ${article.tags.map(tag => `<a href="#">#${tag}</a>`).join('')}
                    </div>
                    <div class="article-content">
                        ${article.body_html}
                    </div>
                </div>
            `;
            content.innerHTML = html;
        });
});