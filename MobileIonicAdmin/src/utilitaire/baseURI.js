const baseURI = (url) => {
  // var host = "https://itucloud.herokuapp.com"+url;
  var host = "http://localhost:8087/spat"+url;
  return host;
}
 
export default baseURI;
