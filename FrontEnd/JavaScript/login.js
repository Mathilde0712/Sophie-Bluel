const userEmail = document.querySelector('input[type="email"]');
const userPassword = document.querySelector('input[type="password"]');
const error = document.getElementById("error");
const login = document.querySelector('input[type="submit"]');

const fetchPost = async () => {
  const user = {
    email: userEmail.value,
    password: userPassword.value,
  };
  const chargeUtile = JSON.stringify(user);
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    });
    if (response.status === 200) {
      const tokenData = await response.json();
      // sessionStorage.userId = tokenData.userId;
      sessionStorage.token = tokenData.token;
      window.location.href = "./index.html";
    } else {
      error.textContent = "Erreur dans l’identifiant ou le mot de passe";
    }
    //si on a une  erreur de recupération de données
  } catch (error) {
    console.error(error);
  }
};
//on utilise click car c'est un input et non un bouton
login.addEventListener("click", (e) => {
  e.preventDefault(); //eviter le rechargement de la page
  fetchPost();
});
