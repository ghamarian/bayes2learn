import handle_edges_defaults from "../assets/handled_edges";

class Subscribe {
    constructor(cy, vm) {
        cy.edgehandles(handle_edges_defaults);
        cy.on("tap", "node", function (evt) {
            console.log(`${evt.target.id()}, ${evt.target.data().content}`);
            vm.selectNode(evt.target.id());
        });
        cy.on("tap", function (event) {
            let evtTarget = event.target;
            if (evtTarget === cy) {
                let new_node = {
                    group: "nodes",
                    data: {
                        id: vm.$uuid.v4(),
                        name: vm.getNewNode.name,
                        root: "",
                        weight: 75,
                        content: _.cloneDeep(vm.getNewNode.properties, true)
                    },
                };
                vm.pushElement(_.cloneDeep(new_node));
                cy.add({ ...new_node, position: event.position });
            }
        })
        cy.on("ehcomplete", (event, sourceNode, targetNode, addedEles) => {
            let { position } = event;
            let new_edge = {
                data: { ...addedEles.data(), incoming: null },
                group: "edges",
                position,
                name: "edge"
            };
            vm.pushElement(new_edge);
            vm.selectEdge(new_edge.data.id);
            vm.currentTarget = Object.keys(targetNode.data().content);
            vm.modalShow = true;
            console.log(addedEles);
        });
        cy.on("tap", "edge", function (event) {
            let { position } = event;
            vm.selectEdge(event.target.id());
            vm.selectNode(vm.getEdgeValue.target);
            vm.currentTarget = Object.keys(vm.getSelectedProperties);
            vm.modalShow = true;
        });
        cy.contextMenus({
            menuItems: [
                {
                    id: "remove",
                    content: "remove",
                    tooltipText: "remove",
                    image: { src: "remove.svg", width: 12, height: 12, x: 6, y: 4 },
                    selector: "node, edge",
                    onClickFunction: function (event) {
                        var target = event.target || event.cyTarget;
                        target.remove();

                        // let id_list = vm.elements.map(e => e.data.id);
                        // cy.$(`#${id_list[0]}`).move({ parent: id_list[3] });
                        // cy.$(`#${id_list[1]}`).move({ parent: [id_list[3], id_list[4]] });
                        // cy.$(`#${id_list[2]}`).move({ parent: [id_list[4]] });


                        // let new_node2 = cy.add({
                        //   group: "nodes",
                        //   data: {
                        //     id: "kashk2",
                        //     name: "amir",
                        //     root: "amir",
                        //     weight: 75,
                        //     content: "kashk"
                        //   },
                        //   position: event.position
                        // });
                        // console.log(cy.nodes().filter(ele => ele.selected()));
                        // cy.nodes()
                        //   .filter(ele => ele.selected())
                        //   .move({ parent: new_node_id });
                    },
                    hasTrailingDivider: true
                },
                {
                    id: "hide",
                    content: "hide",
                    tooltipText: "hide",
                    selector: "*",
                    onClickFunction: function (event) {
                        var target = event.target || event.cyTarget;
                        target.hide();
                    },
                    disabled: false
                },
                {
                    id: "plate",
                    content: "plate",
                    tooltipText: "create plates for selected nodes",
                    image: { src: "remove.svg", width: 12, height: 12, x: 6, y: 4 },
                    selector: "node, edge",
                    onClickFunction: function (event) {
                        let new_id = vm.$uuid.v4();
                        let new_plate = {
                            group: "nodes",
                            data: {
                                id: new_id,
                                name: "plate",
                                root: "",
                                weight: 75,
                                content: {count: { value: 1, type: "unknown" }},
                            },
                        };
                        cy.add({...new_plate, position: event.position});
                        let parents = [];
                        let selected_nodes = cy.nodes().filter(ele => ele.selected() && ele.data().hasOwnProperty('name'));
                        if (selected_nodes.length == 0) {
                            selected_nodes = event.target;
                        }
                        selected_nodes
                            .forEach(ele => {
                                let curr_parent_list = [];
                                let curr_parent = ele.parent();
                                for (let i = 0; i < curr_parent.length; i++) {
                                    curr_parent_list.push(curr_parent[i].id());
                                }
                                parents.push(curr_parent_list);
                            });
                        selected_nodes.forEach((ele, i) => ele.move({ parent: [...parents[i], new_id] }));
                        vm.pushElement(new_plate);
                    }
                }
            ]
        });
    }
}

export default Subscribe;