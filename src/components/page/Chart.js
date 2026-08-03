import { h } from "vue";
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

const defaults = {
	fontColor: "white",
	gridColor: "#314149",
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
						backgroundColor: [
							"rgba(29,233,182, 0.9)",
							"rgba(167,255,235, 0.9)",
							"rgba(29,233,182, 0.9)",
							"rgba(167,255,235, 0.9)",
							"rgba(29,233,182, 0.9)",
							"rgba(167,255,235, 0.9)",
							"rgba(29,233,182, 0.9)"
						]
					}
				]
			},
			chartOptions: {
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
							color: defaults.gridColor
						},
						ticks: {
							color: defaults.fontColor,
							font: {
								size: defaults.fontSize,
								family: defaults.fontFamily
							},
							callback: value => yLabels[value]
						}
					},
					x: {
						grid: {
							color: defaults.gridColor
						},
						ticks: {
							color: defaults.fontColor,
							font: {
								size: defaults.fontSize,
								family: defaults.fontFamily
							}
						}
					}
				}
			}
		};
	},
	render() {
		return h(Bar, {
			data: this.chartData,
			options: this.chartOptions
		});
	}
};
