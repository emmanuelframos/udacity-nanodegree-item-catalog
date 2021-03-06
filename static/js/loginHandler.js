/* Google OAuth 2 Start */
var start = function(){
    googleOAuth2Start();
};

/* Google OAuth 2 SignIn */
googleSignIn = function(){
    var promise = gapi.auth2.getAuthInstance().signIn({ scope: 'email' });
    promise.then(function(response){
       window.localStorage.auth_token = response.getAuthResponse().access_token;
       window.localStorage.auth_user = response.w3.U3;

       $.ajax({
          url: 'http://localhost:5000/user/create',
          type: 'post',
          headers: {
            "auth_token": response.getAuthResponse().access_token,
            "auth_user": response.w3.U3
          },
          success: function (data) {
            window.location.href = '/#/gameList';
          },
          error: function (error){
            window.location.href = '/#/signIn';
          }
      });
    }, function(error){
       window.location.href = '/#/signIn';
    });
}

/* Google SignOut */
var googleSignOut = function(){
    gapi.auth2.getAuthInstance().signOut();

    window.localStorage.clear();

    console.log("Google - Signed out.");

    window.location.href = '/#/signIn';        
}