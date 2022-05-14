const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=25&format=json&origin=*&srsearch=";
const form = document.querySelector("form");
const searchInput = document.querySelector("input");

const searchContainer = document.querySelector(".row");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = searchInput.value;
  if (!value) {
    searchContainer.innerHTML =
      '<h3 class="text-center text-capitalize text-danger">please enter valid search term</h3>';
    return;
  }
  fetchApi(value);
});
const fetchApi = async (value) => {
  searchContainer.innerHTML = '<div class="loading"></div> ';
  try {
    const response = await fetch(`${url}${value}`);
    const {
      query: { search },
    } = await response.json();
    if (search.length < 1) {
      searchContainer.innerHTML =
        '<h3 class="text-center text-capitalize text-danger">no matching results. Please try again</h3>';
      return;
    }
    displayData(search);
  } catch (err) {
    searchContainer.innerHTML =
      '<h3 class="text-center text-capitalize text-danger">there was an error</h3>';
  }
};

const displayData = (lists) => {
  console.log(lists);
  const item = lists
    .map((list) => {
      const { pageid, snippet, title } = list;
      return `
   <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank" class="col-lg-6 col-xl-4 mb-4">
   <article>
<h4>

${title}
</h4>
<p>
${snippet}
</p>
   </article>
   </a>
   
   `;
    })
    .join(" ");
  searchContainer.innerHTML = item;
};
