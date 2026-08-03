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
  @media only screen and (min-width: 970px){
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
  &_chart {
    // Full width when stacked (mobile); a 2/3 column when the bridge is a row.
    flex: 0 0 auto;
    width: 100%;
    @media only screen and (min-width: 970px) {
      flex: 0 0 66.6%;
      width: auto;
    }
  }
  &_flex {
    flex: 0 0 33.3%;
  }
}
// Chart.js needs a sized parent (responsive + maintainAspectRatio:false); without
// one the canvas overflows its column and only the first bar stays visible.
.chartWrap {
  position: relative;
  width: 100%;
  height: 300px;
  @media only screen and (min-width: 970px) {
    height: 360px;
  }
}
.text-center {
  text-align: center;
  width: 100vw;
  margin-bottom: 4vw;
}
.line {
  border-color: #64ffda;
  max-width: 80px;
  border-top-width: 3px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.badge {
  color: #263238;
  padding-right: 0.6em;
  padding-left: 0.6em;
  border-radius: 10rem;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #fff;
}
</style>
