<template>
  <b-modal v-model="modalShow" no-close-on-esc no-close-on-backdrop @close="closeModal" hide-footer>
    <b-list-group>
      <b-list-group-item
        v-for="item in properties"
        :key="item"
        class="d-flex justify-content-between align-items-center"
        button
        @click="click"
        :class="{ 'active': isSelected(item)}"
      >
        {{ item }}
        <!-- <b-badge variant="primary" pill>14</b-badge> -->
      </b-list-group-item>
    </b-list-group>
    <b-btn class="mt-3" variant="primary" block @click="closeModal">Save</b-btn>
  </b-modal>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["modalShow", "properties"],
  computed: {
    ...mapGetters(["getEdgeIncomingProperty"])
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
