<template>
  <div data-page="Projects">
    <GridContainer class="st_fullPageContainer">
      <GridRow>
        <GridCol :small="12" :medium="10" :mediumStart="2">
          <h1 id="heroTitle">Projects</h1>

          <div class="projectSection">
            <h2 class="sectionTitle">AI &amp; LLM Applications</h2>
            <GridContainer>
              <GridRow>
                <project title="AI Studio" id="aiStudio" live="https://ai-studio-agent-creator.netlify.app" source="ai-studio"/>
                <project title="BigQuery AI Chat" id="bigqueryChat" live="https://bigqueryaichat.netlify.app" source=""/>
                <project title="SmartSuite AI Search" id="ragSearch" live="https://ragvectorsearchaichat.netlify.app" source=""/>
                <project title="Database Chatbot" id="dbChat" live="https://databasechat.netlify.app" source=""/>
                <project title="Weather Chatbot" id="weatherChat" live="https://wheatherchat.netlify.app" source="weather-chatbot"/>
                <project title="Text-to-SQL Agent" id="text2sql" live="" source="text2sql-chat"/>
              </GridRow>
            </GridContainer>
          </div>

          <div class="projectSection">
            <h2 class="sectionTitle">Full-Stack &amp; Web Apps</h2>
            <GridContainer>
              <GridRow>
                <project title="E-Store Demo" id="eStore" live="https://e-store-demo-e1d0348a.netlify.app" source="e-store-demo"/>
                <project title="BIM / 3D Viewer" id="bimViewer" live="https://3dbuildingviewer.netlify.app" source="bim-viewer"/>
                <project title="Calendar (Module Federation)" id="calendarMF" live="https://calendarmodule.netlify.app" source="React-Calendar-module-federation"/>
                <project title="Interactive File Tree" id="fileTree" live="https://interactive-file-tree-kristians.netlify.app" source="interactive-file-tree"/>
                <project title="Markdown Preview" id="mdPreview" live="https://markdown-preview-kristians.netlify.app" source="markdown-preview"/>
                <project title="Firebase Chat" id="fbChat" live="https://module-chat.netlify.app" source="module-REACT-FIREBASE-CHAT-APP-POC"/>
              </GridRow>
            </GridContainer>
          </div>

          <div class="projectSection">
            <h2 class="sectionTitle">Client &amp; Production Work</h2>
            <GridContainer>
              <GridRow>
                <project title="Salons Arka" id="arka" live="https://export.salonsarka.lv" source=""/>
                <project title="Atslēdznieks" id="keyMaster" live="https://atsledznieks.lv" source=""/>
                <project title="Peso Paks" id="peso" live="https://pp.shopdev.lv" source=""/>
                <project title="KP Pro" id="kppro" live="http://kppro.lv" source=""/>
                <project title="Elements" id="elements" live="http://elements-inc.infinityfreeapp.com" source=""/>
                <project title="Juicy Grow" id="juicy" live="http://juicy-grow.infinityfreeapp.com/?i=1" source=""/>
              </GridRow>
            </GridContainer>
          </div>

          <div class="projectSection">
            <h2 class="sectionTitle">Fundamentals &amp; Practice</h2>
            <GridContainer>
              <GridRow>
                <project title="Algorithm Visualization" id="algoViz" live="https://algoritmuvizualizacijasriks.netlify.app" source="bakalaurs"/>
                <project title="Currency Selector" id="currencySelection" live="https://currencyselectiondemo.netlify.app" source="CurrencySelectionDemo"/>
                <project title="Flex &amp; Grid Cheatsheet" id="cheatSheet" live="https://flexgridcheatsheet.netlify.app" source="Flex-Grid-Cheat-Sheet"/>
                <project title="Week for a student" id="weekAsStudent" live="https://webdesign.netlify.app" source="WeekAsStudent"/>
                <project title="Chip &amp; Dice game demo" id="chipDice" live="https://chipanddicegame.netlify.app" source="dice-chip-game"/>
                <project title="The Snake game" id="snakeGame" live="https://upbeat-ptolemy-8e8db8.netlify.app" source="Snake-game"/>
                <project title="Tic, tac, toe game" id="ticTacToeGame" live="https://elastic-goldwasser-559708.netlify.app" source="Tic-Tac-Toe-Game"/>
              </GridRow>
            </GridContainer>
          </div>

          <h3 id="footerTitle">For more, check my GitHub account</h3>
          <h3 id="footerTitle2">Happy coding!</h3>
        </GridCol>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import Project from '@/components/page/Project.vue'

export default {
	name: "Projects",
	components: {
		Project
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
      margin: 20px -10px;
    }
  }
}
</style>
