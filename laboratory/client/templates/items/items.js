var indexTpl = Template.laboratory_items,
    insertTpl = Template.laboratory_itemsInsert,
    updateTpl = Template.laboratory_itemsUpdate,
    showTpl = Template.laboratory_itemsShow,
    addressAddonTpl = Template.laboratory_addressInsert;
/***
 * Index
 */
indexTpl.onRendered(function () {
    createNewAlertify('item');
    createNewAlertify('categoryAddon');
    createNewAlertify('insertMoreMeasure');
});
insertTpl.onRendered(function () {
    createNewAlertify('categoryAddon');
    $('.btnAdd').attr('disabled', "disabled");
    $('.hideValue').hide();
    $('#child').attr('enabled', 'enabled');
    $('.hideChildItem').hide();
    $('.fee').attr('disabled', "disabled");
});
updateTpl.onRendered(function () {
    createNewAlertify('categoryAddon');
    debugger;
    var child = $('#child').val();
    if (child == 'yes') {
        $('#child').attr('disabled', true);
    } else {
        $('#child').attr('disabled', false);
    }
});
indexTpl.events({
    'click .insert': function () {
        alertify.item(renderTemplate(insertTpl))
            .set({
                title: fa("plus", "Item")
            })
            .maximize();
    },

    'click .insertMoreMeasure': function () {
        alertify.item(renderTemplate(Template.laboratory_measureInsert))
            .set({
                title: fa("", "Item")
            });
    },
    'click .update': function (e) {
        var data = Laboratory.Collection.Items.findOne({_id: this._id});
        alertify.item(renderTemplate(updateTpl, data))
            .set({
                title: fa("pencil", "Item")
            })
            .maximize();
    },
    'click .remove': function () {
        var id = this._id;
        item = Laboratory.Collection.Labo.find({laboItem: {$elemMatch: {itemId: id}}});
        console.log(item);
        if (item) {
            alertify.error('Item [' + id + '] is used in Labo');
            return false;

        }
        alertify.confirm(
            fa("remove", "Item"),
            "Are you sure to delete [" + id + "]?",
            function () {
                Laboratory.Collection.Items.remove(id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .show': function () {
        var data = Laboratory.Collection.Items.findOne({_id: this._id});
        var childStatus = this.child;
        alertify.alert(renderTemplate(showTpl, data))
            .set({
                title: fa("fa fa-th", "Item")
            });
        show(childStatus);
    }
});
insertTpl.helpers({});
/**
 * Insert
 */
insertTpl.events({
    //on change Child
    'change #child': function (e) {
        var val = $(e.currentTarget).val();
        Session.set('updateItemYesNo', val);
        onChangeChild(e);
    },
    //on change feeType to Disable or enable Fee
    'change .feeType': function (e) {
        var feeType = $(e.currentTarget).val();
        if (feeType == '') {
            $('.fee').attr('disabled', true);
        } else {
            $('.fee').attr('disabled', false);
        }

    },
    // Keyup childName
    'keyup .childName': function (e) {
        var enable = true;
        $('.items').each(function () {
            var childName = $(this).find('.childName').val();
            if (childName == "") {
                enable = false;
                return false;
            }
        });
        if (!enable) {
            $('.btnAdd').attr('disabled', true);
            $('#child').attr('disabled', true);
        } else if (enable) {
            $('#child').attr('disabled', true);
            $('.btnAdd').attr('disabled', false);
        }
    },
    // Keyup childName
    'click .childName,.childNormalValue,.childPrependValue,childAppendValue': function (e) {
        var enable = true;
        $('.items').each(function () {
            var childName = $(this).find('.childName').val();
            if (childName == "") {
                enable = false;
                return false;
            }
        });
        if (!enable) {
            $('.btnAdd').attr('disabled', true);
            $('#child').attr('disabled', true);
        } else if (enable) {
            $('#child').attr('disabled', true);
            $('.btnAdd').attr('disabled', false);
        }
    },
    //remove button Remove on Child
    'click .btnRemove': function () {
        debugger;
        var enable = true;
        $('.childItem').each(function () {
            var childItem = $(this).val() == "" ? 0 : parseFloat($(this).val());
            if (childItem == 0) {
                enable = false;
                return false;
            }
            enable = true;
        });
        setTimeout(function () {
            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
            var enables = true;
            $('.items').each(function () {
                var childName = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (childName == "") {
                    enables = false;
                    return false;
                }
                enables = true;
            });
            if (enables) {
                $('#child').attr('disabled', false)
            } else {
                $('#child').attr('disabled', true)
            }
        }, 100);
    },
    //set button Add Disabled = true
    'click .btnAdd': function () {
        $('.btnAdd').attr('disabled', true);
        var enable = true;
        $('.items').each(function () {
            var childName = $(this).find('.childName').val();
            if (childName == "") {
                enable = false;
                return false;
            }
        });
        if (!enable) {
            $('.btnAdd').attr('disabled', true);
            $('#child').attr('disabled', true);
        } else if (enable) {
            $('#child').attr('disabled', true);
            $('.btnAdd').attr('disabled', false);
        }
    },
    //addOn Category
    'click .categoryAddon': function () {
        alertify.categoryAddon(renderTemplate(Template.laboratory_categoryInsert))
            .set({
                title: fa("plus", "Category")
            })
    }

});
/**
 * Update
 */
updateTpl.events({
    //On change child
    'change #child': function (e) {
        var val = $(e.currentTarget).val();
        Session.set('updateItemYesNo', val);
        //function onchangeChild
        onChangeChild(e);
    },
    //On change FeeType to disable or enable
    'change .feeType': function (e) {
        var feeType = $(e.currentTarget).val();
        if (feeType == '') {
            $('.fee').attr('disabled', true);
        } else {
            $('.fee').attr('disabled', false);
        }
    },
    //keup on childname of child
    'keyup .childName': function (e) {
        var enable = true;

        $('.items').each(function () {
            var childName = $(this).find('.childName').val();
            if (childName == "") {
                enable = false;
                return false;
            }
        });
        if (!enable) {
            $('.btnAdd').attr('disabled', true);
            $('#child').attr('disabled', true);
        } else if (enable) {
            $('#child').attr('disabled', true);
            $('.btnAdd').attr('disabled', false);
        }
    },
    //click
    'click .childName,.childNormalValue,.childPrependValue,childAppendValue': function (e) {
        var enable = true;
        $('.items').each(function () {
            var childName = $(this).find('.childName').val();
            if (childName == "") {
                enable = false;
                return false;
            }
        });
        if (!enable) {
            $('.btnAdd').attr('disabled', true);
            $('#child').attr('disabled', true);
        } else if (enable) {
            $('#child').attr('disabled', true);
            $('.btnAdd').attr('disabled', false);
        }
    },

    //remove Btb
    'click .btnRemove': function () {
        debugger;
        var enable = true;
        $('.childItem').each(function () {
            var childItem = $(this).val() == "" ? 0 : parseFloat($(this).val());
            if (childItem == 0) {
                enable = false;
                return false;
            }
            enable = true;
        });
        setTimeout(function () {
            if (enable) {
                $('.btnAdd').attr('disabled', false);
            } else {
                $('.btnAdd').attr('disabled', true);
            }
            var enables = true;
            $('.items').each(function () {
                var childName = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (childName == "") {
                    enables = false;
                    return false;
                }
                enables = true;
            });
            if (enables) {
                $('#child').attr('disabled', false)
            } else {
                $('#child').attr('disabled', true)
            }
        }, 100);
    },
    'click .btnAdd': function () {
        $('.btnAdd').attr('disabled', true);
    },
    'click .categoryAddon': function () {
        alertify.categoryAddon(renderTemplate(Template.laboratory_categoryInsert))
            .set({
                title: fa("plus", "Category")
            })
    }
})
;
//check isNo
updateTpl.helpers({
    isNo: function (no) {
        if (Session.get("updateItemYesNo") != null) {
            no = Session.get("updateItemYesNo");
        }
        return no == "no";
    }
});
//check isNo
insertTpl.helpers({
    isNo: function (no) {
        if (Session.get("updateItemYesNo") != null) {
            no = Session.get("updateItemYesNo");
        }
        return no == "no";
    }
});
/**
 * Show
 */
//show  table on item
showTpl.helpers({
    childItems: function () {
        var str = "<table class='table table-bordered'><thead>" +
            "<tr><th>Name</th>" +
            "<th>NormalValue</th>" +
            "</tr>" +
            "</thead><tbody>";
        this.childItem.forEach(function (o) {
            o.prependValue = o.prependValue == null ? "" : o.prependValue;
            o.appendValue = o.appendValue == null ? "" : o.appendValue;
            str += '<tr><td>' + o.name + "</td><td>" +
                o.prependValue + o.normalValue + o.appendValue + " </td></tr>"
        });
        str += "</tbody></table>";
        return new Spacebars.SafeString(str);
    },
    categoryName: function () {
        this.category.findOne(this.name);

    }
});
/**
 * Hook
 */
AutoForm.hooks({
    //Befor insert
    laboratory_itemsInsert: {
        before: {
            insert: function (doc) {
                debugger;
                var child = $('#child').val();
                $('[name="child"]').attr('disabled', false);
                doc.child = child;
                var enable = true;
                $('.items').each(function () {
                    var childName = $(this).find('.childName').val();
                    if (childName == "") {
                        enable = false;
                        return false;
                    }
                });
                if (child == 'yes' && !enable) {
                    alertify.error('Please Insert ChildName !');
                    return false;
                }
                var prefix = Session.get('currentBranch') + '-';
                Meteor.call('labo', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success("Success");
            $('[name="child"]').attr('disabled', false);
        },
        onError: function (fromType, error) {
            $('[name="child"]').attr('disabled', false);
            alertify.error(error.message);
        }
    },
    //before update
    laboratory_itemsUpdate: {
        before: {
            update: function (doc) {
                debugger;
                var child = $('#child').val();
                $('[name="child"]').attr('disabled', false);
                doc.$set.child = child;
                var enable = true;
                $('.items').each(function () {
                    var childName = $(this).find('.childName').val();
                    if (childName == "") {
                        enable = false;
                        return false;
                    }
                });
                if (child == 'yes' && !enable) {
                    alertify.error('Please Insert ChildName !');
                    return false;
                } else if (child == 'no') {
                    doc.$set.childItem = null;

                } else {
                    doc.$set.normalValue = null;
                    doc.$set.prependValue = null;
                    doc.$set.appendValue = null;
                }
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.item().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            $('[name="child"]').attr('disabled', true);
            alertify.error(error.message);
        }
    }
});

//function On change to use on event
function onChangeChild(e) {
    var child = $(e.currentTarget).val();
    if (child == '  .,m') {
        $('.hideValue').hide();
        $('.hideChildItem').hide();
    }
    if (child == 'yes') {
        $('.hideValue').hide();
        $('.hideChildItem').show();
    }
    if (child == 'no') {
        $('.normalValue').val();
        $('.prependValue').val();
        $('.appendValue').val();
        $('.hideValue').show();
        $('.hideChildItem').hide();
    }

}
//function status fore child Yes / No
function show(childStatus) {
    if (childStatus != 'yes') {
        $('.childItemsShow').hide();
        $('.normalValueShow').show();
        $('.prependValueShow').show();
        $('.appendValueShow').show();

    } else {
        $('.normalValueShow').hide();
        $('.prependValueShow').hide();
        $('.appendValueShow').hide();
        $('.childItemsShow').show();
    }

}
