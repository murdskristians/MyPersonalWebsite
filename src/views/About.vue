<template>
  <div data-page="About">
    <GridContainer
      id="heroBlock"
      class="st_fullPageContainer"
      data-aos="fade-in"
    >
      <GridRow>
        <GridCol :small="12" :start="1" :medium="6" :mediumStart="4">
          <h1 id="heroTitle" v-scroll-reveal.reset>Kristiāns Murds</h1>
          <h2 id="heroSubTitle"  v-scroll-reveal.reset="{delay: 150}">front-end web developer</h2>
          <p id="heroSummary"  v-scroll-reveal.reset="{delay: 250}">
            Final year Bachalor student with most of experience and practice in
            front end development. I also have some experience working with back
            end and my goal is to become a full stack developer.
          </p>
          <!--<div id="heroLinks" class="st_inlineHexLinks">
						<a id="link_skills" class="st_hexButton" @click="scrollToSkills">skills</a>
						<a id="link_projects" class="st_hexButton" @click="scrollToProjects">projects</a>
						<a id="link_blog" class="st_hexButton" @click="scrollToBlog">blog</a>
						<a id="link_contact" class="st_hexButton" @click="scrollToContact">contact</a>
					</div>-->
        </GridCol>
      </GridRow>
    </GridContainer>

    <PageScroller @click="scrollToSkills" />

    <skills id="skillsBlock" />


    <!-- <PageScroller :hideOnMobile="true" @click="scrollToProjects" />
		<GridContainer id="projectsBlock" class="st_hexBackground bg2" :isFull="true">
			<GridContainer>
			<GridRow>
				<GridCol :small="12">
					<h1 class="st_sectionHeader">Recent Projects</h1>
				</GridCol>
			</GridRow>
			<GridRow>
				<GridCol :small="12" :large="2" :largeStart="4">
					<div class="comingSoonBlock">
						<h2>coming soon...</h2>
					</div>
				</GridCol>
				<GridCol :small="12" :large="2" :largeStart="6">
					<div class="comingSoonBlock">
						<h2>coming soon...</h2>
					</div>
				</GridCol>
				<GridCol :small="12" :large="2" :largeStart="8">
					<div class="comingSoonBlock">
						<h2>coming soon...</h2>
					</div>
				</GridCol>
			</GridRow>
			<GridRow>
				<GridCol class="st_inlineHexLinks" :small="12" :medium="6" :mediumStart="4">
					<a @click="gotoPage('/projects', 'about_projects_viewmore')" class="st_hexButton">more</a>
				</GridCol>
			</GridRow>
			</GridContainer>
		</GridContainer>
		<PageScroller :hideOnMobile="true" @click="scrollToBlog" />
		<GridContainer id="blogBlock" class="st_hexBackground bg3" :isFull="true">
			<GridContainer>
			<GridRow>
				<GridCol :small="12">
					<h1 class="st_sectionHeader">Latest Blog Entry</h1>
				</GridCol>
			</GridRow>
			<GridRow>
				<GridCol :small="12" :medium="6" :mediumStart="4">
					<div class="comingSoonBlock">
						<h2>coming soon...</h2>
					</div>
				</GridCol>
			</GridRow>
			<GridRow>
				<GridCol class="st_inlineHexLinks" :small="12" :medium="6" :mediumStart="4">
					<a @click="gotoPage('/blog', 'about_blog_viewmore')" class="st_hexButton">more</a>
				</GridCol>
			</GridRow>
			</GridContainer>
		</GridContainer> -->
    <PageScroller id="secondScroller" :hideOnMobile="true" @click="scrollToContact" />
    <GridContainer id="contactBlock" :isFull="true">
      <GridRow>
        <GridCol :small="10" :start="2">
          <h1 class="st_sectionHeader" v-scroll-reveal.reset="{origin: 'left'}">Contact</h1>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol :small="10" :start="2" :medium="6" :mediumStart="4">
          <h3 v-scroll-reveal.reset="{delay: 150, origin: 'right'}">I'm always up for hearing about interesting opportunities.</h3>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol
          id="contactLinksCol"
          class="st_inlineHexLinks"
          :small="10"
          :start="2"
          :medium="6"
          :mediumStart="4"
        >
          <a
			v-scroll-reveal.reset="{delay: 0, scale: 0.2}"
            id="link_email"
            class="st_hexButton"
            href="mailto:murdskristians@gmail.com"
            target="_blank"
            >email</a
          >
          <a
			v-scroll-reveal.reset="{delay: 100, scale: 0.2}"
            id="link_cell"
            class="st_hexButton"
            href="tel:+37129886177"
            target="_blank"
            >phone</a
          >
          <a
			v-scroll-reveal.reset="{delay: 200, scale: 0.2}"
            id="link_linkedin"
            class="st_hexButton"
            href="https://www.linkedin.com/in/kristians-murds-ab091384/"
            target="_blank"
            >linkedin</a
          >
          <a
			v-scroll-reveal.reset="{delay: 300, scale: 0.2}"
            id="link_github"
            class="st_hexButton"
            href="https://github.com/murdskristians"
            target="_blank"
            >github</a
          >
        </GridCol>
      </GridRow>
    </GridContainer>
    <PageScroller
      id="backToTop"
      :flip="true"
      :hideOnMobile="true"
      @click="scrollToHero"
    />
  </div>
