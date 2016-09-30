Ext.define('ExtJsTest.Application', {
    extend: 'Ext.app.Application',

    name: 'ExtJsTest',

    stores: [
        
    ],

    views: [
        'ExtJsTest.view.login.Login',
        'ExtJsTest.view.main.Main'
    ],
    launch: function () {
        var app = this;
        app.user = null;
        
        
        Ext.Ajax.request({
            url: 'api/MainController/getInitObjects',
            method: 'POST',
            success: function(response){
                var json = Ext.util.JSON.decode(response.responseText);
                app.cars = json.data.cars;
                app.drivers = json.data.drivers;
                
                app.DriverStoreGl = Ext.create('ExtJsTest.store.driver.DriverStore' , {storeId: 'DriverStoreId'});
                app.DriverStoreGl.loadData(app.drivers);
                
                app.CarStoreGl = Ext.create('ExtJsTest.store.car.CarStore' , {storeId: 'CarStoreId'});
                app.CarStoreGl.loadData(app.cars);
                
                
                
                if (localStorage.getItem('TVradioUser') != null && localStorage.getItem('TVradioPassword') != null){
                    Ext.Ajax.request({
                        url: 'api/UserController/checkAuth',
                        method: 'POST',
                        params:
                        {
                            userName: localStorage.getItem('TVradioUser'),
                            password: localStorage.getItem('TVradioPassword')
                        },
                        success: function(response){
                            var json = Ext.util.JSON.decode(response.responseText);
                            
                            if (json.success === true){
                                app.user = Ext.create('ExtJsTest.model.user.User', json.data);
                                Ext.create({
                                    xtype: 'app-main'
                                });
                            } else {
                                localStorage.removeItem("TVradioUser");
                                localStorage.removeItem("TVradioPassword");
                                Ext.create({
                                    xtype: 'login'
                                });
                            }
                        }
                    });
                } else {
                     Ext.create({
                        xtype: 'login'
                    });
                }


            }
        });


        

    },



    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});