
$(function() {


    $("#sub").click(function(event) {

        event.preventDefault();
       // alert("I have been cliecked , wow"); //tests

       let uid = $("#uid").val();

       if(uid.length ==0) {

        //relax nothing to do here

       }
       else
       {

          let url = "http://jsonplaceholder.typicode.com/users/"+uid;
           $.ajax(url, {       

           }).done(function(data) {
               console.log(data);

            $("#uinfo").empty();

            let userinterface = `<div> id <span>${data.id} </span></div> <br/><p> name <span>${data.name} </span>  </p><br/>
            <p> Username: <span>${data.username} </span>  </p> <br/>
            <p> Email: <span>${data.email} </span>  </p> <br/>
            <p> Name: <span>${data.address.street} </span>  </p>`;
            $("#uinfo").append(userinterface);

            getPosts(uid);

           }).fail(function(hr) {
               alert("failed");
           })



       }


    });





})

function getComments(cid) {

    let scid = cid.toString();

    $.ajax("http://jsonplaceholder.typicode.com/comments", { 

    "type": "GET",
    "data": {
         "postId": scid
    },

    }).done(function(comments) {

        console.log(comments);
        let comm="<span> <h3>Comments </h3></span> <br/>";


        $.each(comments, function(k, comment) {

            comm =  comm + `
            <div class="comment"> 
            <p> <span>${comment.name} </span>  </p> <br/>
            <p> <span>${comment.body} </span>  </p> <br/> 
          
            </div>`;

        });

        $("#allcomments").empty();

        $("#allcomments").append(comm);



    }).fail(function () {

    })


}

function getPosts(uid) {

    $.ajax("http://jsonplaceholder.typicode.com/posts", { 
        "type": "GET",
        "data": {
        "userId":uid,
        },


    }).done(function(posts) {

        let mpost="<span> <h3>Posts </h3></span> <br/>";


        $.each(posts, function(k, post) {

        mpost =  mpost + `
            <div class="post"> post id <span>${post.id} </span> <br/>
            <p> <span>${post.title} </span>  </p> <br/>
            <p> <span>${post.body} </span>  </p> <br/> 
            <button onClick="getComments(${post.id})" > Comments </button>
            </div>`;

        });

        $("#allposts").empty();

        $("#allposts").append(mpost);
        $("#allcomments").empty();

        

    }).fail(function(hr) {

    })
}