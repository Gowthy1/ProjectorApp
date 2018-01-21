console.log("This file has loaded");
$.ajax({
  type:"GET",
  url:"https://api.myjson.com/bins/tls49",
  dataType:"json",
  success:function(response){
     //console.log("Data from Success",response);
    var data = formObject(response);
    constructDOM(data);
   },
  error: function(err){
    console.log("Error in GET method",err);
  }
});

function formObject(response){
    var flags=[],categoryObject=[];
    var length=response.length;
    for(var i=0;i<length;i++){
      var movie=response[i];
      //console.log("movie",movie);
      //console.log("Language",movie.language);
      var index =flags.indexOf(movie.language);
      if(index==-1){
        flags.push(movie.language);
      }
      else{
        categoryObject[index].movies.push(movie);
        continue;
      }
      var objectschema={
        "category": movie.language,
        "movies" : []
      }
      objectschema.movies.push(movie);
      categoryObject.push(objectschema);
      console.log("categoryObject",categoryObject);

    }
    console.log(flags);
    //console.log("formObject response",response);
    return categoryObject;
}

function constructDOM(data) {
  var categoryContent=[];
  for(var i=0;i<data.length;i++){
    var objectschema= data[i];
    console.log("constructDOM data",objectschema);
    var categoryTitle = $('<h3 class="categoryName">'+objectschema.category+'</h3>');
    categoryContent.push(categoryTitle);
    for(var j=0;j<objectschema["movies"].length;j++){
      //console.log("urls:",objectschema["movies"][j]["posterUrl"]);
      var rate = objectschema["movies"][j]["rating"]
    //  ratingStar(rate);
      var categoryDiv = $('<div class="movie fleft"><a href="#"><div class="poster"><img src='
                      +objectschema["movies"][j]["posterUrl"]+' alt=" "></div></a><div class="details"><p class="yearOfRelease">'
                      +objectschema["movies"][j]["releaseYear"]+'</p><h4 class="name">'
                      +objectschema["movies"][j]["name"]+'</h4><div class="stars">'
                      +ratingStar(rate)+'</div></div></div>');
      categoryContent.push(categoryDiv);
      }
  }
  $('section.content').html(categoryContent);

}
function ratingStar(rate){
    var isDecimal=false;
    var rating ='' ;
    if(rate){
      var rates=parseFloat(rate);
      isDecimal = ((rate%1) != 0) ? true : false;
      var round= Math.floor(rates);

      for(var i=1;i<=5;i++){
        if(rates<=0){
            rating+= '<div class="star star-empty"></div>';
        }
        else{
          if(i<round) {
              rating+= '<div class="star star-full"></div>';
          }
 					else if(i==round) {
                if(isDecimal){
                  rating+= '<div class="star star-full"></div><div class="star star-half"></div>';
                }
                else{
                  rating+= '<div class="star star-full"></div>';
                }
            }
 						else if(i>round && !isDecimal){
                rating+= '<div class="star star-empty"></div>';
            }
          }
        }
      }
  return rating;
}
