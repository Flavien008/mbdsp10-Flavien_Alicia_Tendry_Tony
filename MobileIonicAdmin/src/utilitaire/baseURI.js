const baseURI = (url) => {
  // var host = "https://itucloud.herokuapp.com"+url;
  var host = "http://localhost:8010/api"+url;
  return host;
}
 
export default baseURI;
