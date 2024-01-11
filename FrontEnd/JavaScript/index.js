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
  try {
    await fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((data) => (workData = data));
  } catch (error) {
    console.error("Erreur !");
  }
  //console.log(workData);
};

//Les catégories
// const fetchCategory = async () => {
//   await fetch("http://localhost:5678/api/categories")
//     .then((res) => res.json())
//     .then((category) => (categoriesData = category));
//   //console.log(categoriesData);
// };
// fetchCategory();

const filteredWorkData = (myData, category) => {
  if (category === "Tous") return myData;
  return myData.filter((work) => work.category.name === category);
};

//fonction pour filtrer les catégories et les afficher = fonction générale avec base catégorie TOUS
const workDisplay = async (category = "Tous") => {
  await fetchWork();
  const myData = filteredWorkData(workData, category);
  //console.log(myData, category);
  gallery.innerHTML = myData
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

//creation fonction pour mettre la classe checked sur les boutons et l'enlever !
const setActiveButton = (activeBtn) => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    if (button === activeBtn) {
      button.classList.add("checked");
    } else {
      button.classList.remove("checked");
    }
  });
};

//ecouteurs d'évènements au click
objects.addEventListener("click", () => {
  workDisplay("Objets");
  setActiveButton(objects);
});

apartments.addEventListener("click", () => {
  workDisplay("Appartements");
  setActiveButton(apartments);
});

hotels.addEventListener("click", () => {
  workDisplay("Hotels & restaurants");
  setActiveButton(hotels);
});

all.addEventListener("click", () => {
  workDisplay();
  setActiveButton(all);
});
