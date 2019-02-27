<template>
  <div v-if="toShow">
    <v-layout row justify-center>
      <v-dialog v-model="toShow" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Incoming property</span>
          </v-card-title>
          <v-card-text>
            <v-dialog v-model="addDialog" max-width="500px">
              <v-btn
                v-if="isCurrentNodeUtility"
                slot="activator"
                color="primary"
                dark
                class="mb-2"
              >New property</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Property</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.name" label="Property name"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="headers"
              :items="propertiesObjects"
              class="elevation-1"
              v-model="selected"
              item-key="name"
            >
              <template slot="items" slot-scope="props">
                <tr @click="select(props.item)" :active="props.selected">
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-right">
                    <v-icon
                      :disabled="!isCurrentNodeUtility"
                      small
                      class="mr-2"
                      @click="editItem(props.item.name)"
                    >edit</v-icon>
                    <v-icon
                      :disabled="!isCurrentNodeUtility"
                      small
                      @click="deleteItem(props.item)"
                    >delete</v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeModal">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="closeModal">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      addDialog: false,
      editedItem: {
        name: ""
      },
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Actions", value: "name", sortable: false, align: "right" }
      ]
    };
  },
  props: ["modalShow"],
  computed: {
    ...mapGetters([
      "getEdgeIncomingProperty",
      "getSelectedProperties",
      "isCurrentNodeUtility"
    ]),
    selected() {
      return [{ name: this.getEdgeIncomingProperty }];
    },
    toShow: {
      get() {
        return this.modalShow;
      },
      set() {}
    },
    propertiesObjects() {
      return Object.keys(this.getSelectedProperties).map(ele =>
        Object.assign({}, { name: ele, disabled: false })
      );
    }
  },
  methods: {
    ...mapMutations(["updateEdgeValue", "updateElement", "deleteProperty"]),
    closeModal() {
      this.$emit("closeModal");
    },
    select(selectedItem) {
      this.propertiesObjects.forEach(item => {
        if (item.name == selectedItem.name) {
          this.updateEdgeValue(selectedItem.name);
        }
      });
    },
    editItem(item) {
      let temp = Object.values(this.propertiesObjects).find(
        ele => ele.name == item
      );
      this.editedItem = Object.assign({}, temp);
      this.deleteProperty(item);
      this.addDialog = true;
    },
    deleteItem(item) {
      let temp = Object.values(this.propertiesObjects).find(
        ele => ele.name == item
      );
      confirm("Are you sure you want to delete this item?") &&
        this.deleteProperty(item.name);
    },
    close() {
      this.addDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.properties[this.editedIndex], this.editedItem);
      } else {
        this.updateElement({ name: this.editedItem.name, value: "" });
      }
      this.close();
    }
  }
};
</script>

<style scoped>
tr[active^="true"] {
  background-color: darkgray !important;
}
</style>

