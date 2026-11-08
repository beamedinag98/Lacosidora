document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const workshops = {
    "2026-10-10": {date:"Sábado 10 de octubre",name:"Diseña tu tote bag",intro:"Personaliza una tote bag a tu estilo con diseños y pegatinas vinílicas de otoño.",steps:["Elegir los diseños que más te gusten.","Colocar las pegatinas para personalizar la bolsa.","Crear una tote bag única."],time:"Taller realizado",duration:"Taller",price:"—",spots:"Edición pasada",image:"assets/tote-bag.svg",past:true},
    "2026-10-17": {date:"Sábado 17 de octubre",name:"Crea tu calabaza de tela",intro:"Cose tu propia calabaza de tela y decórala a tu gusto. Un proyecto sencillo y otoñal.",steps:["Elegir las telas.","Cortar las piezas con el patrón.","Coser, rellenar y decorar la calabaza."],time:"Taller realizado",duration:"Taller",price:"—",spots:"Edición pasada",image:"assets/calabaza.svg",past:true},
    "2026-10-24": {date:"Sábado 24 de octubre",name:"Crea tu calabaza de tela",intro:"Cose tu propia calabaza de tela y decórala a tu gusto. Un proyecto sencillo y otoñal.",steps:["Elegir las telas.","Cortar las piezas con el patrón.","Coser, rellenar y decorar la calabaza."],time:"Taller realizado",duration:"Taller",price:"—",spots:"Edición pasada",image:"assets/calabaza.svg",past:true},
    "2026-11-06": {date:"Viernes 6 de noviembre",name:"Taller de calabazas",intro:"Crea dos calabazas de diferentes tamaños y decóralas a tu gusto.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Rellenar dos calabazas de diferentes tamaños.","Decorar con fieltro: hojas y detalles."],time:"17:00–19:00",duration:"2 horas",price:"30 €",spots:"Máximo 5 plazas",image:"assets/calabaza.svg",past:true},
    "2026-11-07": {date:"Sábado 7 de noviembre",name:"Taller de calabazas",intro:"Crea dos calabazas de diferentes tamaños y decóralas a tu gusto.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Rellenar dos calabazas de diferentes tamaños.","Decorar con fieltro: hojas y detalles."],time:"10:00–12:00",duration:"2 horas",price:"30 €",spots:"Máximo 5 plazas",image:"assets/calabaza.svg",past:true},
    "2026-11-14": {date:"Sábado 14 de noviembre",name:"Taller de tote bag",intro:"Crea una bolsa de tela única y totalmente a tu estilo.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Remallar los bordes.","Decorar con pegatinas vinílicas: ¡tenemos muchos diseños!"],time:"10:00–13:00",duration:"3 horas",price:"50 €",spots:"Máximo 2 plazas",image:"assets/tote-bag.svg"},
    "2026-11-21": {date:"Sábado 21 de noviembre",name:"Taller de decoupage",intro:"Decora un plato utilizando la técnica del decoupage y dale un acabado único y especial.",steps:["Elegir el diseño de una servilleta.","Decorar un plato utilizando la técnica del decoupage.","Pintar en diferentes colores.","Añadir detalles y acabados especiales.","Barnizar para un resultado duradero."],time:"10:00–13:00",duration:"3 horas",price:"50 €",spots:"Máximo 5 plazas",image:"assets/decoupage.svg"},
    "2026-11-28": {date:"Sábado 28 de noviembre",name:"Taller de árboles de Navidad",intro:"Crea tu propio árbol de tela y decóralo con todo tu estilo.",steps:["Elegir la tela que más te guste.","Recortar las piezas con el patrón.","Coser a máquina.","Rellenar el árbol.","Decorar con lazos, botones, cintas y otros detalles."],time:"10:00–13:00",duration:"3 horas",price:"40 €",spots:"Máximo 5 plazas",image:"assets/arboles-navidad.svg"}
  };

  const calendar = document.getElementById("course-calendar");
  if (!calendar) return;
  let shown = new Date(2026, 10, 1);
  const label = document.getElementById("month-label");
  const detailEmpty = document.querySelector(".detail-empty");
  const detailLive = document.querySelector(".detail-live");
  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const keyFor = (y,m,d) => y + "-" + String(m+1).padStart(2,"0") + "-" + String(d).padStart(2,"0");

  function show(item) {
    detailEmpty.hidden = true;
    detailLive.hidden = false;
    document.getElementById("course-date").textContent = item.date;
    document.getElementById("course-name").textContent = item.name;
    document.getElementById("course-intro").textContent = item.intro;
    document.getElementById("course-status").textContent = item.past ? "Taller realizado" : "Próximo taller";
    const photo = document.getElementById("course-photo");
    const photoImg = document.getElementById("course-photo-img");
    photo.hidden = !item.image;
    if (item.image) { photoImg.src = item.image; photoImg.alt = item.name; }
    const ul = document.getElementById("course-steps");
    ul.replaceChildren(...item.steps.map(step => { const li = document.createElement("li"); li.textContent = step; return li; }));
    [["course-time",item.time],["course-duration",item.duration],["course-price",item.price],["course-spots",item.spots]].forEach(([id,value]) => document.getElementById(id).textContent = value);
    const link = document.getElementById("course-contact");
    if (item.past) link.hidden = true;
    else {
      link.hidden = false;
      link.href = "https://wa.me/34676435554?text=" + encodeURIComponent("Hola, quiero reservar plaza para " + item.name + " (" + item.date + ").");
    }
  }

  function render() {
    const y = shown.getFullYear(), m = shown.getMonth();
    const first = (new Date(y,m,1).getDay()+6)%7;
    const days = new Date(y,m+1,0).getDate();
    label.textContent = monthNames[m] + " " + y;
    calendar.replaceChildren();
    for (let i=0; i<first; i++) {
      const blank = document.createElement("span");
      blank.className = "agenda-blank";
      calendar.append(blank);
    }
    for (let d=1; d<=days; d++) {
      const key = keyFor(y,m,d), item = workshops[key];
      const cell = document.createElement(item ? "button" : "div");
      cell.className = "agenda-day";
      if (item) {
        cell.type = "button";
        cell.classList.add("has-event");
        if (item.past) cell.classList.add("is-past");
        cell.setAttribute("aria-label", d + ", " + item.name);
        const thumb = document.createElement("img");
        thumb.className = "agenda-thumb";
        thumb.src = item.image;
        thumb.alt = "";
        const day = document.createElement("span");
        day.className = "agenda-number";
        day.textContent = d;
        const name = document.createElement("em");
        name.textContent = item.name;
        cell.append(day, thumb, name);
        cell.addEventListener("click", () => show(item));
      } else {
        cell.textContent = d;
      }
      calendar.append(cell);
    }
  }

  document.getElementById("month-prev").addEventListener("click", () => {
    shown = new Date(shown.getFullYear(), shown.getMonth()-1, 1);
    render(); detailLive.hidden = true; detailEmpty.hidden = false;
  });
  document.getElementById("month-next").addEventListener("click", () => {
    shown = new Date(shown.getFullYear(), shown.getMonth()+1, 1);
    render(); detailLive.hidden = true; detailEmpty.hidden = false;
  });
  const pageLinks = document.querySelectorAll("[data-page-link]");
  function activatePage(page, updateHash = true) {
    document.body.dataset.page = page;
    pageLinks.forEach(link => {
      const active = link.dataset.pageLink === page;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (updateHash) {
      const target = {home:"#inicio",services:"#servicios",courses:"#cursos",space:"#espacio"}[page] || "#inicio";
      history.replaceState(null, "", target);
    }
    window.scrollTo({top:0,behavior:"smooth"});
  }
  pageLinks.forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    activatePage(link.dataset.pageLink);
  }));
  const initialHash = location.hash;
  const initialPage = initialHash === "#servicios" ? "services" : initialHash === "#cursos" ? "courses" : initialHash === "#espacio" || initialHash === "#contacto" ? "space" : "home";
  activatePage(initialPage, false);
  render();
  show(workshops["2026-11-14"]);

  // Servicios: mostrar la información dentro de esta misma página.
  const serviceInfo = {
    arreglos: {title:"Arreglos y transformaciones",copy:"En La Cosidora realizamos todo tipo de arreglos y transformaciones de ropa: bajos de pantalones, cambios de cremalleras, ajustes de cintura, estrechar o ensanchar prendas y mucho más. También trabajamos con vestidos de fiesta y de quinceañera, y estamos especializadas en arreglos de uniformes escolares y uniformes profesionales, como los del Ejército de Tierra, la Armada, la Policía y la Guardia Civil. Además, arreglamos cortinas, cojines y otros textiles del hogar. ¿Tienes una prenda especial o un arreglo en mente? Cuéntanoslo y lo valoramos contigo. No confeccionamos prendas desde cero. Si tienes dudas sobre algún trabajo, consúltanos por WhatsApp."},
    merceria: {title:"Mercería",copy:"En nuestra mercería encontrarás todo tipo de artículos para tus labores y proyectos de costura: elásticos de varios anchos, cinta elástica Melograno en una gran variedad de colores, botones, cremalleras, hilos de costura y de torzal, agujas, pegamento para tela, puntillas, bies y accesorios de corsetería. También disponemos de retales de telas. Si buscas algo concreto, consúltanos y te ayudaremos a encontrarlo."},
    maquinas: {title:"Reparación de máquinas de coser",copy:"Te ayudamos con la reparación de máquinas de coser. Escríbenos y cuéntanos qué modelo tienes y qué problema presenta para informarte."},
    cursos: {title:"Cursos y talleres",copy:"Tenemos propuestas para aprender, practicar y disfrutar de la costura, con cursos para adultos y talleres creativos. Consulta las próximas fechas y opciones en el apartado Talleres y cursos."},
    personalizados: {title:"Productos personalizados",copy:"Creamos detalles personalizados para regalar o para dar un toque especial a tus cosas. Cuéntanos tu idea y hablamos de las posibilidades."}
  };
  const serviceButtons = document.querySelectorAll(".service-choice");
  const servicePanel = document.getElementById("service-detail");
  if (serviceButtons.length && servicePanel) {
    const serviceTitle = document.getElementById("service-detail-title");
    const serviceCopy = document.getElementById("service-detail-copy");
    const serviceContact = document.getElementById("service-detail-contact");
    serviceButtons.forEach(button => button.addEventListener("click", () => {
      const info = serviceInfo[button.dataset.service];
      if (!info) return;
      serviceButtons.forEach(choice => {
        const selected = choice === button;
        choice.classList.toggle("is-selected", selected);
        choice.setAttribute("aria-expanded", String(selected));
      });
      serviceTitle.textContent = info.title;
      serviceCopy.textContent = info.copy;
      serviceContact.href = "https://wa.me/34676435554?text=" + encodeURIComponent("Hola, quiero información sobre " + info.title + ".");
      servicePanel.hidden = false;
      servicePanel.scrollIntoView({behavior:"smooth",block:"nearest"});
    }));
    servicePanel.querySelector(".service-detail-close").addEventListener("click", () => {
      servicePanel.hidden = true;
      serviceButtons.forEach(button => {
        button.classList.remove("is-selected");
        button.setAttribute("aria-expanded","false");
      });
    });
  }

});