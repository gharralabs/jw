
  window.fbAsyncInit = function() {
      FB.init({
          appId      : '1479920475649433',
          xfbml      : true,
          version    : 'v2.5'
      });

      
      FB.getLoginStatus(function (response) {
          // logado no FB e na aplicação
          if (response.status === 'connected') {
              alert('conectado');
          }
              // logado no FB mas não na aplicação
          else if (response.status === 'not_authorized') {
              alert('não auto');
              FB.login(function (response) {
                  console.log(response);
              }, { scope: 'public_profile,email,friend_list' });

          }
              // Não está logado no facebook
          else {
              alert('não está conectado');
          }
      });




  };

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));