document.getElementById("year").textContent = new Date().getFullYear();

const workshops = {
  6: {date:"Viernes 6 de noviembre",name:"Taller de calabazas",intro:"Crea dos calabazas de diferentes tamaños y decóralas a tu gusto.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Rellenar dos calabazas de diferentes tamaños.","Decorar con fieltro: hojas, detalles y colores."],time:"17:00–19:00",duration:"2 horas",price:"30 €",spots:"5 por sesión",past:true},
  7: {date:"Sábado 7 de noviembre",name:"Taller de calabazas",intro:"Crea dos calabazas de diferentes tamaños y decóralas a tu gusto.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Rellenar dos calabazas de diferentes tamaños.","Decorar con fieltro: hojas, detalles y colores."],time:"10:00–12:00",duration:"2 horas",price:"30 €",spots:"5 por sesión",past:true},
  14: {date:"Sábado 14 de noviembre",name:"Taller de tote bag",intro:"Crea una bolsa de tela única y totalmente a tu estilo.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Remallar los bordes.","Decorar con pegatinas vinílicas (¡tenemos muchos diseños!)."],time:"10:00–13:00",duration:"3 horas",price:"50 €",spots:"2"},
  21: {date:"Sábado 21 de noviembre",name:"Taller de decoupage",intro:"Decora un plato utilizando la técnica del decoupage y dale un acabado único y especial.",steps:["Elegir el diseño de una servilleta.","Decorar un plato utilizando la técnica del decoupage.","Pintar en diferentes colores.","Añadir detalles y acabados especiales.","Barnizar para un resultado duradero y profesional."],time:"10:00–13:00",duration:"3 horas",price:"50 €",spots:"5"},
  28: {date:"Sábado 28 de noviembre",name:"Taller de árboles de Navidad",intro:"Crea tu propio árbol de tela y decóralo con todo tu estilo.",steps:["Elegir la tela que más te guste.","Recortar las piezas con el patrón.","Coser a máquina.","Rellenar el árbol.","Decorar con objetos de costura y mercería: lazos, botones, cintas, etc."],time:"10:00–13:00",duration:"3 horas",price:"40 €",spots:"5"}
};
const calendar = document.getElementById("course-calendar");
if (calendar) {
  const fields = {status:document.getElementById("course-status"),date:document.getElementById("course-date"),name:document.getElementById("course-name"),intro:document.getElementById("course-intro"),steps:document.getElementById("course-steps"),time:document.getElementById("course-time"),duration:document.getElementById("course-duration"),price:document.getElementById("course-price"),spots:document.getElementById("course-spots"),contact:document.getElementById("course-contact")};
  const selectDay = day => {
    const item = workshops[day];
    if (!item) return;
    calendar.querySelectorAll(".calendar-day").forEach(button => {
      const active = Number(button.dataset.day) === day;
      button.classList.toggle("selected",active);
      button.setAttribute("aria-pressed",String(active));
    });
    fields.date.textContent = item.date;\n    fields.status.textContent = item.past ? "Taller realizado" : "Próximo taller";
    fields.name.textContent = item.name;
    fields.intro.textContent = item.intro;
    fields.steps.replaceChildren(...item.steps.map(step => {const li=document.createElement("li");li.textContent=step;return li;}));
    fields.time.textContent = item.time;
    fields.duration.textContent = item.duration;
    fields.price.textContent = item.price;
    fields.spots.textContent = item.spots;
    if (item.past) {
      fields.contact.textContent = "Actividad realizada";
      fields.contact.removeAttribute("href");
      fields.contact.classList.add("button-disabled");
      fields.contact.setAttribute("aria-disabled","true");
    } else {
      fields.contact.textContent = "Consultar / reservar plaza";
      fields.contact.href = "https://wa.me/34676435554?text=" + encodeURIComponent("Hola, quiero información sobre el " + item.name + " del " + item.date + ".");
      fields.contact.classList.remove("button-disabled");
      fields.contact.removeAttribute("aria-disabled");
    }
  };
  calendar.querySelectorAll(".calendar-day").forEach(button => button.addEventListener("click",() => selectDay(Number(button.dataset.day))));
  selectDay(14);
}