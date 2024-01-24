// // variable pour récupérer données API-----------------------------------------------------------------------------------------------------------
// // les projets
// export const fetchWork = async () => {
//   try {
//     const response = await fetch("http://localhost:5678/api/works");
//     const data = await response.json();
//     workData = data;
//     return workData;
//   } catch (error) {
//     console.error(error);
//   }
// };

// //Les catégories
// export const fetchCategory = async () => {
//   try {
//     const response = await fetch("http://localhost:5678/api/categories");
//     const category = await response.json();
//     categoriesData = category;
//     return categoriesData;
//   } catch (error) {
//     console.error(error);
//   }
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
