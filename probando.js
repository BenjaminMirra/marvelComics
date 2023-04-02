let link = "http://gateway.marvel.com/v1/public/characters/1009156"


function recorrerHasta(frase, caracter) {
    let resultado = "";
    frase = frase.split("").reverse().join("");
    for (let i = 0; i < frase.length; i++) {
      if (frase[i] === caracter) {
        break;
      }
      resultado += frase[i];
    }
    resultado = resultado.split("").reverse().join("");
    return resultado;
  }

  function encontrarID(url) {
    return url.split('/').pop()
  }

  console.log(encontrarID(link));