/* ---------- BEVITEL ---------- */

// Futo.Be első sora, kimented mennyi futó van
let futokMennyisege = 5;

// bemented egy több dimenziós tömbbe a Futo.Be első sora utánniakat
let futok = [
  // [ távolság, sebesség, hányadik futó]
  [100, 5, 1],
  [96, 6, 2],
  [88, 4, 3],
  [81, 2, 4],
  [10, 1, 5]
]

/* ----------  ELLENŐRZÉSEK ( KEZDÉSHEZ ) ---------- */

/*
if (futok.length != futokMennyisege) return;

// FutoBE szabályoknak megfelel
for (let i = 0; i < futok.length; i++) {

  // max 1 millios távolság
  if (futok[i][0] >= 1000000) return;

  // csökkenő távolság ahogy indulnak
  if (futok[i + 1] != undefined) {
    if (futok[i][0] <= futok[i + 1][0]) return;
  }

  // távolság több mint 0
  if (futok[i][0] <= 0) return;

  // sebesség több mint nulla
  if (futok[i][1] <= 0) return;
}
*/

/* ---------- FUTÁS ---------- */

// Időpont és Futo.Ki
let idopont = 0;
let futoKi = '';

// Aktuális futás megjelenítése
aktualisFutas(idopont, futok);

// Körönkénti levétele
while (mindekiBeer(futok)) {
  for (const i in futok) {
    if (futok[i][0] > 0) {
      futok[i][0] -= futok[i][1];
    }
  }
  // Aktuális futás megjelenítése
  idopont++;
  aktualisFutas(idopont, futok);

  // Ellenörizzük hogy van e közelebb jutó ha van hozzáadjuk a FutoKi-hez
  futoKi = kozelCheck(idopont, futok, futoKi);

  // Csökkenő sorrendbe állítás
  futok.sort(function (a, b) {
    return b[0] - a[0];
  });

  // Aktuális Futo.Ki megjelenítése
  console.log(`Futo.Ki: ${futoKi}`);
}

/* ---------- FUNCTIONS ---------- */

// Futások távolságának megjelenítése
function aktualisFutas(idopont, futok) {
  console.log('---------- KÖVETKEZŐ IDŐPONT ----------');
  console.log(`Időpont: ${idopont}`);
  for (const i in futok) {
    console.log(`[ ${futok[i][2]}. számú futó ] Távolsága: ${futok[i][0]}`);
  }
}

// ha addig megy mig mindenki be nem ért
function mindekiBeer(futok) {
  let mindenkiZero = false;
  ellenorzes: for (const i in futok) {
    if (futok[i][0] > 0) {
      mindenkiZero = true;
      break ellenorzes;
    }
  }
  return mindenkiZero;
}

function kozelCheck(idopont, futok, futoKi) {
  // mindenkit mindennel megvizsgálunk
  for (let i = 0; i < futok.length; i++) {
    for (let x = i + 1; x < futok.length; x++) {
      if ((futok[i][0] < futok[x][0]) && ((futok[i][0] > 0) && futok[x][0] > 0) && (futok[i][2] < futok[x][2])) {
	console.log(`Időpont: ${idopont} = ${futok[i][0]} < ${futok[x][0]} emellett ${futok[i][2]} < ${futok[x][2]} `);
        futoKi += `${idopont} `
        console.log('Sorrend csere történt!');
      }
    }
  }
  return futoKi;
}