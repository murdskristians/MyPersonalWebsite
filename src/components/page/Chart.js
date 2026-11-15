import { h } from "vue";
import { mapState } from "pinia";
import { useUiStore } from "@/plugins/store";
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const yLabels = {
	20: "Slow & Steady",
	40: "Some knowledge",
	60: "Good",
	80: "Great",
	100: "Best ★"
};

// Chart.js can't read CSS variables itself, so resolve the theme tokens here.
const token = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const defaults = {
	fontSize: 12,
	fontFamily: '"Varela Round", sans-serif'
};

export default {
	name: "SkillsChart",
	data() {
		return {
			chartData: {
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
						backgroundColor: []
					}
				]
			}
		};
	},
	computed: {
		// Reading the store's theme makes these recompute (and the chart update) on toggle.
		...mapState(useUiStore, ["theme"]),
		themedData() {
			void this.theme;
			const bars = [token("--chart-bar-1"), token("--chart-bar-2")];
			const data = this.chartData.datasets[0].data;
			return {
				...this.chartData,
				datasets: [{ ...this.chartData.datasets[0], backgroundColor: data.map((_, i) => bars[i % 2]) }]
			};
		},
		chartOptions() {
			void this.theme;
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
						grid: {
							color: token("--chart-grid")
						},
						ticks: {
							color: token("--chart-text"),
							font: {
								size: defaults.fontSize,
								family: defaults.fontFamily
							},
							callback: value => yLabels[value]
						}
					},
					x: {
						grid: {
							color: token("--chart-grid")
						},
						ticks: {
							color: token("--chart-text"),
							font: {
								size: defaults.fontSize,
								family: defaults.fontFamily
							}
						}
					}
				}
			};
		}
	},
	render() {
		return h(Bar, {
			data: this.themedData,
			options: this.chartOptions
		});
	}
};
