let workData = [];
const gallery = document.querySelector(".gallery");
let i = 0;

// variable pour récupérer données API
const fetchWork = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (workData = data));
  console.log(workData);
};
//afficher le display avec une async pour avoir le temps de récupérer les données de l'api
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
