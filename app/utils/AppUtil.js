Ext.define('ExtJsTest.utils.AppUtil', {

    alternateClassName: 'AppUtil',

    statics: {

        confirm: function(confirmMsg, confirmFunc) {
            Ext.Msg.show({
                closable: false,
                title: 'ოპერაციის დადასტურება',
                message: confirmMsg,
                buttonText: { yes: "დიახ", no: "არა"},
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                modal: true,
                fn: confirmFunc
            });
        },

        alert: function(alertMsg, callback) {
            Ext.Msg.show({
                closable: false,
                title: 'შეცდომა',
                message: alertMsg,
                buttonText: { ok: "გასაგებია..." },
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR,
                modal: true,
                fn: callback
            });
        },

        info: function(alertMsg) {
            Ext.Msg.show({
                closable: false,
                title: 'ინფორმაცია',
                message: alertMsg,
                buttonText: { ok: "გასაგებია..." },
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO,
                modal: true
            });
        },

        makeFormReadOnly: function(form) {
            var setReadOnly = function(field) {
                var xtype = field.getXType();

                if (xtype === 'label') {
                    return true;
                }

                if (xtype === 'fieldset' || xtype === 'fieldcontainer' || xtype === 'container') {
                    field.items.each(setReadOnly);
                } else if (xtype === 'button') {
                    field.setDisabled(true);
                } else {
                    field.setReadOnly(true);
                }
                
                return true;
            };

            form.items.each(setReadOnly);
        },

        hidePagingButtons: function(pagingToolbar) {
            pagingToolbar.items.each(function(item, index) {
                if (item.itemId !== 'refresh') {
                    item.hide();
                }
            });
        }
    }
});