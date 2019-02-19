<template>
  <b-modal
    v-model="toShow"
    no-close-on-esc
    no-close-on-backdrop
    @ok="closeModal"
    @cancel="closeModal"
  >
    <b-list-group>
      <b-list-group-item
        v-for="item in properties"
        :key="item"
        class="d-flex justify-content-between align-items-center"
        button
        @click="click"
        :class="{ 'active': isSelected(item), 'disabled': false}"
      >{{ item }}</b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["modalShow", "properties"],
  computed: {
    ...mapGetters(["getEdgeIncomingProperty"]),
    toShow: {
      get() {
        return this.modalShow;
      },
      set() {}
    }
  },
  methods: {
    ...mapMutations(["updateEdgeValue"]),
    closeModal() {
      this.$emit("closeModal");
    },
    click(event) {
      this.updateEdgeValue(event.target.innerText);
    },
    isSelected(item) {
      return item === this.getEdgeIncomingProperty;
    }
  }
};
</script>
