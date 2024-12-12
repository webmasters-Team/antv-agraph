var json = `{
    "id": "Evolvable Product",
    "children": [{
        "id": "Stakeholder Management",
        "children": [{
            "id": "Product Vision",
            "label": "moooooooooooooooooooo",
            "children": [{
                "id": "Product Lifecycle"
              }, {
                "id": "Problem Understanding"
              }
            ]
          }
        ]
      }, {
        "id": "Evolvable Architecture",
        "children": [{
            "id": "Decomposition / Composition",
            "children": [{
                "id": "Service Boundaries"
              }, {
                "id": "Clean Code"
              }, {
                "id": "Split + Defer Decisions"
              }
            ]
          }, {
            "id": "Clean Architecture"
          }, {
            "id": "Feature Toggles"
          }
        ]
      }, {
        "id": "Continuous Delivery",
        "children": [{
            "id": "System Monitoring",
            "children": [{
                "id": "Metrics"
              }
            ]
          }, {
            "id": "Flow",
            "children": [{
                "id": "Pull System"
              }, {
                "id": "Slicing"
              }, {
                "id": "Minimize WIP"
              }, {
                "id": "Continuous Improvement"
              }, {
                "id": "Zero-Bug-Policy"
              }, {
                "id": "Automation"
              }
            ]
          }, {
            "id": "DevOps"
          }, {
            "id": "Sustainable Pace"
          }, {
            "id": "Early Feedback",
            "children": [{
                "id": "High Cadence",
                "children": [{
                    "id": "Quality Assurance"
                  }
                ]
              }, {
                "id": "Prototyping"
              }, {
                "id": "Direct Market Access 2"
              }
            ]
          }
        ]
      }, {
        "id": "Validation",
        "children": [{
            "id": "Business Value"
          }, {
            "id": "Direct Market Access"
          }, {
            "id": "Hypothesis Driven Development",
            "children": [{
                "id": "Doing trumps Talking"
              }, {
                "id": "Thinking in evolutionary Steps",
                "children": [{
                    "id": "Iterative & Incremental",
                    "children": [{
                        "id": "Safe Points"
                      }
                    ]
                  }
                ]
              }
            ]
          }, {
            "id": "User Acceptance"
          }, {
            "id": "User Research"
          }
        ]
      }
    ]
  }
  `;
  
  const data = JSON.parse(json);
  
  const width = document.getElementById("container").scrollWidth;
  const height = document.getElementById("container").scrollHeight || 600;
  const graph = new G6.TreeGraph({
    container: "container",
    width,
    height,
    linkCenter: true,
    modes: {
      default: [
        {
          type: "collapse-expand",
          onChange: function onChange(item, collapsed) {
            const data = item.get("model").data;
            data.collapsed = collapsed;
            return true;
          }
        },
        "drag-canvas",
        "zoom-canvas"
      ]
    },
    defaultNode: {
      size: 15,
      anchorPoints: [[0, 0.5], [1, 0.5]],
      style: {
        fill: "#C6E5FF",
        stroke: "#5B8FF9"
      }
    },
    defaultEdge: {
      type: "cubic-vertical",
      style: {
        stroke: "#A3B1BF"
      }
    },
    layout: {
      type: "dendrogram",
      direction: "TB", // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100,
      preventOverlap: true
    }
  });
  
  graph.node(function(node) {
    let position = "top";
    let rotate = 0;
    let offset = 10;
  
    if (!node.children) {
      position = "bottom";
      rotate = Math.PI / 2;
    }
    return {
      label: node.id,
      labelCfg: {
        position,
        offset: offset,
        style: {
          rotate,
          textAlign: "start"
        }
      }
    };
  });
  
  graph.data(data);
  graph.render();
  graph.fitView();
  