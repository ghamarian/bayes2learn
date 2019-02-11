<template>
  <div>
    <b-modal v-model="modalShow" @close="closeModal" hide-footer>
      <div>
        <div>amir {{ getEdgeIncomingProperty() }}</div>
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
      </div>
      <b-btn class="mt-3" variant="primary" block @click="closeModal">Save</b-btn>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["modalShow", "properties"],
  methods: {
    ...mapMutations(["updateEdgeValue"]),
    ...mapGetters(["getEdgeIncomingProperty"]),
    closeModal() {
      this.$emit("closeModal");
    },
    click(event) {
      this.updateEdgeValue(event.target.innerText);
    },
    isSelected(item) {
      console.log("isselected", this.getEdgeIncomingProperty());
      return item === this.getEdgeIncomingProperty();
    }
  }
};
</script>
