function mostrarSeccion(id){
  document.querySelectorAll(".seccion").forEach(sec=>{
    sec.classList.remove("activa");
  });

  document.getElementById(id).classList.add("activa");
}

let historias = [];

const form = document.getElementById("formHistoria");
const lista = document.getElementById("listaHistorias");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const texto = document.getElementById("textoHistoria").value;
  const foto = document.getElementById("fotoHistoria").files[0];

  let imgURL = foto ? URL.createObjectURL(foto) : "";

  historias.push({texto, img: imgURL});
  mostrar();
  form.reset();
});

function mostrar(){
  lista.innerHTML = "";

  historias.forEach((h,i)=>{
    lista.innerHTML += `
      <article class="historia">
        <p>${h.texto}</p>
        ${h.img ? `<img src="${h.img}" width="100%">` : ""}
        <button onclick="editar(${i})">Editar</button>
        <button onclick="eliminar(${i})">Eliminar</button>
      </article>
    `;
  });
}

function eliminar(i){
  historias.splice(i,1);
  mostrar();
}

function editar(i){
  let nuevo = prompt("Editar:", historias[i].texto);
  if(nuevo){
    historias[i].texto = nuevo;
    mostrar();
  }
}

const btn = document.getElementById("btnArriba");

window.onscroll = function(){
  btn.style.display = document.documentElement.scrollTop > 200 ? "block" : "none";
};

btn.onclick = ()=>{
  window.scrollTo({top:0, behavior:"smooth"});
};
