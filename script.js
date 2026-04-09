// GESTION CONNEXION / DECONNEXION
let loggedIn = false;
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const appDiv = document.getElementById("app");
const messageDiv = document.getElementById("message");

loginBtn.addEventListener("click", () => {
  const code = prompt("Entrez le code :");
  if(code === "1234"){
    loggedIn = true;
    appDiv.style.display="flex";
    loginBtn.style.display="none";
    logoutBtn.style.display="inline";
    showForm("caisse");
    showMessage("Connecté avec succès !");
  } else {
    showMessage("Code incorrect", true);
  }
});

logoutBtn.addEventListener("click", () => {
  loggedIn = false;
  appDiv.style.display="none";
  loginBtn.style.display="inline";
  logoutBtn.style.display="none";
  showMessage("Déconnecté");
});

// AFFICHAGE FORMULAIRES
function showForm(formName){
  document.getElementById("formCaisse").style.display = formName==="caisse"?"block":"none";
  document.getElementById("formCCT1").style.display = formName==="cct1"?"block":"none";
  document.getElementById("menuCaisse").classList.toggle("active", formName==="caisse");
  document.getElementById("menuCCT1").classList.toggle("active", formName==="cct1");
}

// CHAMPS CONDITIONNELS
const typeVirement = document.getElementById("typeVirement");
const echeance = document.getElementById("echeance");
const dateVersement = document.getElementById("dateVersement");
const banque = document.getElementById("banque");

typeVirement.addEventListener("change", ()=> {
  if(typeVirement.value==="Chèque"){
    dateVersement.disabled=true; banque.disabled=true; echeance.disabled=false; dateVersement.value=""; banque.value="";
  } else if(typeVirement.value==="Pièce"){
    echeance.disabled=true; dateVersement.disabled=false; banque.disabled=false; echeance.value="";
  } else{
    echeance.disabled=false; dateVersement.disabled=false; banque.disabled=false;
  }
});

// AFFICHAGE MESSAGE ENVOI FORMULAIRE
function showMessage(text, isError=false){
  messageDiv.innerText=text;
  messageDiv.style.color=isError?"red":"green";
  messageDiv.style.display="block";
  setTimeout(()=>{ messageDiv.style.display="none"; },4000);
}

// IFRAME CALLBACK
function iframeLoaded(){
  // Si formulaire soumis
  showMessage("Enregistré avec succès !");
}