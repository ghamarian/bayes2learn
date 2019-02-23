<template>
  <b-modal
    v-model="toShow"
    no-close-on-esc
    no-close-on-backdrop
    @ok="closeUtilityModal"
    @cancel="closeUtilityModal"
  >
    <text-complete v-model="content" areaClass="textcomplete" :strategies="strategies"></text-complete>
  </b-modal>
</template>

<script>
import { default as tf_functions } from "../assets/tf_functions";
import TextComplete from "v-textcomplete";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { TextComplete },
  props: ["utilityModalShow", "variables"],
  computed: {
    ...mapGetters(["getAllIncomingVariables", "getValue"]),
    toShow: {
      get() {
        return this.utilityModalShow;
      },
      set() {}
    },
    content: {
      get() {
        return this.getValue("function")
      },
      set(value) {
        this.updateElement({name: "function", value: value})
      }
    },
    strategies() {
      return [
        {
          match: /(tf)\.([a-z0-9+\-\_]*)$/,
          search(term, callback) {
            callback(
              Object.keys(tf_functions)
                .filter(function(name) {
                  return name.startsWith(term);
                })
                .slice(0, 10)
            );
          },
          template(name) {
            return `<div> ${tf_functions[name]} </div>`;
          },
          replace(value) {
            return "$1" + "." + value;
          }
        },
        {
          match: /(v)@([a-z0-9+\-\_]*)$/,
          template(name) {
            return '<span class="m-2">' + name + "</span>";
          },
          search(item, callback) {},
          replace(value) {
            return value;
          },
          list: this.variables
        }
      ];
    }
  },
  methods: {
    ...mapMutations(["updateElement"]),
    closeUtilityModal() {
      this.$emit("closeUtilityModal");
    }
  }
};
</script>