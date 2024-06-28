<template>
  <div data-page="Projects">
    <GridContainer class="st_fullPageContainer">
      <GridRow>
        <GridCol :small="12" :medium="10" :mediumStart="2">
          <h1 id="heroTitle">Recent Projects</h1>
          <GridContainer>
            <GridRow>
              <!-- namnam -->
              <project title="Salons Arka" id="arka" live="https://export.salonsarka.lv" source=""/>
              <project title="Atslēdznieks" id="keyMaster" live="https://atsledznieks.lv" source=""/>
              <project title="Peso Paks" id="peso" live="https://pp.shopdev.lv" source=""/>
              <!-- <project title="NamNam" id="namnam" live="https://namnam.lv" source=""/> -->
              <project title="KP Pro" id="kppro" live="http://kppro.lv" source=""/>
              <project title="Elements" id="elements" live="http://elements-inc.infinityfreeapp.com" source=""/>
              <project title="Juicy Grow" id="juicy" live="http://juicy-grow.infinityfreeapp.com/?i=1" source=""/>
              <project title="Algorithm Visualization" id="algoViz" live="https://algoritmuvizualizacijasriks.netlify.app" source="bakalaurs"/>
              <project title="Rock, paper, scisors" id="rockGame" live="https://gifted-goldberg-c10d0b.netlify.app" source="Rock-Paper-Scissors-Game"/>
              <project title="Currency Selector" id="currencySelection" live="https://currencyselectiondemo.netlify.app" source="CurrencySelectionDemo"/>
              <project title="Flex & Grid Cheatsheet" id="cheatSheet" live="https://flexgridcheatsheet.netlify.app" source="Flex-Grid-Cheat-Sheet"/>
              <project title="Week for a student" id="weekAsStudent" live="https://webdesign.netlify.app" source="WeekAsStudent"/>
              <project title="Computer science quiz" id="quiz" live="https://happy-kepler-4ce477" source="OpenDB_API_Quiz"/>
              <project title="Chip & Dice game demo" id="rockGame" live="https://chipanddicegame.netlify.app" source="dice-chip-game"/>
              <project title="The Snake game" id="snakeGame" live="https://upbeat-ptolemy-8e8db8.netlify.app" source="Snake-game"/>
              <project title="Tic, tac, toe game" id="ticTacToeGame" live="https://elastic-goldwasser-559708.netlify.app" source="Tic-Tac-Toe-Game"/>
              <!-- <project title="Online Todo live list" id="toDo" live="https://inisev-test.netlify.app" source="Switzerland-Trial-Task"/> -->
            </GridRow>
          </GridContainer>
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
@import "../styles/_globals";

#page[data-page="Projects"] {
  #heroTitle {
    margin-top: 7vh;
    margin-bottom: 5vh;
    font-size: 2rem;

    @media only screen and (min-width: $breakpoint-m) {
      font-size: 4rem;
    }
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
