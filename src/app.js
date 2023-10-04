import folio from "./folio.json";
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

var test = 2
console.log(test);

const formatDate = (date) => {
  const dateObj = parse(date, 'yyyy/MM/dd', new Date());
  return format(dateObj, "EEEE d MMMM yyyy", { locale: fr });
}

const main = document.querySelector('main');

for(const sectionName in folio) {
  const section = document.createElement('section');
  const title = document.createElement('h2');

  title.textContent = sectionName;
  section.appendChild(title);

  if (Array.isArray(folio[sectionName])) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    li.textContent = folio[sectionName].join(', ');
    ul.appendChild(li);
    section.appendChild(ul);

  } else {
    const ul = document.createElement('ul');

    for(const itemName in folio[sectionName]) {
      const li = document.createElement('li');
      const raw = folio[sectionName][itemName];
      
      li.innerHTML = `<b>${itemName} :</b> ${raw.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/) ? formatDate(raw) : raw}`;

      ul.appendChild(li);
    }

    section.appendChild(ul);
  }

  main.appendChild(section);
}