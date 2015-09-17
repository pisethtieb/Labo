modalMaxHeight = function (footer) {
    var footer = typeof footer === 'undefined' ? true : false;
    var height = $(window).height() - (footer === true ? 200 : 120);
    //var height = $(window).height() - 200;

    $(".modal-body").css("max-height", height);
};