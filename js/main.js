
document.getElementById('inputForm').addEventListener('submit',performInsert);

function performInsert(e)
{
  var SName = document.getElementById('siteName').value;
  var SUrl = document.getElementById('siteUrl').value;

  if(SName.length == 0){
    alert("Please enter site name");
    return false;
  }

  if(SUrl == 0){
    alert("Please enter URL");
  }

  var regExpssion ="^http\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$";
  var regex = new RegExp(regExpssion);

  if(!SUrl.match(regex)){
    alert("Please enter a valid URL");
    return false;
  }
  
  var BookMark = {
    name : SName,
    url  : SUrl
  }

  if (localStorage.getItem("BookMarks") === null){
    var BookMarks = [];
    BookMarks.push(BookMark);
    localStorage.setItem('BookMarks',JSON.stringify(BookMarks));
  }
  else {
      var BookMarks = JSON.parse(localStorage.getItem('BookMarks'));
      BookMarks.push(BookMark);
      localStorage.setItem('BookMarks',JSON.stringify(BookMarks));
  }
fetchBookmarks();
  e.preventDefault();
}

function fetchBookmarks()
{
  if(localStorage.getItem("BookMarks") != null){
  var BookMarks = JSON.parse(localStorage.getItem("BookMarks"));
  document.getElementById('BMList').innerHTML="";

  for(var i=0;i < BookMarks.length;i++){
    name= BookMarks[i].name;
    url = BookMarks[i].url;

    document.getElementById('BMList').innerHTML += '<div class="">'
                                                + '<h3>' + name
                                                + '<a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a>' + " "
                                                + '<a class="btn btn-danger" onClick="deleteBookMark(\'' + url + '\')" target="_blank">Delete</a>'
                                                + '</h3>'
                                                + '</div>';
  }
}
}
 function deleteBookMark(durl){
   console.log(durl);
   var BookMarks = JSON.parse(localStorage.getItem("BookMarks"));
   for(var i=0;i < BookMarks.length;i++){
     if(BookMarks[i].url == durl)
     BookMarks.splice(i,1)
   }
   localStorage.setItem("BookMarks",JSON.stringify(BookMarks));
   fetchBookmarks();
}
