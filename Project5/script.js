const form = document.getElementById("bookmark-form");
const bookmarkNameValue = document.getElementById("bookmark-name");
const bookmarkUrlValue = document.getElementById("bookmark-url");
const AddBookmarkBtn = document.querySelector("button[type='submit']");
const bookmarkedList = document.querySelector(".bookmarked-list");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = bookmarkNameValue.value.trim();
  let url = bookmarkUrlValue.value.trim();
  let isPresent = urlPresent(url);
  if (validStrting(url)) {
    if (!isPresent.status) {
      let newCard = document.createElement("li");
      newCard.classList.add("item");
      newCard.setAttribute("data-id",Date.now())
      newCard.innerHTML = `<a class="item-name" href="${url}" target="_blank">${name}</a>
            <button class="remove-btn">Remove</button>`;
      bookmarkedList.append(newCard);

      bookmarks.push({
        id:Date.now(),
        name,
        url
      })
      localStorage.setItem("bookmarks",JSON.stringify(bookmarks))

    } else {
      alert(`This url is already saved for ${isPresent.bookmarkName}`);
    }
  } else {
    alert("Invalid URL");
    bookmarkUrlValue.value = "";
  }
  bookmarkNameValue.value = "";
  bookmarkUrlValue.value = "";
});

function validStrting(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function urlPresent(urlString) {
  const items = document.querySelectorAll(".item");
  const match = Array.from(items).find(item => item.querySelector(".item-name").getAttribute("href") === urlString)

  if(match){
    return{
        status : true,
        bookmarkName: match.querySelector(".item-name").innerText
    }
  }else{
    return false
  }

}

bookmarkedList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    let cardToDelete = e.target.closest(".item");
    bookmarks = bookmarks.filter(b => b.id != cardToDelete.dataset.id)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks   ))
    cardToDelete.remove();
  }
});

function renderBookmarks(){
    bookmarks.forEach(bookmark => {
        const newCard = document.createElement("li")
        newCard.classList.add("item")
        newCard.setAttribute("data-id",bookmark.id)
        newCard.innerHTML = `<a class="item-name" href="${bookmark.url}" target="_blank"
            >${bookmark.name}</a
          >
          <button class="remove-btn">Remove</button>`

          bookmarkedList.append(newCard)
    });
}

renderBookmarks()
