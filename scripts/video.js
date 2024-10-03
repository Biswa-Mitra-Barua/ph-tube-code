// console.log('added video')--checking
function getTime (time){
    // const day = parseInt(time / 86400);
    const hour = parseInt(time / 3600);
    const seconds = parseInt(time % 3600);
    const minute = parseInt(seconds / 60);
    const remSeconds = parseInt(seconds % 60);

    return `${hour} hr ${minute} min ${remSeconds} sec ago`;
}

// 1. fetch - load and show all categories

//create load categories
const loadCategories = () => {
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

const loadVideos = () => {
    //fetch the videos
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
        .catch(error => console.log(error))
}

// const cardDemo = 
//     {
//         "category_id": "1001",
//         "video_id": "aaah",
//         "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//         "title": "Colors of the Wind",
//         "authors": [
//             {
//                 "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//                 "profile_name": "Ethan Clark",
//                 "verified": true
//             }
//         ],
//         "others": {
//             "views": "233K",
//             "posted_date": "16090"
//         },
//         "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
//     }


const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = "";
    if (videos.length == 0){
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class = "min-h-[300px] flex flex-col justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h2 class = "py-5 text-xl text-center font-bold">No Content Available in this Category</h2>
        </div>
        `;
        return;
    }
    else {
        videosContainer.classList.add("grid");
    }
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML =
            `
        <figure class = "h-[200px] relative">
    <img
    class = "h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ?
         "":`<span class="absolute text-xs right-2 bottom-2 bg-black text-white p-2 rounded">${getTime(video.others.posted_date)}</span>`
      } 
      
  </figure>
  <div class="px-0 py-3 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>
    <div>
        <h2 class ="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
            <p class="text-gray-400">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? `<img class="w-5" src= "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`: ""}
        </div>
        <p class="text-gray-400">${video.others.views} views</p>
    </div>
  </div>
        
        `;
        videosContainer.append(card);
    })

}

// {
//     "category_id": "1001",
//     "category": "Music"
//   },

// create display all categories button
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    //add data in html
    //create a button
    categories.forEach((item) => {
        // console.log(item)
        // const button = document.createElement('button')
        // button.classList = 'btn';
        // button.innerText = item.category;
        // categoryContainer.append(button);
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =
        `
        <button onclick ="loadCategoryVideos(${item.category_id})" class= "btn">
        ${item.category}
        </button>

        `;
        categoryContainer.append(buttonContainer);
    })
}

loadCategories();
loadVideos();