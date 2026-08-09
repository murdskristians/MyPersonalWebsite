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
          <h2 id="heroSubTitle"  v-scroll-reveal.reset="{delay: 150}">Full-Stack &amp; AI Developer</h2>
          <p id="heroSummary"  v-scroll-reveal.reset="{delay: 250}">
            I build full-stack products and the AI that powers them — React &amp; TypeScript
            front-ends, .NET &amp; Python services, and LLM systems like LangGraph, RAG and agents.
            Currently open to new opportunities.
          </p>
          <div id="heroCta" v-scroll-reveal.reset="{delay: 350}">
            <a
              class="cvButton"
              :href="cvUrl"
              download
              type="application/pdf"
              aria-label="Download CV as PDF"
            >
              Download CV <span class="cvIcon" aria-hidden="true"></span>
            </a>
          </div>
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

    <PageScroller id="skillsScroller" :hideOnMobile="true" @click="scrollToFeatured" />

    <GridContainer id="featuredBlock">
      <GridRow>
        <GridCol :small="12" :medium="10" :mediumStart="2">
          <h1 class="st_sectionHeader" v-scroll-reveal.reset="{ origin: 'left' }">Featured Work</h1>
          <div class="featuredGrid">
            <router-link
              v-for="p in featured"
              :key="p.slug"
              class="featuredCard"
              :to="{ name: 'ProjectDetails', params: { id: p.slug } }"
            >
              <div class="featuredTags">
                <span v-for="t in p.tags" :key="t" class="featuredTag">{{ t }}</span>
              </div>
              <h2 class="featuredTitle">{{ p.title }}</h2>
              <p class="featuredLede">{{ p.lede }}</p>
              <span class="featuredMore">View case study →</span>
            </router-link>
          </div>
          <div class="featuredAll">
            <!-- A router-link so this emits a real href: as a bare <a @click>
                 it was invisible to crawlers and unusable by keyboard. -->
            <router-link class="seeAll" :to="{ name: 'Projects' }">See all projects →</router-link>
          </div>
        </GridCol>
      </GridRow>
    </GridContainer>

    <PageScroller id="featuredScroller" :hideOnMobile="true" @click="scrollToExperience" />

    <GridContainer id="experienceBlock">
      <GridRow>
        <GridCol :small="12" :medium="10" :mediumStart="2">
          <h1 class="st_sectionHeader" v-scroll-reveal.reset="{ origin: 'left' }">Experience</h1>
          <div class="expList">
            <div class="expItem" v-for="job in experience" :key="job.company">
              <div class="expPeriod">{{ job.period }}</div>
              <h2 class="expRole">
                {{ job.role }} <span class="expCompany">· {{ job.company }}</span>
              </h2>
              <div class="expLoc" v-if="job.location">{{ job.location }}</div>
              <ul class="expBullets">
                <li v-for="(b, i) in job.bullets" :key="i">{{ b }}</li>
              </ul>
              <div class="expTech">{{ job.tech }}</div>
            </div>
          </div>
        </GridCol>
      </GridRow>
    </GridContainer>


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
          <!-- h2, not h3: the section above it is an h1, and skipping a level
               breaks the heading outline screen readers navigate by. The class
               keeps the original visual size. -->
          <h2 class="contactLead" v-scroll-reveal.reset="{delay: 150, origin: 'right'}">I'm always up for hearing about interesting opportunities.</h2>
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
          <a
			v-scroll-reveal.reset="{delay: 400, scale: 0.2}"
            id="link_cv"
            class="st_hexButton"
            :href="cvUrl"
            download
            type="application/pdf"
            aria-label="Download CV as PDF"
            >cv</a
          >
        </GridCol>
      </GridRow>
    </GridContainer>
    <PageScroller
      id="backToTop"
      :flip="true"
      :hideOnMobile="true"
      :class="{ isVisible: showBackToTop }"
      @click="scrollToHero"
    />
  </div>
</template>

<script>
import PageScroller from "@/components/page/PageScroller.vue";
import Skills from "@/components/page/Skills.vue";
import { caseStudies } from "@/views/projects/caseStudies.js";

