document.addEventListener('DOMContentLoaded', () => {
    const openMobileNavButton = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const content = document.querySelector('.content');
    const closeMobileNavButton = document.querySelector('.mobile-nav-close');

    if (openMobileNavButton && mobileNav) {
        openMobileNavButton.addEventListener('click', () => {
            mobileNav.classList.add('active');
        });
    }

    if (closeMobileNavButton && mobileNav) {
        closeMobileNavButton.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    }

    document.addEventListener('click', (event) => {
        if (!mobileNav.contains(event.target) && !openMobileNavButton.contains(event.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    });

    // Fetch and display articles
    if (content) {
        fetch('https://dev.to/api/articles?per_page=20')
            .then(response => response.json())
            .then(data => {
                content.innerHTML = ''; // Clear loading indicator
                data.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="card-header">
                            <img src="${article.user.profile_image_90}" alt="${article.user.name}" width="40" height="40">
                            <div class="user-info">
                                <p>${article.user.name}</p>
                                <p class="date">${new Date(article.published_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <h2><a href="${article.url}">${article.title}</a></h2>
                        <div class="tags">
                            ${article.tag_list.map(tag => `<a href="#">#${tag}</a>`).join('')}
                        </div>
                        <div class="card-footer">
                            <div class="reactions">
                                <i class="far fa-heart"></i> ${article.public_reactions_count} reactions
                            </div>
                            <div class="comments">
                                <i class="far fa-comment"></i> ${article.comments_count} comments
                            </div>
                        </div>
                    `;
                    content.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                content.innerHTML = '<p>Error loading articles. Please try again later.</p>';
            });
    }
});