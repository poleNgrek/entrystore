document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

function theDomHasLoaded(e) {
    const artistHeaders = document.querySelectorAll(".card-title-artist");
	console.log(artistHeaders)
}


//for(const header of artistHeaders){
  //  console.log('artistHeader: ', artistHeader);
    //es.getEntry(artistHeader).then((entry) => {
      //  h5Artist.innerHTML = EntryStore.html.print(entry);
    //}
//};