

function loginSubmit(){

        var username = $("#username").val();

        var password = $("#password").val();

         $.ajax({

              type: "POST",

              url: api_url+"/Auth/validateLogin",

              dataType:"JSON",

              data: {"username":username,"password":password},

              cache: false,

              success: function(data, textStatus, xhr) {

                    var status = data.STATUS;

                    var data = data.RESPONSE;

                    if(status == "OK"){
console.log(data);
                      setLocal("auth",data.token);
                      setLocal("u",data.user_type);
                      setLocal("un",data.user_name);
                      

                      getLocal("auth");

                      islogged();

                    }else{

                      alert("Invalid Username/Password");

                    }

                }

            });

        return false;

}

