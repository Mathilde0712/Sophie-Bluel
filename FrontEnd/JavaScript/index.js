//variables pour mettre dans un tableau les données de l'API
let workData = [];
let categoriesData = [];

//variables pour récupérer le conteneur de la gallerie
const gallery = document.querySelector(".gallery");
//variables pour sélectionne le conteneur des filtres
const FilterContainer = document.querySelector(".filter-container");
//Variables pour sélectionner les filtres du DOM
const objects = document.querySelector(".objects");
const all = document.querySelector(".all");
const apartments = document.querySelector(".apartments");
const hotels = document.querySelector(".hotels");
//variable pour sélectionner le block édition
const edition = document.querySelector(".edition_mode");
//variable pour selectionner le header
const header = document.querySelector("header");
//variable pour selectionner le text login/logout
const logout = document.getElementById("logout");
//variables pour sélectionner le conteneur modifier
const modify = document.querySelector(".modify");
//variable pour selectionner le aside modal
const modal = document.querySelector(".modal");
//variable pour sélectionner la croix de la modale
const close1 = document.querySelector(".modal-wrapper .fa-xmark");
const close2 = document.querySelector(".modal-add .fa-xmark");
//variable pour sélectionner la gallerie dans la modale
const galleryModal = document.querySelector(".gallery-modal");
const addPhoto = document.querySelector(".add-photo");
const modal2 = document.querySelector(".modal2");
const previous = document.querySelector(".modal-add .fa-arrow-left");
const select = document.getElementById("select");
const option = document.createElement("option");
// variable pour récupérer données API-----------------------------------------------------------------------------------------------------------
//les projets
const fetchWork = async () => {
  try {
    await fetch("http://localhost:5678/api/works")
      .then((res) => res.json())
      .then((data) => (workData = data));
  } catch (error) {
    console.error("Erreur !");
  }
};
fetchWork();

//Les catégories
const fetchCategory = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((category) => (categoriesData = category));
};
fetchCategory();

//fonction pour filtrer les catégories et les afficher = fonction générale avec base catégorie TOUS----------------------------------------------
const filteredWorkData = (myData, category) => {
  if (category === "Tous") return myData;
  return myData.filter((work) => work.category.name === category);
};

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

//creation fonction pour mettre la classe checked sur les boutons et l'enlever -------------------------------------------------------------------
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

//ecouteurs d'évènements pour filtrer au click---------------------------------------------------------------------------------------------------------------------
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

//modifier le code html après connexion---------------------------------------------------------------------------------
//recuperer le token
const tokenData = sessionStorage.getItem("token");
//si token connecté alors changer  styles
if (tokenData) {
  logout.innerHTML = "logout";
  edition.style.visibility = "visible";
  header.style.margin = "50px 0";
  FilterContainer.style.display = "none";
  modify.style.visibility = "visible";
}

//faire apparaitre la modal au click de modifier et la supprimer en cliquant sur la croix-------------------------------------------
const openModal = () => {
  modal.style.visibility = "visible";
};

const closeModal = () => {
  modal.style.visibility = "hidden";
};

modify.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

close1.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

const modalDisplay = async () => {
  await fetchWork();
  galleryModal.innerHTML = workData
    .map(
      (work) =>
        `
    <figure>
  <img src = "${work.imageUrl}" alt="Photo de ${work.title}">
  <i class="fa-solid fa-trash-can" data-id="${workData.id}"></i>
  </figure>
  `
    )
    .join("");
  const trashCans = document.querySelectorAll(".gallery-modal .fa-trash-can");
  trashCans.forEach((trash) => {
    // const workId = trash.dataset.id;
    trash.addEventListener("click", async (e) => {
      console.log("test", e.target.id);
      e.preventDefault;
      alert("vous avez cliqué sur la poubelle");

      // await fetchDelete(workData.id);
    });
  });
};

modalDisplay();

const fetchDelete = async (id) => {
  await fetchWork();
  try {
    // let id = workData.id; //ne comprends pas pourquoi cela ne fonctionne pas
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenData,
      },
    }).then(() => console.log("suppression réussie"));
    if (!res.ok) console.error("Erreur lors de la suppression du projet");
  } catch (error) {
    console.error("Erreur !");
  }
};

// ouvrir la modale pour ajouter une photo ----------------------
const openModal2 = () => {
  modal2.style.visibility = "visible";
};

addPhoto.addEventListener("click", (e) => {
  openModal2();
});

const closeModal2 = () => {
  modal2.style.visibility = "hidden";
};

close2.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal2();
});

previous.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal2();
});

// faire apparaitre les catégories dans le selecteur --------------
const selectDisplay = async () => {
  await fetchCategory();
  select.innerHTML = categoriesData.map(
    (category) =>
      `
  <option>${category.name}</option>
  `
  );
};
selectDisplay();

// faire apparaitre visuellement l'image après le téléchargement
const fileInput = document.getElementById("fileItem");
const imgPreview = document.querySelector(".imgVisuel img");
const inputAddPhoto = document.querySelector(".input-addPhoto");

fileInput.addEventListener("change", (e) => {
  for (const file of fileInput.files) {
    console.log(file.name);
    imgPreview.src = `http://localhost:3000/../assets/images/${file.name}`;
    imgPreview.alt = file.name;
    imgPreview.style.visibility = "visible";
    inputAddPhoto.style.visibility = "hidden";
  }
});

// tous les inputs doivent être rempli pour valider
