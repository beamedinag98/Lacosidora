document.getElementById("year").textContent = new Date().getFullYear();

const workshops = {
 "2026-11-06": {date:"Viernes 6 de noviembre",name:"Taller de calabazas",intro:"Crea dos calabazas de diferentes tamaños y decóralas a tu gusto.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Rellenar dos calabazas de diferentes tamaños.","Decorar con fieltro: hojas y detalles."],time:"17:00–19:00",duration:"2 horas",price:"30 €",spots:"Máximo 5 plazas por sesión",past:true},
 "2026-11-07": {date:"Sábado 7 de noviembre",name:"Taller de calabazas",intro:"Crea dos calabazas de diferentes tamaños y decóralas a tu gusto.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Rellenar dos calabazas de diferentes tamaños.","Decorar con fieltro: hojas y detalles."],time:"10:00–12:00",duration:"2 horas",price:"30 €",spots:"Máximo 5 plazas por sesión",past:true},
 "2026-11-14": {date:"Sábado 14 de noviembre",name:"Taller de tote bag",intro:"Crea una bolsa de tela única y totalmente a tu estilo.",steps:["Elegir la tela que más te guste.","Cortar las piezas con el patrón.","Coser a máquina.","Remallar los bordes.","Decorar con pegatinas vinílicas: ¡tenemos muchos diseños!"],time:"10:00–13:00",duration:"3 horas",price:"50 €",spots:"Máximo 2 plazas"},
 "2026-11-21": {date:"Sábado 21 de noviembre",name:"Taller de decoupage",intro:"Decora un plato utilizando la técnica del decoupage y dale un acabado único y especial.",steps:["Elegir el diseño de una servilleta.","Decorar un plato utilizando la técnica del decoupage.","Pintar en diferentes colores.","Añadir detalles y acabados especiales.","Barnizar para un resultado duradero y profesional."],time:"10:00–13:00",duration:"3 horas",price:"50 €",spots:"Máximo 5 plazas"},
 "2026-11-28": {date:"Sábado 28 de noviembre",name:"Taller de árboles de Navidad",intro:"Crea tu propio árbol de tela y decóralo con todo tu estilo.",steps:["Elegir la tela que más te guste.","Recortar las piezas con el patrón.","Coser a máquina.","Rellenar el árbol.","Decorar con lazos, botones, cintas y otros objetos de costura y mercería."],time:"10:00–13:00",duration:"3 horas",price:"40 €",spots:"Máximo 5 plazas"}
};
const calendar=document.getElementById("course-calendar");
if(calendar){
 let shown=new Date(2026,10,1), selected=null;
 const label=document.getElementById("month-label"), detailEmpty=document.querySelector(".detail-empty"), detailLive=document.querySelector(".detail-live");
 const monthNames=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
 const keyFor=(y,m,d)=>y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
 const render=()=>{
  const y=shown.getFullYear(),m=shown.getMonth(),first=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();
  label.textContent=monthNames[m]+" "+y; calendar.replaceChildren();
  for(let i=0;i<first;i++){const blank=document.createElement("span");blank.className="agenda-blank";calendar.append(blank);}
  for(let d=1;d<=days;d++){
   const key=keyFor(y,m,d),item=workshops[key],b=document.createElement("button");b.type="button";b.className="agenda-day";b.textContent=d;
   if(item){b.classList.add("has-event");if(item.past)b.classList.add("is-past");const em=document.createElement("em");em.textContent=item.name.replace("Taller de ","");b.append(em);}
   if(selected===key)b.classList.add("is-selected");
   b.setAttribute("aria-label",item?d+" de "+monthNames[m]+": "+item.name:d+" de "+monthNames[m]);
   b.addEventListener("click",()=>{if(item){selected=key;render();show(item,key);}else{selected=null;render();detailLive.hidden=true;detailEmpty.hidden=false;}});
   calendar.append(b);
  }
 };
 const show=(item,key)=>{
  detailEmpty.hidden=true;detailLive.hidden=false;
  document.getElementById("course-date").textContent=item.date;
  document.getElementById("course-status").textContent=item.past?"Taller realizado":"Inscripciones";
  document.getElementById("course-name").textContent=item.name;
  document.getElementById("course-intro").textContent=item.intro;
  const ul=document.getElementById("course-steps");ul.replaceChildren(...item.steps.map(s=>{const li=document.createElement("li");li.textContent=s;return li;}));
  for(const [id,value] of [["course-time",item.time],["course-duration",item.duration],["course-price",item.price],["course-spots",item.spots]])document.getElementById(id).textContent=value;
  const link=document.getElementById("course-contact");
  if(item.past){link.hidden=true;}else{link.hidden=false;link.href="https://wa.me/34676435554?text="+encodeURIComponent("Hola, quiero reservar plaza para "+item.name+" ("+item.date+").");}
 };
 document.getElementById("month-prev").addEventListener("click",()=>{shown=new Date(shown.getFullYear(),shown.getMonth()-1,1);selected=null;render();detailLive.hidden=true;detailEmpty.hidden=false;});
 document.getElementById("month-next").addEventListener("click",()=>{shown=new Date(shown.getFullYear(),shown.getMonth()+1,1);selected=null;render();detailLive.hidden=true;detailEmpty.hidden=false;});
 render();
 const initial="2026-11-14"; selected=initial;render();show(workshops[initial],initial);
}
