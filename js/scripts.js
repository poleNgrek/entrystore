const es = new EntryStore.EntryStore(config.repository);

const projection = {
    title: "http://purl.org/dc/terms/title",
    description: "http://purl.org/dc/terms/description",
    imgSrc: "http://xmlns.com/foaf/0.1/img",
    artist: "http://example.com/artist"
    };

const buildProjectionCard = function(projectionItem){
    // Create elements needed to build a card  
    const divCol = document.createElement('div')
    const divBoxShadow = document.createElement('div')

    const img = document.createElement('img')

    const divCardBody = document.createElement('div')
    const h5Title = document.createElement('h5')
    const h5Artist = document.createElement('h5')
    const pCardText = document.createElement('div')
    
    
    // Append newly created elements into the DOM
    const row = document.querySelector('.card-deck')
    row.append(divCol)
    divCol.append(divBoxShadow)
    divBoxShadow.append(img)
    divBoxShadow.append(divCardBody)
    divCardBody.append(h5Title)
    divCardBody.append(h5Artist)
    divCardBody.append(pCardText)

    
    // Set content and attributes
    h5Title.innerHTML = projectionItem.title
    h5Artist.innerHTML = projectionItem.artist
    pCardText.innerHTML = projectionItem.description
    img.setAttribute('src', projectionItem.imgSrc)
    img.setAttribute('class', 'card-img-top')
    divCol.setAttribute('class', 'col-md-4')
    divBoxShadow.setAttribute('class', 'card mb-4 box-shadow')
    divCardBody.setAttribute('class', 'card-body')
    h5Title.setAttribute('class', 'card-title')
    h5Artist.setAttribute('class', 'card-title')
    //h5Artist.setAttribute('id', index)
    pCardText.setAttribute('class', 'card-text')

    
}


const sq = es.newSolrQuery()
.context(config.contextId)
.rdfType("http://example.com/PieceOfArt")

const sl = sq.list()
sl.getEntries().then((entryArr) =>{
    for(const entry of entryArr){
        const proj = entry.projection(projection)
        buildProjectionCard(proj)
    }
   // console.log(entryArr)
})
//.forEach((child, index) => {
 //   const proj = child.projection(projection);
 //   buildProjectionCard(proj,index);
 //   })
//.then()

const artistHeaders = document.querySelectorAll(".card-title-artist");
console.log(artistHeaders)

//const demoTag = document.getElementById('1');
//console.log(demoTag)
//const first = demoTag[0].innerText
//console.log(sl) 



//for(const header of artistHeaders){
  //  console.log('artistHeader: ', artistHeader);
    //es.getEntry(artistHeader).then((entry) => {
      //  h5Artist.innerHTML = EntryStore.html.print(entry);
    //}
//};
