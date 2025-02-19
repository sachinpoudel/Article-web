const apiKey = 'c4c90ad9aa3747fa9918dfa11c557e25';
const blockContainer = document.getElementById('block-container');

const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apikey=${apiKey}`;
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.log('Error fetching random news', error)
        return []
    }
}

searchBtn.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if(query !== ""){
        try{
const articles = await fetchNewsQuery(query);
displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query",error)

        }
    }
})
async function fetchNewsQuery(query){
        try {
            const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
            const response = await fetch(apiUrl)
            const data = await response.json()
            return data.articles;
        } catch(error) {
            console.log('Error fetching random news', error);
            return [];
        }
    }
    

function displayBlogs(articles) {
    blockContainer.innerHTML = '';
    articles.forEach((article) => {
        const blogCard = document.createElement('div')
        blogCard.classList.add('blog-card');
        const image = document.createElement('img')
        image.src = article.urlToImage;
        image.alt = article.title;
        const title = document.createElement('h2');
        const trunTitle = article.title.length > 30 ?
        article.title.slice(0, 30) + "...." : article.title;
        title.textContent = trunTitle;
        const description = document.createElement('p');
     const trundes  =    article.description.length > 120 ? article.description.slice(0,120) + "..." : article.description;
        description.textContent = trundes;

        blogCard.appendChild(image)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
     blogCard.addEventListener("click", () =>{
        window.open(article.url, "_blank")
     })
        blockContainer.appendChild(blogCard)

    })
}
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error('Error fetching random news', error)


    }
})();