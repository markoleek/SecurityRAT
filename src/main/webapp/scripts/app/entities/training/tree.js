
// Selected node
$("#tree").bind(
    "select_node.jstree", function(evt, data){
        //selected node object: data.inst.get_json()[0];
        //selected node text: data.inst.get_json()[0].data

        var selectedNode = data.node;
        var selectedNodeType = selectedNode.type;
        var selectedNodeName = selectedNode.text;

        if(selectedNodeType !== "default" && selectedNodeType !== "requirement") {
            $("#headingBlock").hide();
            $("#editBlock").fadeIn();
            $("#previewBlock").fadeIn();

            var content;
            $('#slideNameField').val(selectedNodeName);
            if(selectedNodeName === "Welcome")
                content = "### Application Security Basics\n\nWelcome to this training.";
            else if(selectedNodeName === "Who am I")
                content = "### John Doe\n\nSecurity Analyst";
            else if(selectedNodeName === "Portfolio")
                content = "## John Doe\n-----\n- Security Trainer\n- Expert in Security\n- Elite programmer";
            else if(selectedNodeName === "Comic")
                content = "{{ image: static/comics/aboutSecurity.gif }}";
            else if(selectedNodeName === "Title")
                content = "#{{ parent.name }}";
            $('#slideNameField').val(selectedNodeName);
            $('#slideContentField').val(content);

            if(selectedNodeType !== "custom") {
                $('#customSlideWarning').fadeIn();
            } else {
                $('#customSlideWarning').hide();
            }
        } else {
            $("#editBlock").hide();
            $("#previewBlock").hide();
        }
    }
);

// Custom Menu
function customMenu(node) {
    // The default set of all items
    var items = {
        // Some key
        create_branch : {
            // The item label
            "label"				: "Create Branch",
            // The function to execute upon a click
            "action"			: function (node) {},
            // All below are optional
            "_disabled"			: false,		// clicking the item won't do a thing
            "_class"			: "class",	// class is applied to the item LI node
            "separator_before"	: false,	// Insert a separator before the item
            "separator_after"	: false,		// Insert a separator after the item
            // false or string - if does not contain `/` - used as classname
            "icon"				:  "glyphicon glyphicon-folder-open",
            "submenu"			: {
                /* Collection of objects (the same structure) */
            }
        },
        add_content : {
            "label": "Add Option Column",
            "icon": "glyphicon glyphicon-plus-sign",
            "submenu": {
                info: {"label": "More Information", icon: "glyphicon glyphicon-asterisk"},
                motivation: {"label": "Motivation", icon: "glyphicon glyphicon-asterisk"},
                test: {"label": "Test Case", icon: "glyphicon glyphicon-asterisk"}
            }
        },
        insert_slide : {
            // The item label
            "label"				: "Insert Custom Slide",
            // The function to execute upon a click
            "action"			: function (node) {
                console.log($('#tree'));
                console.log($('#tree').jstree());
            },
            // All below are optional
            "_disabled"			: false,		// clicking the item won't do a thing
            "_class"			: "class",	// class is applied to the item LI node
            "separator_before"	: false,	// Insert a separator before the item
            "separator_after"	: true,		// Insert a separator after the item
            // false or string - if does not contain `/` - used as classname
            "icon"				:  "glyphicon glyphicon-flash",
            "submenu"			: {
                intro: {"label": "Empty Slide", "separator_after"	: true, icon: "glyphicon glyphicon-flash"},
                template: {
                    "label": "Template",
                    "icon":  "glyphicon glyphicon-list-alt",
                    "submenu": {
                        tpl_table: {"label": "Table", icon: "glyphicon glyphicon-flash"},
                        tpl_image: {"label": "Image", icon: "glyphicon glyphicon-flash"},
                        tpl_text: {"label": "Text", icon: "glyphicon glyphicon-flash"},
                        tpl_demoIframe: {"label": "Demo with iframe", icon: "glyphicon glyphicon-flash"}
                    }
                }
            }
        },
        /*
         editItem: {
         "label": "Edit",
         "action": function (node) {},
         "icon": "glyphicon glyphicon-edit"
         },
         */
        cloneItem: {
            "label": "Clone",
            "action": function (node) {},
            "icon": "glyphicon glyphicon-duplicate"
        },
        renameItem: { // The "rename" menu item
            "label": "Rename",
            "action": function (node) {},
            "icon": "glyphicon glyphicon-wrench"
        },
        deleteItem: { // The "delete" menu item
            "label": "Delete",
            "action": function (node) {},
            "icon": "glyphicon glyphicon-remove-circle"
        }
        /* MORE ENTRIES ... */
    };
    if (node.type !== "requirement") {
        delete items.add_content;
    } else {
        delete items.renameItem;
    }
    // node.li_attr.class === "slide"
    if ((node.type === "slide") || (node.type === "custom")) {
        delete items.create_branch;
        delete items.insert_slide;
        delete items.renameItem;
        // items.deleteItem._disabled = true
    } else {
        //delete items.editItem;
        delete items.cloneItem;
    }
    console.log(node.type);
    return items;
}
