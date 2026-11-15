import { h } from "vue";
import { mapState } from "pinia";
import { Bar } from "vue-chartjs";
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
} from "chart.js";
import { useUiStore } from "@/plugins/store";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const yLabels = {
	20: "Slow & Steady",
	40: "Some knowledge",
	60: "Good",
	80: "Great",
	100: "Best ★"
};

const defaults = {
	fontSize: 12,
	fontFamily: '"Varela Round", sans-serif'
};

// Chart.js draws to a canvas and can't use var(); read the active theme's tokens.
function token(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default {
	name: "SkillsChart",
	computed: {
		...mapState(useUiStore, ["theme"]),
		chartData() {
			// depend on the theme so colours are re-read after a toggle
			void this.theme;
			const bars = [token("--chart-bar-1"), token("--chart-bar-2")];
			return {
				labels: [
					"React / Vue.js",
					"JavaScript",
					"Python",
					".NET / C#",
					"AI / LLMs",
					"PostgreSQL",
					"Docker"
				],
				datasets: [
					{
						data: [90, 95, 85, 75, 85, 80, 75],
						backgroundColor: [0, 1, 0, 1, 0, 1, 0].map(i => bars[i])
					}
				]
			};
		},
		chartOptions() {
			void this.theme;
			const text = token("--chart-text");
			const grid = token("--chart-grid");
			const font = { size: defaults.fontSize, family: defaults.fontFamily };
			return {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: { color: grid },
						ticks: {
							color: text,
							font,
							callback: value => yLabels[value]
						}
					},
					x: {
						grid: { color: grid },
						ticks: { color: text, font }
					}
				}
			};
		}
	},
	render() {
		return h(Bar, {
			data: this.chartData,
			options: this.chartOptions
		});
	}
};
