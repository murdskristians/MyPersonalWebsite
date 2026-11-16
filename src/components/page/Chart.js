import { h } from "vue";
import { Bar } from "vue-chartjs";
import { mapState } from "pinia";
import { useUiStore } from "@/plugins/store";
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

const defaults = {
	fontSize: 12,
	fontFamily: '"Varela Round", sans-serif'
};

// Tick, grid and alternating bar colours per site theme.
const palettes = {
	dark: {
		fontColor: "white",
		gridColor: "#314149",
		bars: ["rgba(29,233,182, 0.9)", "rgba(167,255,235, 0.9)"]
	},
	light: {
		fontColor: "#1f2328",
		gridColor: "#c5ced8",
		bars: ["rgba(0,121,107, 0.9)", "rgba(0,150,136, 0.9)"]
	}
};

export default {
	name: "SkillsChart",
	computed: {
		...mapState(useUiStore, ["theme"]),
		palette() {
			return palettes[this.theme] || palettes.dark;
		},
		// Computed rather than data so a theme toggle hands the chart new
		// data/options objects, which re-renders it without a reload.
		chartData() {
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
						backgroundColor: [0, 1, 0, 1, 0, 1, 0].map(i => this.palette.bars[i])
					}
				]
			};
		},
		chartOptions() {
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
							color: this.palette.gridColor
						},
						ticks: {
							color: this.palette.fontColor,
							font: {
								size: defaults.fontSize,
								family: defaults.fontFamily
							},
							callback: value => yLabels[value]
						}
					},
					x: {
						grid: {
							color: this.palette.gridColor
						},
						ticks: {
							color: this.palette.fontColor,
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
			data: this.chartData,
			options: this.chartOptions
		});
	}
};
