<template>
  <div data-page="Projects">
    <GridContainer class="st_fullPageContainer">
      <GridRow>
        <GridCol :small="12" :medium="10" :mediumStart="2">
          <h1 id="heroTitle">Projects</h1>

          <div class="projectSection">
            <h2 class="sectionTitle">Full-Stack Web Apps</h2>
            <GridContainer>
              <GridRow class="projectGrid">
                <project title="Calendar App" id="calendarMF" live="https://calendarmodule.netlify.app" source="React-Calendar-module-federation" details="calendar"/>
                <project title="Firebase Chat" id="fbChat" live="https://module-chat.netlify.app" source="module-REACT-FIREBASE-CHAT-APP-POC" details="firebase-chat"/>
                <project title="E-Store Demo" id="eStore" live="https://e-store-demo-e1d0348a.netlify.app" source="e-store-demo" details="e-store"/>
              </GridRow>
            </GridContainer>
          </div>

          <div class="projectSection">
            <h2 class="sectionTitle">AI &amp; LLM Applications</h2>
            <GridContainer>
              <GridRow class="projectGrid">
                <project title="AI Studio" id="aiStudio" live="https://ai-studio-agent-creator.netlify.app" source="ai-studio" details="ai-studio"/>
                <project title="BigQuery AI Chat" id="bigqueryChat" live="https://bigqueryaichat.netlify.app" source="BigQueryAIChat" details="bigquery-chat"/>
                <project title="SmartSuite AI Search" id="ragSearch" live="https://ragvectorsearchaichat.netlify.app" source="RAG-VectorSearchAIChat" details="smartsuite-search"/>
                <project title="Weather Chatbot" id="weatherChat" live="https://wheatherchat.netlify.app" source="weather-chatbot" details="weather-chatbot"/>
                <project title="Text-to-SQL Agent" id="text2sql" live="https://text2sql-chat.netlify.app" source="text2sql-chat" details="text2sql"/>
              </GridRow>
            </GridContainer>
          </div>

          <div class="projectSection">
            <h2 class="sectionTitle">Client &amp; Production Work</h2>
            <GridContainer>
              <GridRow class="projectGrid">
                <project title="Reltek" id="reltek" live="https://reltek.lv" source="" details="reltek"/>
                <project title="Salons Arka" id="arka" live="https://export.salonsarka.lv" source="" details="salons-arka"/>
                <project title="Atslēdznieks" id="keyMaster" live="https://atsledznieks.lv" source="" details="atsledznieks"/>
                <project title="KP Pro" id="kppro" live="http://kppro.lv" source="" details="kp-pro"/>
                <project title="Elements" id="elements" live="https://elementsincwebsite.netlify.app" source="" details="elements"/>
              </GridRow>
            </GridContainer>
          </div>

          <div class="projectSection">
            <h2 class="sectionTitle">Fundamentals &amp; Practice</h2>
            <GridContainer>
              <GridRow class="projectGrid">
                <project title="BIM / 3D Viewer" id="bimViewer" live="https://3dbuildingviewer.netlify.app" source="bim-viewer" details="bim-viewer"/>
                <project title="Interactive File Tree" id="fileTree" live="https://interactive-file-tree-kristians.netlify.app" source="interactive-file-tree" details="file-tree"/>
                <project title="Markdown Preview" id="mdPreview" live="https://markdown-preview-kristians.netlify.app" source="markdown-preview" details="markdown-preview"/>
                <project title="Algorithm Visualization" id="algoViz" live="https://algoritmuvizualizacijasriks.netlify.app" source="bakalaurs" details="algorithm-viz"/>
                <project title="Tic, tac, toe game" id="ticTacToeGame" live="https://elastic-goldwasser-559708.netlify.app" source="Tic-Tac-Toe-Game" details="tic-tac-toe"/>
                <project title="The Snake game" id="snakeGame" live="https://upbeat-ptolemy-8e8db8.netlify.app" source="Snake-game" details="snake"/>
                <project title="Flex &amp; Grid Cheatsheet" id="cheatSheet" live="https://flexgridcheatsheet.netlify.app" source="Flex-Grid-Cheat-Sheet" details="flex-grid"/>
                <project title="Animal Adoption" id="animalAdoption" live="https://admiring-panini-741142.netlify.app" source="AnimalAdoption" details="animal-adoption"/>
                <project title="Chip &amp; Dice game demo" id="chipDice" live="https://chipanddicegame.netlify.app" source="dice-chip-game" details="chip-dice"/>
                <project title="Week for a student" id="weekAsStudent" live="https://webdesign.netlify.app" source="WeekAsStudent" details="week-student"/>
                <project title="Currency Selector" id="currencySelection" live="https://currencyselectiondemo.netlify.app" source="CurrencySelectionDemo" details="currency-selector"/>
              </GridRow>
            </GridContainer>
          </div>
          <site-footer />
        </GridCol>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import Project from '@/components/page/Project.vue'
import { SiteFooter } from '@/components/page/'

export default {
	name: "Projects",
	components: {
		Project,
		SiteFooter
	},
	mounted: function() {
		this.$st.CurPage = this;
	},
};
</script>

<style lang="scss">
@use "../styles/_globals" as *;

#page[data-page="Projects"] {
  #heroTitle {
    // Clear the fixed nav hex in the top-right corner on small screens.
    margin-top: 100px;
    margin-bottom: 5vh;
    font-size: 2rem;

    @media only screen and (min-width: $breakpoint-m) {
      margin-top: 7vh;
      font-size: 4rem;
    }
  }

  .sectionTitle {
    margin: 9vh 0 3vh 0;

    font-size: 1.5rem;
    text-align: center;
    text-shadow: 0 2px 14px rgba($black, 0.85);

    @media only screen and (min-width: $breakpoint-m) {
      font-size: 2.25rem;
    }

    &:after {
      content: "";
      display: block;
      width: 64px;
      height: 3px;
      margin: 1rem auto 0;

      background-color: #64ffda;
      border-radius: 2px;
    }
  }
  .projectSection:first-of-type .sectionTitle {
    margin-top: 3vh;
  }

  #footerTitle {
    margin-top: 7vh;
    margin-bottom: 7vh;
    font-size: 1.5rem;

    @media only screen and (min-width: $breakpoint-m) {
      font-size: 3rem;
    }
  }

  #footerTitle2 {
    margin-bottom: 7vh;
    font-size: 1rem;

    @media only screen and (min-width: $breakpoint-m) {
      font-size: 2rem;
    }
  }

  // Cards sit 3-up on desktop. Flex rather than the 12-column grid, because a
  // grid always packs the last row into the leftmost tracks — a row of one or
  // two cards would hug the left edge instead of staying centered.
  .projectGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $grid-row-gap $grid-col-gap;

    > .st_gridCol {
      width: 100%;

      @media only screen and (min-width: $breakpoint-m + $grid-gutters) {
        width: calc((100% - #{$grid-col-gap * 2}) / 3);
      }
    }
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

    padding: 2vw;
  }
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

    background: url(../assets/images/icons/link-hex.png) center center no-repeat;
    background-size: contain;
    border: none;

    transition: all 250ms ease-in-out;

    &:hover,
    &:active,
    &.active {
      background-image: url(../assets/images/icons/link-hex_hover.png);
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
}
</style>
