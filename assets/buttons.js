require(['gitbook'], function(gitbook) {

    gitbook.events.bind('start', function(e, config) {
        var opts = config.toolbar;
        
        if (!opts || !opts.buttons) return;
        
        var buttons = opts.buttons.slice(0);
        buttons.reverse();
        
        buttons.forEach(function(button) {
            gitbook.toolbar.createButton({
                icon: button.icon || "fa fa-external-link",
                label: button.label || "Link",
                text: button.text,
                position: button.position || "right",
                onClick: function(e) {
//                     e.preventDefault();
                    var mapping = {
                        "{{title}}": encodeURIComponent(document.title),
                        "{{url}}": encodeURIComponent(location.href),
                        "{{filepath_lang}}": encodeURIComponent((gitbook.state.innerLanguage ? gitbook.state.innerLanguage+'/' : '')+gitbook.state.filepath)
                    };
                    var re = RegExp(Object.keys(mapping).join("|"), "g");
                    var url = button.url.replace(re, function(matched) {
                        return mapping[matched];
                    });
                    var upath = location.pathname
                    if (button.label == 'language_en') {
                        url = location.protocol + "//" + location.host + "/en/" + upath.substring(4) + location.search;
                    } else if (button.label == 'language_zh') {
                        url = location.protocol + "//" + location.host + "/zh/" + upath.substring(4) + location.search;
                    }
                    
                    if (button.target == "_self") {
                        window.location = url;
                    } else {
                        window.open(url, button.target || "_blank");
                    }
                }
            });
        });
    });
});