</template>

<script>
import PageScroller from "@/components/page/PageScroller";
import Skills from "@/components/page/Skills";

export default {
	name: "About",
	components: {
		PageScroller,
		Skills,
	},
	data() {
		return {
			frontEndActive: true,
			backEndActive: false,
		};
	},
	mounted: function() {
		this.$st.CurPage = this;
	},
	methods: {
		gotoPage: function(path) {
			// gtag('event', 'page_link', {
			// 	'event_category' : 'engagement',
			// 	'event_label' : from
			// });
			this.$router.push(path);
		},
		scrollToHero: function() {
			// gtag('event', 'page_scroll_to_section', {
			// 	'event_category' : 'engagement',
			// 	'event_label' : 'about_hero'
			// });
			document
				.getElementById("heroBlock")
				.scrollIntoView({ block: "start", behavior: "smooth" });
		},
		scrollToSkills: function() {
			// gtag('event', 'page_scroll_to_section', {
			// 	'event_category' : 'engagement',
			// 	'event_label' : 'about_skills'
			// });
			document
				.getElementById("skillsBlock")
				.scrollIntoView({ block: "start", behavior: "smooth" });
		},
		scrollToProjects: function() {
			// gtag('event', 'page_scroll_to_section', {
			// 	'event_category' : 'engagement',
			// 	'event_label' : 'about_projects'
			// });
			document
				.getElementById("projectsBlock")
				.scrollIntoView({ block: "start", behavior: "smooth" });
		},
		scrollToBlog: function() {
			// gtag('event', 'page_scroll_to_section', {
			// 	'event_category' : 'engagement',
			// 	'event_label' : 'about_blog'
			// });
			document
				.getElementById("blogBlock")
				.scrollIntoView({ block: "start", behavior: "smooth" });
		},
		scrollToContact: function() {
			// gtag('event', 'page_scroll_to_section', {
			// 	'event_category' : 'engagement',
			// 	'event_label' : 'about_contact'
			// });
			document
				.getElementById("contactBlock")
				.scrollIntoView({ block: "start", behavior: "smooth" });
		},
		showFrontEnd: function() {
			this.frontEndActive = true;
			this.backEndActive = false;
		},
		showBackEnd: function() {
			this.frontEndActive = false;
			this.backEndActive = true;
		},
	},
};
</script>

<style lang="scss">
@import "../styles/_globals";

#page[data-page="About"] {
  #heroTitle {
    @include font-bold;
    font-size: 2rem;

    @media only screen and (min-width: $breakpoint-m + $grid-gutters) {
      font-size: 4rem;
    }
  }
  #heroSubTitle {
    font-size: 1.5rem;

    @media only screen and (min-width: $breakpoint-m + $grid-gutters) {
      font-size: 2rem;
    }
  }
  #heroSummary {
    margin-top: 40px;

    font-size: 1.125rem;
    text-align: center;

    @media only screen and (min-width: $breakpoint-m + $grid-gutters) {
      font-size: 1.5rem;
    }
  }
  #heroLinks {
    margin-top: 20px;
  }

  #backToTop {
    position: fixed;
    top: auto;
    bottom: 20px;
    left: auto;
    right: 20px;
  }

  .techBlock {
    width: 100%;
    height: 100%;

    text-align: center;

    > h2 {
      margin-bottom: 20px;
      padding: 20px 0;

      font-size: 1.5rem;

      border-bottom: 2px solid $white;

      @media only screen and (min-width: $breakpoint-m + $grid-gutters) {
        font-size: 1.75rem;
      }
    }
    > ul {
      margin: 0 40px 40px 40px;
      padding: 0;

      list-style: none;

      > li {
        margin: 0 0 5px 0;
        padding: 0;
      }
    }
  }

  #projectsBlock {
    min-height: 100vh;
  }

  #blogBlock {
    min-height: 100vh;
  }

  #contactBlock {
    position: relative;
    padding-bottom: 30vw;
    background: url(../assets/images/footer/profile_mobile.png) left bottom
      no-repeat;
    background-size: 100% auto;

    @media only screen and (min-width: $breakpoint-l + $grid-gutters) {
      background-image: url(../assets/images/footer/profile_hd.png);
    }
    @media only screen and (min-width: $breakpoint-xl + $grid-gutters) {
      background-image: url(../assets/images/footer/profile_uhd.png);
    }
  }
  #contactLinksCol {
    margin-top: 20px;
  }

  .comingSoonBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 200px;

    background-color: rgba($black, 0.5);
    border: 2px solid rgba($white, 0.5);
    border-radius: $border-radius;
  }
  #secondScroller {
    top: 2vh;
  }
}
</style>
