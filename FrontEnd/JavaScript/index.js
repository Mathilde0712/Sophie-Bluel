// import { fetchCategory, fetchWork, workDisplay, filteredWorkData } from "./modules.js";

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
const crossModalWrapper = document.querySelector(".modal-wrapper .fa-xmark");
const crossModalAdd = document.querySelector(".modal-add .fa-xmark");
//variable pour sélectionner la gallerie dans la modale
const galleryModal = document.querySelector(".gallery-modal");
const addPhotobtn = document.querySelector(".add-photo");
const modal2 = document.querySelector(".modal2");
const previous = document.querySelector(".modal-add .fa-arrow-left");
const option = document.createElement("option");
const modalAdd = document.querySelector(".modal-add");
const modalWrapper = document.querySelector(".modal-wrapper");

// variable pour récupérer données API-----------------------------------------------------------------------------------------------------------
// les projets
const fetchWork = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    workData = data;
    return workData;
  } catch (error) {
    console.error(error);
  }
};

//Les catégories
const fetchCategory = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const category = await response.json();
    categoriesData = category;
    return categoriesData;
  } catch (error) {
    console.error(error);
  }
};

// fonction pour filtrer les catégories et les afficher = fonction générale avec base catégorie TOUS----------------------------------------------
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

//fonction pour retourner sur la page d'accueil et ne plus être logger quand on appuie sur sophie bluel ou sur logout
const clearData = () => {
  sessionStorage.clear("token");
};
const accueil = document.querySelector("h1");

accueil.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./index.html";
  clearData();
});

if (logout.innerHTML === "logout") {
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./index.html";
    clearData();
  });
}

//faire apparaitre la modal au click de modifier et la supprimer en cliquant sur la croix ou en cliquant ) l'extérieur-------------------------------------------
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

crossModalWrapper.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

modal.addEventListener("click", (e) => {
  if (!modalWrapper.contains(e.target)) {
    e.preventDefault();
    closeModal();
  }
});

//fonction pour faire apparaitre les images dans la modale de suppression et fonction pour supprimer au click de la poubelle
const modalDisplay = async () => {
  await fetchWork();
  galleryModal.innerHTML = workData
    .map(
      (work) =>
        `
    <figure>
  <img src = "${work.imageUrl}" alt="Photo de ${work.title}">
  <i class="fa-solid fa-trash-can"></i>
  </figure>
  `
    )
    .join("");
  const trashCans = document.querySelectorAll(".gallery-modal .fa-trash-can");
  trashCans.forEach((trash, index) => {
    trash.addEventListener("click", async (e) => {
      await fetchDelete(workData[index].id);
      e.preventDefault;
      modalDisplay();
      workDisplay();
      alert("Votre projet a été supprimé !");
    });
  });
};

modalDisplay();

//fonction pour supprimer un projet de l'API
const fetchDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenData,
      },
    });
    if (!res.ok) {
      console.log("erreur lors de la suppression");
    }
  } catch (error) {
    console.error(error);
  }
};

// ouvrir la modale pour ajouter une photo ----------------------
const openModal2 = () => {
  inputAddPhoto.style.visibility = "visible";
  modal2.style.visibility = "visible";
};

addPhotobtn.addEventListener("click", (e) => {
  e.preventDefault;
  openModal2();
});

//fermer la modale d'ajout de photo
const closeModal2 = () => {
  modal2.style.visibility = "hidden";
  previewImage.style.visibility = "hidden";
  inputAddPhoto.style.visibility = "hidden";
  imgError.style.visibility = "hidden";
};
modal2.addEventListener("click", (e) => {
  if (!modalAdd.contains(e.target)) {
    e.preventDefault();
    closeModal();
    closeModal2();
    resetForm();
  }
});

// faire apparaitre les catégories dans le selecteur --------------
const selectDisplay = async () => {
  await fetchCategory();
  select.innerHTML = categoriesData.map(
    (category) =>
      `
  <option value="${category.id}">${category.name}</option>
  `
  );
};

selectDisplay();

// faire apparaitre visuellement l'image après le téléchargement

const inputAddPhoto = document.querySelector(".input-addPhoto");
const fileInput = document.getElementById("fileItem");
const previewImage = document.getElementById("preview");
const imgError = document.querySelector(".error");
let fichier;
let titre;
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  // Créez un objet FileReader : permet a des applications web de lire le contenu de fichier
  // new permet de créer un nouvel objet à partir de 0
  const reader = new FileReader();

  reader.onload = () => {
    previewImage.src = reader.result;
  };
  if (file.size / 1000000 < 4) {
    reader.readAsDataURL(file);
    previewImage.style.visibility = "visible";
    inputAddPhoto.style.visibility = "hidden";
    imgError.style.visibility = "hidden";
    fichier = file;
    validButton();
  } else {
    imgError.style.visibility = "visible";
  }
});

//passer le bouton en vert quand les 3 inputs sont remplis
const titleInput = document.getElementById("title");
const valid = document.getElementById("valid");
titleInput.addEventListener("input", (e) => {
  e.preventDefault;
  titre = e.target.value;
  validButton();
});

const titleChecker = (value) => {
  if (value.length < 1) {
    console.log("manque le titre");
  } else {
    console.log("pas d'erreur");
    titre = value;
  }
};
//pour que le bouton passe au vert
const validButton = () => {
  if (titre && fichier) {
    valid.classList.add("bgGreen");
  } else {
    valid.classList.remove("bgGreen");
  }
};

const resetForm = () => {
  const form = document.getElementById("form");
  form.reset();
};

const resetFormImg = () => {
  const formImg = document.getElementById("formImg");
  formImg.reset();
};

crossModalAdd.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal2();
  valid.classList.remove("bgGreen");
  resetFormImg();
  resetForm();
});

previous.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal2();
  valid.classList.remove("bgGreen");
  resetFormImg();
  resetForm();
});

// //ajouter les photos
const select = document.getElementById("select");

const fetchPhoto = async () => {
  try {
    const formData = new FormData();
    formData.append("image", fichier);
    formData.append("title", titre);
    formData.append("category", select.value);
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + tokenData,
      },
      body: formData,
    });
    if (response.OK) {
      workData = await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

valid.addEventListener("click", async (e) => {
  if (valid.classList.contains("bgGreen")) {
    e.preventDefault();
    await fetchPhoto();
    alert("Votre projet a été ajouté !");
    modalDisplay();
    workDisplay();
    valid.classList.remove("bgGreen");
    resetFormImg();
    resetForm();
    closeModal();
    closeModal2();
  } else {
    alert("Veuillez remplir tous les champs");
  }
});
