// Create an entry point for the backend entrystore
const es = new EntryStore.EntryStore(config.repository);

// Create the projection for the entries
const projection = {
    title: "http://purl.org/dc/terms/title",
    description: "http://purl.org/dc/terms/description",
    imgSrc: "http://xmlns.com/foaf/0.1/img",
    artist: "http://example.com/artist"
    };

// Create a query of type PieceOfArt
const sq = es.newSolrQuery()
.context(config.contextId)
.rdfType("http://example.com/PieceOfArt")

// Load the results in a list
const sl = sq.list()

// For every entry in the entry array call the function
// buildProjectionCard to generate DOM elements
sl.getEntries().then((entryArr) =>{
    for(const entry of entryArr){
        const proj = entry.projection(projection)
        buildProjectionCard(proj)
    }
}, (err) => {
      alert(`Failure to load entry: ${err}`);
});


// A function that generates DOM elements for each entry
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
    pCardText.setAttribute('class', 'card-text')   

    // Create an entry point for the entrystore
    const es = new EntryStore.EntryStore(config.repository);

    // Get the URI from the artist and use a 'hack' to get the repository number
    // since cross-domain restrictions don't allow us to use directly the URI
    const artistURI = projectionItem.artist
    const repo = artistURI.split("/").pop();

    // Get the new URI
    const entryURI = es.getEntryURI("1", repo);


    es.getEntry(entryURI).then((entry) => {
        
        // Get the name and the lastname of each entry
        const artistFamName = entry.getMetadata().findFirstValue(entry.getResourceURI(), 'http://xmlns.com/foaf/0.1/familyName')
        const artistGivenName = entry.getMetadata().findFirstValue(entry.getResourceURI(), 'http://xmlns.com/foaf/0.1/givenName')
        
        // If there is no lastname we simply show the name
        if (typeof artistFamName !== 'undefined'){
            const artistName = artistGivenName.concat(' ', artistFamName)
            h5Artist.innerHTML = artistName 
        } else {
            h5Artist.innerHTML = artistGivenName
        }        
    }, (err) => {
      alert(`Failure to load entry: ${err}`);
    });
}




