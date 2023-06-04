// Los middleware son todas aquellas funciones que se ejecutan entre el request y el response

// Middleware que imprime la url y el tipo de petición http al servidor
const printRequestType = (req,res,next) => {
  console.log(`${req.url} -${req.method}`);   
  next(); 
}

module.exports = printRequestType;