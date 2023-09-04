// attach search-form, search-box, search result from user, and show more button to js file
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// keyword as search field to use as parameter 
let keyword = "";
// create relevant page number
let page = 1;
// key removed - ADD KEY TO EMPLOY FUNCTIONALITY
let acc = "";

// create our async function to search for images
async function searchImages(){
    // search value in field to use as parameter supplied by user
    keyword = searchBox.value;
    // our url to search - apply page number, keyword and access key as parameters to search
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${acc}&per_page=12`;

    // await response of fetching url = JSON data
    const response = await fetch(url);
    // data is conversion of JSON data provided in response
    const data = await response.json();

    // initial log to console to check for object properties
    // console.log(data);

    // if pagenumber is 1
    if (page === 1) {
        // set innerHTML to blank to remove previous search
        searchResult.innerHTML = "";
    }

    // result = data.results
    const result = data.results;

    // use our result to map the data
    result.map((result) => {
        // create img element, populate with urls.small in src, create image anchor link, populate href with results link html and set target to blank to open in new tab, append anchor link with img and append to searchResult division element
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

    // add visibility to display more button after search
    showMoreBtn.style.display = "block";
}

// add event listener to search form, prevent default behaviour, set page number to 1 and execute searchImages function
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

// 
showMoreBtn.addEventListener("click", ()=> {
    // move through pages by incrementing pages numbers
    page++;
    // execute search images function to add 12 new images to division element searchResults
    searchImages();
})