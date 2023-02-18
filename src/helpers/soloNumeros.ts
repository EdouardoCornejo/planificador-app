export const soloNumeros = (numeros: string) => {
  //Solo numeros
  let out = '';
  let filtro = '1234567890'; //Caracteres validos

  //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos
  for (let i = 0; i < numeros.length; i++) {
    if (filtro.indexOf(numeros.charAt(i)) != -1) {
      //Se añaden a la salida los caracteres validos
      out += numeros.charAt(i);
    }
  }

  //Retornar valor filtrado
  return out;
};
