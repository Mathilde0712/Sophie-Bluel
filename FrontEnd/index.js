let workData = [];
let categoriesData = [];

const objects = document.querySelector(".objects");
const all = document.querySelector(".all");
const apartments = document.querySelector(".apartments");
const hotels = document.querySelector(".hotels");
const gallery = document.querySelector(".gallery");

// variable pour récupérer données API
//les projets
const fetchWork = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (workData = data));
  //console.log(workData);
};
//Les catégories
const fetchCategory = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((category) => (categoriesData = category));
  //console.log(categoriesData);
};
fetchCategory();

//afficher le display avec une async pour avoir le temps de récupérer
//les données de l'API
const workDisplay = async () => {
  await fetchWork();
  gallery.innerHTML = workData
    .map(
      (work) =>
        `
    <figure>
  <img src = "${work.imageUrl}" alt="Photo de ${work.title}">
  <figcaption>${work.title}</figcaption>
  </figure>
  `
    )
    .join("");
};

workDisplay();

//filtrer les projets
const filterObjects = async () => {
  await fetchWork();
  const objectsFilter = workData.filter((work) => {
    return work.category.name === "Objets";
  });
  console.log(objectsFilter);
};

const filterApartments = async () => {
  await fetchWork();
  const apartmentsFilter = workData.filter((work) => {
    return work.category.name === "Appartements";
  });
  console.log(apartmentsFilter);
};

const filterHotels = async () => {
  await fetchWork();
  const hotelsFilter = workData.filter((work) => {
    return work.category.name === "Hotels & restaurants";
  });
  console.log(hotelsFilter);
};

const filterAll = async () => {
  await fetchWork();
  const allFilter = workData;
  console.log(allFilter);
};

objects.addEventListener("click", () => {
  filterObjects();
  //gallery.innerHTML = "";
});

apartments.addEventListener("click", () => {
  filterApartments();
});

hotels.addEventListener("click", () => {
  filterHotels();
});

all.addEventListener("click", () => {
  filterAll();
});

//filterObjects();
//console.log(arrayNumber.filter((number) => number > 10)
