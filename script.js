const ramos = [
  // 1º Semestre
  { id: "morfologia", nombre: "Morfología General", semestre: 1, prerreq: [] },
  { id: "bioquimica", nombre: "Bases Bioquímicas", semestre: 1, prerreq: [] },
  { id: "quimica", nombre: "Química General y Orgánica", semestre: 1, prerreq: [] },
  { id: "salud", nombre: "Salud Pública", semestre: 1, prerreq: [] },
  { id: "com1", nombre: "Comunicación Oral y Escrita I", semestre: 1, prerreq: [] },
  { id: "ingles1", nombre: "Idioma Extranjero I", semestre: 1, prerreq: [] },
  { id: "bioestadistica", nombre: "Bioestadística Descriptiva", semestre: 1, prerreq: [] },

  // 2º Semestre
  { id: "com2", nombre: "Comunicación Oral y Escrita II", semestre: 2, prerreq: ["com1"] },
  { id: "ingles2", nombre: "Idioma Extranjero II", semestre: 2, prerreq: ["ingles1"] },
  { id: "educacion", nombre: "Educación para la Salud", semestre: 2, prerreq: ["bioestadistica", "salud"] },
  { id: "intro_clinica", nombre: "Introducción a la Clínica", semestre: 2, prerreq: ["salud"] },

  // 3º Semestre
  { id: "patologia", nombre: "Patología Humana", semestre: 3, prerreq: ["bioquimica", "morfologia"] },
  { id: "fisiologia", nombre: "Fisiología Humana", semestre: 3, prerreq: ["bioquimica", "morfologia"] },
  { id: "microbio", nombre: "Microbiología", semestre: 3, prerreq: ["quimica", "bioquimica"] },
  { id: "preclinico1", nombre: "Biomateriales y Preclínico I", semestre: 3, prerreq: ["quimica", "bioquimica", "morfologia"] },
  { id: "autogestion", nombre: "Autogestión del Aprendizaje", semestre: 3, prerreq: [] },
  { id: "ingles3", nombre: "Idioma Extranjero III", semestre: 3, prerreq: ["ingles2"] },
  { id: "inmuno", nombre: "Inmunología", semestre: 3, prerreq: ["bioquimica"] },
  { id: "anatomia", nombre: "Anatomía Cabeza y Cuello", semestre: 3, prerreq: ["morfologia"] },

  // 4º Semestre
  { id: "equipo", nombre: "Trabajo en Equipo", semestre: 4, prerreq: ["autogestion"] },
  { id: "epidemio", nombre: "Epidemiología", semestre: 4, prerreq: ["intro_clinica", "bioestadistica"] },
];

let aprobados = new Set(JSON.parse(localStorage.getItem("aprobadosOdonto")) || []);
const container = document.getElementById("malla");

function crearMalla() {
  container.innerHTML = "";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.dataset.id = ramo.id;
    div.innerText = ramo.nombre;

    if (!estanDesbloqueados(ramo)) {
      div.classList.add("bloqueado");
    } else {
      div.classList.add("desbloqueado");
    }

    if (aprobados.has(ramo.id)) {
      div.classList.add("aprobado");
    }

    div.addEventListener("click", () => {
      if (!estanDesbloqueados(ramo)) return;

      if (aprobados.has(ramo.id)) {
        aprobados.delete(ramo.id);
      } else {
        aprobados.add(ramo.id);
      }

      localStorage.setItem("aprobadosOdonto", JSON.stringify([...aprobados]));
      actualizarMalla();
    });

    container.appendChild(div);
  });
}

function estanDesbloqueados(ramo) {
  return ramo.prerreq.every(id => aprobados.has(id));
}

function actualizarMalla() {
  crearMalla();
}

crearMalla();
