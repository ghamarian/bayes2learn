<template>
  <div v-if="toShow">
    <v-layout row justify-center>
      <v-dialog v-model="toShow" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Incoming property</span>
          </v-card-title>
          <v-card-text>
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
                    <v-icon :disabled="props.item.disabled" small class="mr-2" @click="editItem(props.item.name)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
  props: ["modalShow", "properties"],
  computed: {
    ...mapGetters(["getEdgeIncomingProperty"]),
    selected(){
      return [{ name: this.getEdgeIncomingProperty }]
    },
    toShow: {
      get() {
        return this.modalShow;
      },
      set() {}
    },
    propertiesObjects() {
      return this.properties.map(ele => Object.assign({}, { name: ele, disabled: true }));
    }
  },
  methods: {
    ...mapMutations(["updateEdgeValue"]),
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
      this.editedIndex = this.properties.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.properties.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
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

