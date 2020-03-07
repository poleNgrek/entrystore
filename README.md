# entrystore
A project showcasing how to do a Solr query to obtain entries of type “Piece of Art” in the context “1” and present them in a card base layout.


## A quick explanation over the code

The project is done using the [EntryStore](https://entrystore.org/#!JavaScript.md "EntryStore Javascript") client library as a backend, [Bootstrap4](https://getbootstrap.com/ "Bootstrap homepage") for the CSS, HTML and Javascript. 

There is only one script file that handles the both the data fetching and the representation logic.

The code inside js/script.js does the following:

1. Creates an EntryStore variable which establishes a connection with the EntryStore.

2. Uses the EntryStore instance to create a SolrQuery instance which executes the query.

3. Obtains a list of the results.  

4. From the list of results, it gets each entry,passes it through the projection and sends the "clean" data to the buildProjectionCard() function which generates the card layout.
