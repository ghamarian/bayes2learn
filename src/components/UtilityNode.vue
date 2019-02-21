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
import { default as githubEmoji } from "../assets/github_emoji";
import { default as tf_functions } from "../assets/tf_functions";
import TextComplete from "v-textcomplete";

export default {
  components: { TextComplete },
  props: ["utilityModalShow"],
  data() {
    return {
      content: "",
      strategies: [
        {
          match: /(^tf\.|\s\s)([a-z0-9+\-\_]*)$/,
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
            return (
              `<div> ${tf_functions[name]} </div>`
            );
          },
          replace(value) {
            return "$1" + value;
          }
        }
      ]
    };
  },
  computed: {
    toShow: {
      get() {
        return this.utilityModalShow;
      },
      set() {}
    }
  },
  methods: {
    closeUtilityModal() {
      this.$emit("closeUtilityModal");
    }
  }
};
</script>