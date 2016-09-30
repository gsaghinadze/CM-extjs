Ext.define('ExtJsTest.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'ExtJsTest.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    title: 'ავტორიზაცია',
    closable: false,
    autoShow: true,
    modal: true,
    closable: false,
    draggable: false,
    resizable: false,
    maximizable: false,
    autoShow: true,

    //layout: 'fit',
    items: {
        xtype: 'form',
        reference: 'loginForm',
        jsonSubmit: false,
        url: 'api/UserController/checkAuth',
        items: [{
            xtype: 'textfield',
            name: 'userName',
            fieldLabel: 'სახელი',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                       var win = Ext.ComponentQuery.query('login')[0];
                       var button = win.lookupReference('loginButton');
                       button.fireEvent('click', button);
                    }
                }
            }
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'პაროლი',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                       var win = Ext.ComponentQuery.query('login')[0];
                       var button = win.lookupReference('loginButton');
                       button.fireEvent('click', button);
                    }
                }
            }
        }],
        buttons: [{
            text: 'შესვლა',
            formBind: true,
            reference: 'loginButton',
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});