export default {
	name: "About",
	components: {
		PageScroller,
		Skills,
	},
	data() {
		return {
			// Served from public/, so it lands at the site root untouched by the
			// bundler. BASE_URL keeps it correct if the site is ever hosted
			// under a sub-path.
			cvUrl: import.meta.env.BASE_URL + "Kristians-Murds-CV.pdf",
			frontEndActive: true,
			backEndActive: false,
			// Only show the "back to top" scroller once the user has actually
			// scrolled away from the top — otherwise it sits redundantly next
			// to content the user is already looking at.
			showBackToTop: false,
			// Experience — mirrors the LinkedIn profile (titles, companies, dates).
			experience: [
				{
					period: "Jan 2026 – Aug 2026",
					role: "Web Developer",
					company: "Epic5",
					location: "Riga, Latvia · Remote",
					bullets: [
						"Built micro-frontend apps (team chat, contacts, company structure, AI assistant) in React + TypeScript as self-contained Web Components hosted by a central shell — migrating the front end from Module Federation.",
						"Developed backend microservices in ASP.NET Core (.NET 9), containerized with Docker, over gRPC and an event-driven RabbitMQ bus; PostgreSQL, Redis and Keycloak auth.",
						"Built the Python AI service with LangGraph & FastAPI — reusable agent 'factories', retrieval-augmented generation (pgvector), and pluggable LLMs (Anthropic, OpenAI, Gemini, Groq).",
					],
					tech: "React · TypeScript · .NET 9 · Python · LangGraph · Docker · PostgreSQL",
				},
				{
					period: "Jul 2024 – Dec 2025",
					role: "Web Developer",
					company: "HotCode",
					location: "Remote",
					bullets: [
						"Built React + TypeScript front-ends (MobX, Material UI) for a suite of web and Electron desktop apps: an AI chat, a contacts manager, and a collaborative spreadsheet.",
						"Implemented real-time updates with SignalR, a virtualized grid for large datasets, and optimistic inserts.",
						"Led the data-layer migration from MongoDB to Firebase, then identified GDPR / data-residency gaps that shaped the team's later architecture.",
					],
					tech: "React · TypeScript · MobX · SignalR · Firebase · Electron",
				},
				{
					period: "Aug 2021 – Apr 2025",
					role: "Full-Stack Web Developer",
					company: "Sia Reltek · Freelance",
					location: "Riga, Latvia · Hybrid",
					bullets: [
						"Delivered end-to-end web development for clients across retail, manufacturing and services — Salons Arka, Atslēdznieks, Elements, Reltek and more.",
						"Built custom online stores and CMS-driven sites from scratch with PHP/MySQL and Shopify Liquid — multilingual (LV/EN) admin panels and EveryPay payment integration.",
					],
					tech: "PHP · MySQL · Shopify Liquid · JavaScript · SCSS",
				},
				{
					period: "Jan 2019 – May 2019",
					role: "Programmer Trainee",
					company: "Mintos",
					location: "Riga, Latvia",
					bullets: [
						"Front-end trainee building responsive, user-friendly UIs with Vue.js and modern web technologies.",
						"Optimized performance against Google PageSpeed / Lighthouse audits and deployed to AWS.",
					],
					tech: "Vue.js · JavaScript · TypeScript · AWS",
				},
			],
		};
	},
	computed: {
		// The three projects surfaced on the home page. Edit these slugs to change
		// what's featured — they read from the shared case-study data.
		featured: function() {
			return ["bim-viewer", "text2sql", "salons-arka"]
				.map((slug) => caseStudies[slug])
				.filter(Boolean);
		},
	},
	mounted: function() {
		this.$st.CurPage = this;
		// #page has overflow-y: auto in CSS, but with its height chain relying
		// on percentages against an auto-height ancestor it never actually
		// overflows in practice — the window/document is what really scrolls.
		this.onPageScroll = () => {
			this.showBackToTop = window.scrollY > 400;
		};
		window.addEventListener("scroll", this.onPageScroll, { passive: true });
	},
	beforeUnmount: function() {
		window.removeEventListener("scroll", this.onPageScroll);
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
		scrollToFeatured: function() {
			document
				.getElementById("featuredBlock")
				.scrollIntoView({ block: "start", behavior: "smooth" });
		},
		scrollToExperience: function() {
			document
				.getElementById("experienceBlock")
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
@use "../styles/_globals" as *;

#page[data-page="About"] {
  // Keep the hero legible over the animated background (especially on mobile,
  // where the hero is the whole first screen).
  #heroTitle,
  #heroSubTitle,
  #heroSummary {
    text-shadow: 0 2px 18px rgba($black, 0.9), 0 0 4px rgba($black, 0.8);
  }
  #heroTitle {
    @include font-bold;
    font-size: 2rem;

    @media only screen and (min-width: $breakpoint-m ) {
      font-size: 4rem;
    }
  }
  #heroSubTitle {
    font-size: 1.5rem;

    @media only screen and (min-width: $breakpoint-m ) {
      font-size: 2rem;
    }
  }
  #heroSummary {
    margin-top: 40px;

    font-size: 1.125rem;
    text-align: center;

    @media only screen and (min-width: $breakpoint-m ) {
      font-size: 1.5rem;
    }
  }
  #heroLinks {
    margin-top: 20px;
  }

  #heroCta {
    margin-top: 32px;
  }
  .cvButton {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.9rem;

    color: #64ffda;
    font-size: 1rem;
    text-decoration: none;
    white-space: nowrap;

    background: rgba(100, 255, 218, 0.08);
    border: 1px solid rgba(100, 255, 218, 0.55);
    border-radius: 999px;

    transition: background 0.2s ease, border-color 0.2s ease;

    // No translateY lift here on purpose: shifting the button under a cursor
    // sitting near its edge un-hovers it, snapping it back and re-hovering
    // it — a flicker loop. Color-only hover avoids that.
    &:hover,
    &:focus-visible {
      background: rgba(100, 255, 218, 0.18);
      border-color: #64ffda;
    }
  }
  .cvIcon {
    display: inline-block;
    width: 0.95em;
    height: 0.95em;

    // Recolored via mask instead of an <img> so it always matches the
    // button's teal, rather than shipping the icon's own blue.
    background-color: currentColor;
    -webkit-mask: url(../assets/images/icons/download-arrow.png) center / contain no-repeat;
    mask: url(../assets/images/icons/download-arrow.png) center / contain no-repeat;
  }

  #featuredBlock {
    padding: 8vh 0 4vh;
  }
  .featuredGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 4vh;
  }
  .featuredCard {
    display: flex;
    flex-direction: column;
    flex: 1 1 260px;
    max-width: 360px;
    padding: 1.5rem;

    text-align: left;
    text-decoration: none;
    color: #e9eef3;

    background: rgba(40, 48, 58, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;

    transition: transform 0.18s ease, border-color 0.18s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: rgba(100, 255, 218, 0.5);
    }
    &:focus-visible {
      outline: 2px solid #64ffda;
      outline-offset: 3px;
    }
  }
  .featuredTags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.85rem;
  }
  .featuredTag {
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #64ffda;
    border: 1px solid rgba(100, 255, 218, 0.35);
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
  }
  .featuredTitle {
    margin: 0;
    font-size: 1.3rem;
    text-align: left;
  }
  .featuredLede {
    flex-grow: 1;
    margin: 0.6rem 0 1.2rem;
    font-size: 0.92rem;
    color: #9aa7b4;
    text-align: left;
  }
  .featuredMore {
    color: #64ffda;
    font-size: 0.85rem;
  }
  .featuredAll {
    margin-top: 3vh;
    text-align: center;
  }
  .seeAll {
    color: #9aa7b4;
    text-decoration: none;
    cursor: pointer;
    font-size: 0.95rem;

    &:hover {
      color: #64ffda;
    }
  }

  #experienceBlock {
    padding: 8vh 0 4vh;
  }
  .expList {
    margin-top: 4vh;
  }
  .expItem {
    position: relative;
    padding: 0 0 2.4rem 1.8rem;
    border-left: 2px solid rgba(100, 255, 218, 0.25);

    &:last-child {
      padding-bottom: 0;
      border-left-color: transparent;
    }
    &::before {
      content: "";
      position: absolute;
      left: -7px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #64ffda;
      box-shadow: 0 0 12px rgba(100, 255, 218, 0.6);
    }
  }
  .expPeriod {
    margin-bottom: 0.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64ffda;
  }
  .expRole {
    margin: 0;
    font-size: 1.25rem;
    text-align: left;
  }
  .expCompany {
    color: #9aa7b4;
    font-weight: 400;
  }
  .expLoc {
    margin-top: 0.3rem;
    font-size: 0.78rem;
    // #7f8c9a scored 4.41:1 on this background — just under the 4.5:1 minimum
    // for text this size. Lifted to ~5.1:1.
    color: #8a97a5;
  }
  .contactLead {
    font-size: 1.5rem;
  }
  .expBullets {
    margin: 0.9rem 0 0;
    padding-left: 1.1rem;
    text-align: left;

    > li {
      margin-bottom: 0.45rem;
      font-size: 0.95rem;
      color: #cdd6df;
    }
  }
  .expTech {
    margin-top: 0.9rem;
    font-size: 0.8rem;
    font-style: italic;
    // Same contrast lift as .expLoc above.
    color: #8a97a5;
  }

  #backToTop {
    position: fixed;
    top: auto;
    bottom: 20px;
    left: auto;
    right: 20px;

    // Hidden until the user scrolls away from the top (toggled via
    // showBackToTop), rather than sitting on-screen from page load.
    opacity: 0;
    pointer-events: none;

    transition: opacity 250ms ease-in-out;

    &.isVisible {
      opacity: 1;
      pointer-events: auto;
    }
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

      @media only screen and (min-width: $breakpoint-m ) {
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

    @media only screen and (min-width: $breakpoint-l ) {
      background-image: url(../assets/images/footer/profile_hd.png);
    }
    @media only screen and (min-width: $breakpoint-xl ) {
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
  // Both default to the base PageScroller's top: -64px, which pulls them up
  // into the content right above (overlapping "See all projects →" in
  // #featuredScroller's case). Same fix as #secondScroller above.
  #featuredScroller {
    top: 2vh;
  }
  // The gap above Featured Work is taller than the others (Skills has no
  // trailing content to hug), so 2vh left this arrow stuck near its top
  // edge instead of centered in the empty space.
  #skillsScroller {
    top: 7.5vh;
  }
}
</style>
