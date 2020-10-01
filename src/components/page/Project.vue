<template>
  <GridCol :small="12" :medium="4">
    <div class="comingSoonBlock st_inlineHexLinks">
      <GridCol :small="12" :medium="4">
        <h2>{{ title }}</h2>
        <div class="options">
          <a
            :id="id"
            class="st_hexButton"
            :href=" 'https://' + this.live + '.netlify.app/' "
            target="_blank"
          >
            Try!
          </a>

          <a
            :id="id"
            class="st_hexButton"
            :href=" 'https://github.com/murdskristians/' + this.source"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </GridCol>
    </div>
  </GridCol>
</template>

<script>
export default {
	name: "Project",
	mounted: function() {
		this.$st.CurPage = this;
	},
	props: {
		title: String,
		id: String,
		live: String,
		source: String
	},
};
</script>

<style lang="scss" scoped>
@import "../../../src/styles/_globals.scss";

h1,
h2,
h3,
h4 {
  @include font-regular;
  margin: 0;
  color: #f2f2f2;
  line-height: 1.2em;
  text-align: center;
}
.options {
  display: flex;
  justify-content: space-evenly;
}
.st_hexButton {
  display: inline-block;
  margin: 20px 0;
  width: 100px;
  height: 100px;

  cursor: pointer;

  color: $white;
  @include font-regular();
  font-size: 1rem;
  line-height: 95px;
  text-align: center;
  text-decoration: none !important;

  background: url(../../assets/images/icons/link-hex.png) center center
    no-repeat;
  background-size: contain;
  border: none;

  transition: all 250ms ease-in-out;

  &:hover,
  &:active,
  &.active {
    background-image: url(../../assets/images/icons/link-hex_hover.png);
  }
}
.st_inlineHexLinks {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .st_hexButton {
    margin: 20px -10px;
  }
}
</style>
