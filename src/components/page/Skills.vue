<template>
  <div id="skills">
    <div class="container">
      <div class="row">
        <div class="text-center" v-scroll-reveal.reset="{ origin: 'top' }">
          <h3>Technical Skills</h3>
          <hr class="line" />
        </div>
      </div>
      <div class="bridge">
        <div class="col col_chart" v-scroll-reveal.reset="{ origin: 'left' }">
          <div class="chartWrap">
            <chart />
          </div>
        </div>
        <div class="col col_text" v-scroll-reveal.reset="{ origin: 'right' }">
          <dl>
            <div v-for="(obj, index) in skills" :key="index">
              <dt>{{ obj.name }}</dt>
              <dd>
                <span
                  v-for="skill in obj.skillset"
                  :key="skill"
                  class="badge"
                  >{{ skill }}</span
                >
              </dd>
            </div>
          </dl>
          <small>The list shown here is by no means exhaustive.</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/page/Chart.js";

export default {
	components: { Chart },
	data() {
		return {
			isVisible: false,
			skills: [
				{
					name: "Front-end",
					skillset: [
						"React / Vue.js",
						"TypeScript",
						"Web Components",
						"MobX",
						"Material UI",
					],
				},
				{
					name: "Back-end",
					skillset: [
						".NET / C#",
						"Python",
						"Node",
						"FastAPI",
						"gRPC",
						"GraphQL",
						"REST",
					],
				},
				{
					name: "AI & Data",
					skillset: [
						"LLMs",
						"LangGraph",
						"LangChain",
						"RAG",
						"PostgreSQL / pgvector",
						"MongoDB",
						"Firebase",
						"RabbitMQ",
						"Redis",
					],
				},
				{
					name: "DevOps",
					skillset: [
						"Docker",
						"Microservices",
						"Keycloak",
						"CI/CD",
						"Electron",
					],
				},
			],
		};
	},
};
</script>
<style lang="scss" scoped>
@use "../../styles/_globals" as *;
.container {
  position: relative;
  margin: 0 10% 0 10%;
}
.bridge {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5%;
  // Side by side only once there is genuinely room for both. At the old 970px
  // the badge column was squeezed to ~220px, which is barely wider than a
  // single badge ("PostgreSQL / pgvector" alone is ~140px) and left the labels
  // clipping. Below this the two stack and each gets the full width.
  @media only screen and (min-width: 1100px){
    flex-direction: row;
  }
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5%;
}
.col {
  display: flex;
  flex-direction: column;
  // Without this a flex item's automatic minimum size is its content, so a
  // column can refuse to shrink and push its contents past the container.
  min-width: 0;
  &_chart {
    // Full width when stacked; a wide column when the bridge is a row.
    flex: 0 0 auto;
    width: 100%;
    @media only screen and (min-width: 1100px) {
      flex: 1 1 60%;
      width: auto;
    }
  }
  // This used to be `&_flex`, which compiled to .col_flex — a class the
  // template never uses (it renders `col col_text`). So the badge column had
  // no width rule at all and was sized purely by its content.
  &_text {
    flex: 0 0 auto;
    width: 100%;
    @media only screen and (min-width: 1100px) {
      flex: 1 1 40%;
      width: auto;
    }
  }
}
// Chart.js needs a sized parent (responsive + maintainAspectRatio:false); without
// one the canvas overflows its column and only the first bar stays visible.
.chartWrap {
  position: relative;
  width: 100%;
  height: 300px;
  @media only screen and (min-width: 1100px) {
    height: 360px;
  }
}
.text-center {
  text-align: center;
  // 100vw ignored the container's 10% side margins, so the heading block ran
  // ~10vw past the right edge — only hidden because an ancestor clips overflow.
  width: 100%;
  margin-bottom: 4vw;
}
.line {
  border-color: #64ffda;
  max-width: 80px;
  border-top-width: 3px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
dd {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45em 0.4em;
  margin-left: 0;
}
.badge {
  color: #263238;
  // The padding-left/right pair that used to sit here was overridden by the
  // padding shorthand three lines below, so the intended horizontal padding
  // never applied and the pills looked cramped. Folded into one declaration.
  padding: 0.32em 0.7em;
  border-radius: 10rem;
  display: inline-block;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #fff;
}
</style>
