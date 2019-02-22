<template>
  <v-app>
    <main>
      <v-content>
        <v-container fluid>
          <div>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table :headers="headers" :items="desserts" hide-actions class="elevation-1">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </div>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["modalShow", "properties", "dialog"],
  data: {
    clipped: true,
    drawer: true,
    fixed: false,
    items: [{ icon: "bubble_chart", title: "Inspire" }],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "Vuetify.js",
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Actions", value: "name", sortable: false }
    ],
    items: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0
      }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    listPrimitive: null
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted: function() {
    const accountId = "YOUR_ACCOUNT_ID";
    const appId = "YOUR_APP_ID";
  },

  methods: {
    subscribeToUpdate() {
      this.listPrimitive.onItemAdded(item => {
        this.desserts.push(item.value);
      });

      this.listPrimitive.onItemUpdated(item => {
        //update the item at item.index
        this.desserts.splice(item.index, 1, item.value);
      });

      this.listPrimitive.onItemRemoved(item => {
        //remove the item at item.index
        this.desserts.splice(item.index, 1);
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.listPrimitive.remove(index);
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
        this.listPrimitive.update(this.editedIndex, this.editedItem);
      } else {
        this.listPrimitive.add(this.editedItem);
      }

      this.close();
    }
  }
};
</script>
