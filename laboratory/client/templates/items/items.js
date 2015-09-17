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
});
insertTpl.onRendered(function () {
    createNewAlertify( 'categoryAddon');
    $('.btnAdd').attr('disabled', "disabled");
    $('#child').attr('enable', "enable");
    $('.hideValue').hide();
    $('.hideChildItem').hide();
    $('.fee').attr('disabled', "disabled");
});
//Template.laboratory_itemsShow.onRendered(function (e) {
//    showTpl(e);
//});
updateTpl.onRendered(function () {
    createNewAlertify('categoryAddon');

    //$('.btnAdd').attr('disabled', "disabled");
    //$('.hideValue').hide();
    //$('.hideChildItem').hide();
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
/**
 * Insert
 */
insertTpl.events({
    'change #child': function (e) {
        onChaneChild(e);
    },
    'change .feeType': function (e) {
        onchangeFeeType(e);
    },
    'keyup .childName': function () {
        var enable = true;
        $('.childNormalValue').val();
        $('.childPrependValue').val();
        $('.childAppendValue').val();
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
    'click .btnRemove': function () {
        debugger;
        setTimeout(function () {
            var enable = true;
            $('.childItem').each(function () {
                var childItem = $(this).val() == "" ? 0 : parseFloat($(this).val());
                if (childItem == 0) {
                    enable = false;
                    return false;
                }
                enable = true;
            });

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
});
/**
 * Update
 */
updateTpl.events({
    'change #child': function (e) {
        var val = $(e.currentTarget).val();
        Session.set('updateItemYesNo', val);
        onChaneChild(e);
    },
    'keyup .childName': function (e) {
        var enable = true;
        $('.childNormalValue').val();
        $('.childPrependValue').val();
        $('.childAppendValue').val();
        $('.items').each(function () {
            var childName = $(this).find('.childName').val();
            if (childName == "") {
                enable = false;
                return false;
            }
        });
        if (!enable) {
            $('.btnAdd').attr('disabled', true);
            $('#child').attr('disabled', false);
        } else if (enable) {
            $('#child').attr('disabled', true);
            $('.btnAdd').attr('disabled', false);
        }
    },

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
/**
 * Show
 */
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
            $('[name="child"]').attr('disabled', true);
            alertify.error(error.message);
        }
    },
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
function onChaneChild(e) {
    var child = $(e.currentTarget).val();
    if (child == 'yes') {
        $('.hideValue').hide();
        $('.hideChildItem').show();
    } else if (child == '') {
        $('.hideValue').hide();
        $('.hideChildItem').hide();
    } else if (child == 'no') {
        $('.normalValue').val();
        $('.prependValue').val();
        $('.appendValue').val();
        $('.hideValue').show();
        $('.hideChildItem').hide();
    }
}
function onchangeFeeType(e) {
    var FeeType = $(e.currentTarget).val();
    if (FeeType != "") {
        $('.fee').removeAttr('disabled');
    } else {
        $('.fee').attr('disabled', true);
    }
}
function show(childStatus) {
    console.log(childStatus);
    debugger;
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

updateTpl.helpers({
    isNo: function (no) {
        if (Session.get("updateItemYesNo") != null) {
            no = Session.get("updateItemYesNo");
        }
        return no == "no";
    }
});

