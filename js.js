const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let acc = "PeX38c-v09XPGpCvxSY2GyC5a370EKj8Sr9q5p-UTuo";

async function searchImages(){
    // search value
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${acc}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const result = data.results;

    result.map((result) => {
        // create a new img element
        const image = document.createElement("img");
        // add image to image element
        image.src = result.urls.small;
        // create anchor tag
        const imageLink = document.createElement("a");
        // set href attribute
        imageLink.href = result.links.html;
        // opens in new tab
        imageLink.target = "_blank";

        // add image in anchor tag - need to display in div search result
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    })

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", ()=> {
    // move through pages
    page++;
    searchImages();
})