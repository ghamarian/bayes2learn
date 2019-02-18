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
import TextComplete from "v-textcomplete";

export default {
  components: { TextComplete },
  props: ["utilityModalShow"],
  data() {
    return {
      content: "",
      strategies: [
        {
          match: /(^|\s):([a-z0-9+\-\_]*)$/,
          search(term, callback) {
            callback(
              Object.keys(githubEmoji)
                .filter(function(name) {
                  return name.startsWith(term);
                })
                .slice(0, 10)
            );
          },
          template(name) {
            return (
              '<img width="17" src="' + githubEmoji[name] + '"></img> ' + name
            );
          },
          replace(value) {
            return "$1:" + value + ": ";
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