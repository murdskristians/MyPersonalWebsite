<template>
  <GridCol :small="12" :medium="4">
    <div class="comingSoonBlock st_inlineHexLinks">
      <GridCol :small="12" :medium="4">
        <h2 class="projectTitle" :title="title">{{ title }}</h2>
        <div class="options">
          <a
            v-if="live"
            :id="id"
            class="st_hexButton"
            :href="live"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try!
          </a>

          <a
            v-if="source"
            :id="id + '-src'"
            class="st_hexButton"
            :href="'https://github.com/murdskristians/' + source"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

        </div>

        <router-link
          v-if="details"
          :id="id + '-details'"
          class="detailsLink"
          :to="{ name: 'ProjectDetails', params: { id: details } }"
        >
          View case study &rarr;
        </router-link>
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
		source: String,
		// When set, renders a "Details" button linking to /projects/<details>.
		details: String
	},
};
</script>

<style lang="scss" scoped>
@use "../../styles/_globals" as *;

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
// The card lays its column out as a flex row, so the column needs to be
// allowed to shrink below its content width for the title to ellipse.
.comingSoonBlock > .st_gridCol {
  min-width: 0;
}
.projectTitle {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.options {
  display: flex;
  justify-content: center;
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
    margin: 20px 12px;
  }
}

// Internal case-study link — deliberately styled apart from the external Try /
// GitHub hexes, and a third hex won't fit the card width anyway.
.detailsLink {
  display: block;
  width: fit-content;
  margin: 0 auto 22px;
  padding: 0.5rem 1.15rem;

  color: #64ffda;
  font-size: 0.85rem;
  text-decoration: none;

  border: 1px solid rgba(100, 255, 218, 0.4);
  border-radius: 6px;

  transition: background 0.18s ease, transform 0.18s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.12);
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px solid #64ffda;
    outline-offset: 3px;
  }
}
</style>
