let selected_color = "#666666";
let white = "#ffffff";

const config = {
elements: [{
        data: {
            id: "a",
            content: "a",
            name: "a"
        }
    },
    {
        data: {
            id: "b",
            content: "b",
            name: "b"
        }
    },
    {
        data: {
            id: "Autoregressive",
            content: "Autoregressive",
            weight: 75,
            name: "Autoregressive",
            parent: "a"
        }
    },
    {
        data: {
            id: "BatchReshape",
            content: "BatchReshape",
            name: "BatchReshape",
            parent: ["a", "b"]
        }
    },
    {
        data: {
            id: "ab",
            source: "Autoregressive",
            target: "BatchReshape"
        }
    }
],
style: [
    // the stylesheet for the graph
    {
        selector: '$node > node',
        css: {
          'padding-top': '10px',
          'padding-left': '10px',
          'padding-bottom': '10px',
          'padding-right': '10px',
          'text-valign': 'top',
          'text-halign': 'center',
          'background-color': '#ffffff',
          'border-width': 4, 
          'border-color': 'black',
          'opacity': 0.5
        }
      },
    {
        selector: "node",
        css: {
            "text-valign": "center",
            color: "white",
            width: 200,
            height: 40,
            shape: "roundrectangle",
            label: `data(name)`
        }
    },
    {
        selector: "edge",
        css: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle"
        }
    },
    {
        selector: ".eh-handle",
        style: {
            "background-color": selected_color,
            width: 12,
            height: 12,
            shape: "ellipse",
            "overlay-opacity": 0,
            "border-width": 12, // makes the handle easier to hit
            "border-opacity": 0
        }
    },
    {
        selector: ".eh-hover",
        style: {
            "background-color": selected_color
        }
    },
    {
        selector: ".eh-source",
        style: {
            "border-width": 2,
            "border-color": selected_color
        }
    },
    {
        selector: ".eh-target",
        style: {
            "border-width": 2,
            "border-color": selected_color
        }
    },
    {
        selector: ".eh-preview, .eh-ghost-edge",
        style: {
            "background-color": selected_color,
            "line-color": selected_color,
            "target-arrow-color": selected_color,
            "source-arrow-color": selected_color
        }
    },
    {
        selector: ".eh-ghost-edge .eh-preview-active",
        style: {
            opacity: 0
        }
    }
],
  layout: {
    name: "grid",
    rows: 1
}
};

export default config;
