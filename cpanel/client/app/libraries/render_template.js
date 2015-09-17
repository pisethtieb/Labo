renderTemplate = function (template, data) {
    var node = document.createElement("div");
    document.body.appendChild(node);
    Blaze.renderWithData(template, data, node);
    return node;
};