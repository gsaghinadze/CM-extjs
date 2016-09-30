Ext.define('ExtJsTest.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function() {

        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        var app = ExtJsTest.getApplication();
        var me = this;
        var form = me.lookupReference('loginForm').getForm();
        var win = me.getView();
        var us = form.findField('userName').getValue();
        var pa = form.findField('password').getValue();

        Ext.Ajax.request({
                url: 'api/UserController/checkAuth',
                method: 'POST',
                params:
                {
                    userName: us,
                    password: pa
                },
                success: function(response) {
                    var json = Ext.util.JSON.decode(response.responseText);
                    
                    if (json.success === true){
                        app.user = Ext.create('ExtJsTest.model.user.User', json.data);
                        localStorage.setItem("TVradioUser" , app.user.get('userName') );
                        localStorage.setItem("TVradioPassword" , app.user.get('password') ) ;
                        win.destroy();
                        Ext.create({
                            xtype: 'app-main'
                        });
                    } else {
                        console.log('ver gaaketa auth');
                        console.log(json.msg);
                        AppUtil.info(json.msg);
                    }
                }
            });

       
      
        /*
        localStorage.setItem("TutorialLoggedIn", true);

        // Remove Login Window
        this.getView().destroy();

        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });
        */

    }
});