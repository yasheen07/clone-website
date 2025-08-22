document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    const searchInput = document.querySelector('.search-bar input');
    let articles = [];

    fetch('https://dev.to/api/articles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            articles = data;
            displayArticles(articles);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredArticles = articles.filter(article => {
            return article.title.toLowerCase().includes(searchTerm) || 
                   article.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        });
        displayArticles(filteredArticles);
    });

    content.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            const tag = e.target.innerText.substring(1);
            fetch(`https://dev.to/api/articles?tag=${tag}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    articles = data;
                    displayArticles(articles);
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    });

    function displayArticles(articlesToDisplay) {
        let html = '';
        articlesToDisplay.forEach(article => {
            html += `
                <div class="card" data-id="${article.id}">
                    <div class="card-header">
                        <img src="${article.user.profile_image_90}" alt="${article.user.name}">
                        <div class="user-info">
                            <p>${article.user.name}</p>
                            <p>${new Date(article.published_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <h2><a href="article.html?id=${article.id}">${article.title}</a></h2>
                    <p>${article.tags.map(tag => `<a href="#" class="tag">#${tag}</a>`).join(' ')}</p>
                    <div class="card-footer">
                        <div class="reactions">
                            <i class="fas fa-heart"></i>
                            <span>${article.public_reactions_count}</span>
                        </div>
                        <div class="comments">
                            <i class="fas fa-comment"></i>
                            <span>${article.comments_count}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        content.innerHTML = html;
    }
});
