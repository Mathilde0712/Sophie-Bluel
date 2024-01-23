// export const fetchWork = async () => {
//   try {
//     await fetch("http://localhost:5678/api/works")
//       .then((res) => res.json())
//       .then((data) => (workData = data));
//   } catch (error) {
//     console.error("Erreur !");
//   }
// };

// //Les catégories
// export const fetchCategory = async () => {
//   await fetch("http://localhost:5678/api/categories")
//     .then((res) => res.json())
//     .then((category) => (categoriesData = category));
// };

// export const filteredWorkData = (myData, category) => {
//   if (category === "Tous") return myData;
//   return myData.filter((work) => work.category.name === category);
// };

// export const workDisplay = async (category = "Tous") => {
//   await fetchWork();
//   const myData = filteredWorkData(workData, category);
//   //console.log(myData, category);
//   gallery.innerHTML = myData
//     .map(
//       (work) =>
//         `
//       <figure>
//     <img src = "${work.imageUrl}" alt="Photo de ${work.title}">
//     <figcaption>${work.title}</figcaption>
//     </figure>
//     `
//     )
//     .join("");
// };

// workDisplay();
